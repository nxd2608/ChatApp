import { Avatar, Box, Button, IconButton, InputBase, Stack, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import useFirestore from '../../../hooks/useFirestore'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { ChatElement } from '.'
import { currentChatId, currentReceiver } from '../../../redux/slice/conversation.slice'
import {
  Query,
  query,
  collection,
  where,
  getDocs,
  and,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc
} from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { v4 } from 'uuid'
import { getReceiver, setProfileToLS } from '../../../utils/utils'
import { profile } from '../../../redux/slice/auth.slice'

const ChatList = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: RootState) => state.auth.profile) as User

  const queryMessages = useMemo<Query | undefined>(() => {
    if (!user) return
    return query(collection(db, 'user_message'), where('uid', 'array-contains', user.uid))
  }, [user.uid])

  const messages = useFirestore<User_Message>(queryMessages)

  const [textSearch, setTextSearch] = useState<string>('')
  const [resultsSearch, setResultsSearch] = useState<User[]>([])

  const handleClickToChat = (user_message: User_Message) => {
    const receiver = getReceiver(user_message.memberInfo, user.uid)

    dispatch(
      currentReceiver({
        userID: receiver.userID,
        uid: receiver.uid,
        displayName: receiver.displayName,
        photoURL: receiver.photoURL
      })
    )

    dispatch(currentChatId(user_message.chatId))
  }

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      and(where('uid', '!=', user.uid), where('keywords', 'array-contains', textSearch))
    )
    const docs = await getDocs(q)
    docs.forEach((doc) => {
      setResultsSearch((prev) => [...prev, doc.data() as User])
    })
  }

  const handleAddFriend = async (result: User) => {
    const chatId = v4()
    await setDoc(doc(db, 'user_message', chatId), {
      createAt: Date.now(),
      latestMessage: '',
      messageType: 'text' as const,
      memberInfo: [user, result],
      chatId,
      uid: [user.uid, result.uid]
    })

    await updateDoc(doc(db, 'users', user.uid), {
      friends: arrayUnion(result.uid)
    })
    await updateDoc(doc(db, 'users', result.uid), {
      friends: arrayUnion(user.uid)
    })

    const docSnap = await getDoc(doc(db, 'users', user.uid))

    if (docSnap.exists()) {
      const data = docSnap.data() as User
      dispatch(profile(data))
      setProfileToLS(data)
    }
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
          <Box
            sx={{
              pl: 2,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 100,
              flexGrow: 1
            }}
          >
            <InputBase
              sx={{
                flex: 1,
                color: theme.palette.text.disabled,
                height: 40
              }}
              placeholder='Aa'
              value={textSearch}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                setTextSearch(event.target.value)
              }
            />
            {Boolean(textSearch) && (
              <IconButton type='button' onClick={() => setTextSearch('')}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <IconButton sx={{ backgroundColor: theme.palette.background.paper }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </Stack>

      {Boolean(textSearch) && (
        <Stack>
          {resultsSearch
            .filter((searchUser) => !user.friends.includes(searchUser.uid))
            .map((result) => (
              <Box
                key={result.uid}
                sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Avatar src={result.photoURL ?? ''} sx={{ width: 56, height: 56 }} />
                  <Typography sx={{ color: theme.palette.text.primary }}>{result.displayName}</Typography>
                </Stack>
                <Button
                  variant='outlined'
                  sx={{ color: theme.palette.text.primary }}
                  onClick={() => handleAddFriend(result)}
                >
                  Kết bạn
                </Button>
              </Box>
            ))}
        </Stack>
      )}

      {!Boolean(textSearch) && (
        <Stack spacing={0.5}>
          {messages.map((message) => (
            <NavLink
              key={message.chatId}
              to={`/chat/${message.chatId}`}
              onClick={() => handleClickToChat(message)}
              style={({ isActive }) => ({
                borderRadius: 16,
                textDecoration: 'none',
                color: theme.palette.primary.contrastText,
                overflow: 'hidden',
                backgroundColor: isActive ? theme.palette.action.selected : 'transparent'
              })}
            >
              <ChatElement message={message} />
            </NavLink>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default ChatList
