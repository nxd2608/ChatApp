import { Stack, Box, Avatar, Typography, useTheme } from '@mui/material'
import { formatDateDistance } from '../../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const ChatElement = ({ message }: { message: User_Message }) => {
  const theme = useTheme()

  const user = useSelector((state: RootState) => state.auth.profile) as User

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{
        p: 1,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer'
        }
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={1}
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
      >
        <Avatar sx={{ width: 56, height: 56 }} src={message.friendInfo.photoURL ?? ''} />
        <Box display='flex' flexDirection='column' justifyContent='space-between' overflow='hidden'>
          <Typography variant='subtitle1' fontWeight='600' overflow='hidden' textOverflow='ellipsis'>
            {message.friendInfo.displayName}
          </Typography>
          <Typography
            variant='subtitle2'
            overflow='hidden'
            textOverflow='ellipsis'
            sx={{ color: theme.palette.text.disabled }}
          >
            {message.sender === user.uid && 'Bạn: '}
            {message.latestMessage}
          </Typography>
        </Box>
      </Stack>

      <Typography variant='caption' flexShrink={0} py={0.5} sx={{ color: theme.palette.text.primary }}>
        {formatDateDistance(message.createAt)}
      </Typography>
    </Stack>
  )
}

export default ChatElement
