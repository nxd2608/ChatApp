import { Avatar, Box, Stack, Typography, Badge, styled, IconButton, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}))

const ConversationHeader = () => {
  const theme = useTheme()
  const receiver = useSelector((state: RootState) => state.conversation.receiver)

  return (
    <Box
      sx={{
        p: 1,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Box display='flex' justifyContent='space-between' gap={1}>
        <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
          <Avatar sx={{ width: 48, height: 48 }} src={receiver?.photoURL ?? ''} />
        </StyledBadge>
        <Stack>
          <Typography variant='subtitle1' sx={{ color: theme.palette.text.primary }}>
            {receiver?.displayName}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: theme.palette.text.primary }}>
            Đang hoạt động
          </Typography>
        </Stack>
      </Box>

      <Stack direction='row' spacing={2}>
        <IconButton>
          <VideocamRoundedIcon />
        </IconButton>

        <IconButton>
          <PhoneRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default ConversationHeader
