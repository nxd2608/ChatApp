import { Box, IconButton, InputBase, Popover, Typography, useTheme } from '@mui/material'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { ChangeEvent, useState } from 'react'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ConversationFooter = () => {
  const theme = useTheme()

  const user = useSelector((state: RootState) => state.auth.profile) as User
  const receiver = useSelector((state: RootState) => state.conversation.receiver) as Receiver
  const chatId = useSelector((state: RootState) => state.conversation.chatId) as string

  const [message, setMessage] = useState<string>('')

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const pickerOpen = Boolean(anchorEl)

  const handleClickPicker = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

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

    await updateDoc(doc(db, 'user_message', chatId), {
      createAt: Date.now(),
      latestMessage: message.trim(),
      sender: user.uid
    })

    // await updateDoc(doc(db, 'user_message', receiver.key), {
    //   createAt: Date.now(),
    //   latestMessage: message.trim(),
    //   sender: user.uid
    // })
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
          pl: 2,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          borderRadius: 100,
          flexGrow: 1
        }}
      >
        <InputBase
          sx={{
            flex: 1,
            color: theme.palette.primary.contrastText
          }}
          placeholder='Aa'
          value={message}
          onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setMessage(event.target.value)}
          onKeyUp={handleEnter}
        />
        <IconButton type='button' sx={{ p: '10px' }} onClick={handleClickPicker}>
          <InsertEmoticonIcon />
        </IconButton>
        <Popover
          open={pickerOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              setMessage((prev) => prev.concat(emoji.native))
            }}
          />
        </Popover>
      </Box>

      <IconButton onClick={handleSendMessage}>
        <SendRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default ConversationFooter
