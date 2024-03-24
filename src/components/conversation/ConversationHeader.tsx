import { Avatar, Box, Stack, Typography, Badge, styled, IconButton, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import { useNavigate } from 'react-router-dom'
import { ZegoInvitationType, ZegoUIKitPrebuilt, ZegoUser } from '@zegocloud/zego-uikit-prebuilt'
import ZIM from 'zego-zim-web'
import { useEffect, useRef } from 'react'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}))

const ConversationHeader = () => {
  const theme = useTheme()

  const user = useSelector((state: RootState) => state.auth.profile) as User
  const receiver = useSelector((state: RootState) => state.conversation.receiver) as Receiver

  const ref = useRef<ZegoUIKitPrebuilt>()

  useEffect(() => {
    const appID = 1900811219
    const serverSecret = '216a534b932715241b26bbe6ca87de3a'
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      'PB6GTXGI1w8m1',
      user.userID,
      `${user.displayName}`
    )

    ref.current = ZegoUIKitPrebuilt.create(kitToken)
    ref.current.setCallInvitationConfig({
      onSetRoomConfigBeforeJoining: () => {
        return {
          showScreenSharingButton: false,
          showTextChat: true
        }
      }
    })
    ref.current.addPlugins({ ZIM })
  }, [receiver.uid])

  const call = (type: 'InvitationTypeVideoCall' | 'InvitationTypeVoiceCall') => {
    ref.current!.sendCallInvitation({
      callees: [{ userID: receiver.userID, userName: `${receiver.displayName}` }],
      callType: ZegoUIKitPrebuilt[type],
      timeout: 10
    })
  }

  return (
    <Box
      sx={{
        p: 1,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper
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
        <IconButton onClick={() => call('InvitationTypeVideoCall')}>
          <VideocamRoundedIcon />
        </IconButton>

        <IconButton onClick={() => call('InvitationTypeVoiceCall')}>
          <PhoneRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default ConversationHeader
