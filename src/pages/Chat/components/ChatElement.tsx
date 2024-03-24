import { Stack, Box, Avatar, Typography, useTheme } from '@mui/material'
import { formatDateIntl, getReceiver } from '../../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'

const ChatElement = ({ message }: { message: User_Message }) => {
  const theme = useTheme()

  const user = useSelector((state: RootState) => state.auth.profile) as User
  const receiver = getReceiver(message.memberInfo, user.uid)

  const messCase = () => {
    switch (message.messageType) {
      case 'text': {
        return message.latestMessage
      }
      case 'image': {
        return <PhotoOutlinedIcon />
      }
      case 'video': {
        return <VideoLibraryOutlinedIcon />
      }
    }
  }

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
          backgroundColor: theme.palette.action.hover,
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
          <Typography
            variant='subtitle1'
            fontWeight='600'
            overflow='hidden'
            textOverflow='ellipsis'
            sx={{ color: theme.palette.text.disabled }}
          >
            {receiver?.displayName}
          </Typography>
          <Typography
            variant='subtitle2'
            overflow='hidden'
            textOverflow='ellipsis'
            sx={{ color: theme.palette.text.disabled, display: 'flex', alignItems: 'end' }}
          >
            {message.sender === user.uid && <Typography>Bạn: </Typography>} {messCase()}
          </Typography>
        </Box>
      </Stack>

      <Typography
        variant='caption'
        flexShrink={0}
        py={0.7}
        sx={{ color: theme.palette.text.primary, textTransform: 'capitalize' }}
      >
        {formatDateIntl(message.createAt)}
      </Typography>
    </Stack>
  )
}

export default ChatElement
