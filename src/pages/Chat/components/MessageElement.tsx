import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { formatDateRelative } from '../../../utils/utils'

const MessageElement = ({ message, isLastMessage }: { message: Message; isLastMessage: boolean }) => {
  const { uid } = useSelector((state: RootState) => state.auth.profile) as User
  const receiver = useSelector((state: RootState) => state.conversation.receiver)

  const myMessage = uid == message.sender

  const messCase = () => {
    switch (message.messageType) {
      case 'text': {
        return (
          <Box
            maxWidth={'40%'}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 3,
              width: 'fit-content',
              color: myMessage ? '#FFFFFF' : '#161A1D',
              backgroundColor: myMessage ? '#0A7ABE' : '#EAEAEA',
              cursor: 'default'
            }}
          >
            <Typography variant='subtitle1' maxWidth={'100%'} sx={{ wordWrap: 'break-word' }}>
              {message.message}
            </Typography>
          </Box>
        )
      }
      case 'image': {
        return (
          <img
            src={message.message}
            style={{
              objectFit: 'contain',
              width: '30%',
              borderRadius: 10
            }}
          />
        )
      }
      case 'video': {
        return (
          <Typography variant='subtitle1' maxWidth={'100%'} sx={{ wordWrap: 'break-word' }}>
            {message.message}
          </Typography>
        )
      }
    }
  }

  return (
    <Stack direction='row' justifyContent={myMessage ? 'end' : 'start'} alignItems='end' spacing={1}>
      {!myMessage && (
        <Avatar
          alt='avatar'
          src={receiver?.photoURL ?? ''}
          sx={{
            width: 24,
            height: 24,
            '& > *': {
              display: isLastMessage ? 'block' : 'none'
            }
          }}
        />
      )}
      <Tooltip title={formatDateRelative(message.createAt)} placement={myMessage ? 'left' : 'right'}>
        {messCase()}
      </Tooltip>
    </Stack>
  )
}

export default MessageElement
