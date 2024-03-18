import { Avatar, Box, Button, IconButton, InputBase, Stack, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import useFirestore from '../../../hooks/useFirestore'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { ChatElement } from '.'
import { currentReceiver } from '../../../redux/slice/conversation.slice'
import { Query, query, collection, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

const ChatList = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: RootState) => state.auth.profile) as User

  const queryMessages = useMemo<Query | undefined>(() => {
    if (!user) return
    return query(collection(db, 'user_message'), where('uid', '==', user.uid))
  }, [user.uid])

  const messages = useFirestore<User_Message>(queryMessages)

  const [textSearch, setTextSearch] = useState<string>('')
  const [results, setResults] = useState<User[]>([])

  const handleClickToChat = (receiver: Receiver) => {
    dispatch(
      currentReceiver({
        key: receiver.key,
        uid: receiver.uid,
        displayName: receiver.displayName,
        photoURL: receiver.photoURL
      })
    )
  }

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', textSearch))
    const docs = await getDocs(q)
    docs.forEach((doc) => {
      setResults((prev) => [...prev, doc.data() as User])
    })
  }

  const handleAddFriend = async (result: User) => {
    await setDoc(doc(db, 'user_message', user.key), {
      createAt: Date.now(),
      latestMessage: '',
      friendInfo: result,
      uid: user.uid,
      key: user.key
    })

    await setDoc(doc(db, 'user_message', result.key), {
      createAt: Date.now(),
      latestMessage: '',
      friendInfo: user,
      uid: result.uid,
      key: result.key
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Stack direction='column' spacing={1}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>
            Đoạn Chat
          </Typography>
        </Box>
        <Stack direction='row' spacing={1}>
          <InputBase
            sx={{
              px: 2,
              py: 1,
              width: '100%',
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 100,
              height: 40
            }}
            placeholder='Aa'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              setTextSearch(event.target.value)
            }
          />
          <IconButton sx={{ backgroundColor: theme.palette.primary.main }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
        <Stack>
          {results.map((result) => (
            <Box>
              <Avatar src={result.photoURL ?? ''} />
              <Typography>{result.displayName}</Typography>
              <Button sx={{ color: theme.palette.text.primary }} onClick={() => handleAddFriend(result)}>
                Kết bạn
              </Button>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        {messages.map((message) => (
          <NavLink
            key={message.uid}
            to={`/chat/${message.friendInfo.uid}`}
            onClick={() => handleClickToChat(message.friendInfo)}
            style={({ isActive }) => ({
              borderRadius: 16,
              textDecoration: 'none',
              color: theme.palette.primary.contrastText,
              overflow: 'hidden',
              backgroundColor: isActive ? theme.palette.primary.main : 'transparent'
            })}
          >
            <ChatElement message={message} />
          </NavLink>
        ))}
      </Stack>
    </Box>
  )
}

export default ChatList
