import { Stack, Box, Avatar, Typography, useTheme } from '@mui/material'
import { formatDateDistance, formatDateRelative } from '../../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const getReceiver = (members: User[] = [], currentUser: string) => {
  return members.find((member) => member.uid != currentUser)
}

const ChatElement = ({ message }: { message: User_Message }) => {
  const theme = useTheme()

  const user = useSelector((state: RootState) => state.auth.profile) as User
  const receiver = getReceiver(message.memberInfo, user.uid)

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
        <Avatar sx={{ width: 56, height: 56 }} src={receiver?.photoURL ?? ''} />
        <Box display='flex' flexDirection='column' justifyContent='space-between' overflow='hidden'>
          <Typography variant='subtitle1' fontWeight='600' overflow='hidden' textOverflow='ellipsis'>
            {receiver?.displayName}
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

      <Typography
        variant='caption'
        flexShrink={0}
        py={0.5}
        sx={{ color: theme.palette.text.primary, textTransform: 'capitalize' }}
      >
        {formatDateRelative(message.createAt)}
      </Typography>
    </Stack>
  )
}

export default ChatElement
