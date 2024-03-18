import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { ChangeEvent, useState } from 'react'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { omit, reverse } from 'lodash'
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

const ConversationFooter = () => {
  const theme = useTheme()
  const receiver = useSelector((state: RootState) => state.conversation.receiver) as Receiver
  const user = useSelector((state: RootState) => state.auth.profile) as User

  const [message, setMessage] = useState<string>('')

  const handleSendMessage = async () => {
    if (!message) return

    setMessage('')

    await addDoc(collection(db, 'messages'), {
      message: message.trim(),
      members: [user.uid, receiver.uid],
      sender: user.uid,
      receiver: receiver.uid,
      createAt: Date.now()
    })

    await updateDoc(doc(db, 'user_message', user.key), {
      createAt: Date.now(),
      latestMessage: message.trim(),
      sender: user.uid
    })

    await updateDoc(doc(db, 'user_message', receiver.key), {
      createAt: Date.now(),
      latestMessage: message.trim(),
      sender: user.uid
    })
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <Box
      sx={{
        p: 1,
        gap: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.default
      }}
    >
      <IconButton>
        <AttachmentRoundedIcon />
      </IconButton>

      <Box
        sx={{
          px: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          borderRadius: 100,
          flexGrow: 1
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: theme.palette.primary.contrastText
          }}
          placeholder='Aa'
          value={message}
          onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setMessage(event.target.value)}
          onKeyUp={handleEnter}
        />
        <IconButton type='button' sx={{ p: '10px' }}>
          <InsertEmoticonIcon />
        </IconButton>
      </Box>

      <IconButton onClick={handleSendMessage}>
        <SendRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default ConversationFooter
