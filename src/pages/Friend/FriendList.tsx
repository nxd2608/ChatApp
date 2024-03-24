import { Box, IconButton, InputBase, Stack, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Query, query, collection, where, getDocs } from 'firebase/firestore'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { AppDispatch, RootState } from '../../redux/store'
import { db } from '../../firebase/firebaseConfig'
import useFirestore from '../../hooks/useFirestore'
import { currentReceiver } from '../../redux/slice/conversation.slice'
import FriendElement from './FriendElement'
import { getReceiver } from '../../utils/utils'

const FriendList = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: RootState) => state.auth.profile) as User

  const queryFriends = useMemo<Query | undefined>(() => {
    if (!user) return
    return query(collection(db, 'user_message'), where('uid', 'array-contains', user.uid))
  }, [user.uid])

  const friends = useFirestore<User_Message>(queryFriends)

  const [textSearch, setTextSearch] = useState<string>('')
  const [results, setResults] = useState<User[]>([])

  const handleClickToChat = (user_message: User_Message) => {
    const receiver = getReceiver(user_message.memberInfo, user.uid)

    dispatch(
      currentReceiver({
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
            Mọi người
          </Typography>
        </Box>
        <Stack direction='row' spacing={1}>
          <InputBase
            sx={{
              px: 2,
              py: 1,
              width: '100%',
              color: theme.palette.text.disabled,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 100,
              height: 40
            }}
            placeholder='Aa'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              setTextSearch(event.target.value)
            }
          />
          <IconButton sx={{ backgroundColor: theme.palette.background.paper }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        {friends.map((friend) => (
          <NavLink
            key={friend.chatId}
            to={`/chat/${friend.chatId}`}
            onClick={() => handleClickToChat(friend)}
            style={({ isActive }) => ({
              borderRadius: 16,
              textDecoration: 'none',
              color: theme.palette.primary.contrastText,
              overflow: 'hidden',
              backgroundColor: isActive ? theme.palette.action.hover : 'transparent'
            })}
          >
            <FriendElement friend={friend} />
          </NavLink>
        ))}
      </Stack>
    </Box>
  )
}

export default FriendList
