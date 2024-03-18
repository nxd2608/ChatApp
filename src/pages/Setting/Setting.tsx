import { RootState } from '../../redux/store'
import { Avatar, Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Fragment } from 'react'

const settingStructure = [
  {
    icon: <NotificationsActiveOutlinedIcon />,
    title: 'Notifications'
  },
  {
    icon: <LockOutlinedIcon />,
    title: 'Privacy'
  },
  {
    icon: <VpnKeyOutlinedIcon />,
    title: 'Security'
  },
  {
    icon: <InsertPhotoOutlinedIcon />,
    title: 'Chat Wallpaper'
  },
  {
    icon: <AssignmentOutlinedIcon />,
    title: 'Request Account Info'
  },
  {
    icon: <InfoOutlinedIcon />,
    title: 'Help'
  }
]

const Setting = () => {
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.auth.profile) as User

  return (
    <Stack direction='column' spacing={4}>
      <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>
        Setting
      </Typography>
      <Stack direction='row' justifyContent='left' alignItems='center' spacing={2} px={3}>
        <Avatar
          alt='avatar'
          src={user.photoURL ?? ''}
          sx={{
            width: 75,
            height: 75
          }}
        />
        <Typography variant='h5' sx={{ color: theme.palette.text.primary }}>
          {user.displayName}
        </Typography>
      </Stack>
      <Stack spacing={2} px={3}>
        {settingStructure.map((setting) => (
          <Fragment>
            <Stack key={setting.title} direction='row' spacing={2} px={3} py={1}>
              <Box sx={{ color: theme.palette.text.primary }}>{setting.icon}</Box>
              <Typography sx={{ color: theme.palette.text.primary }}>{setting.title}</Typography>
            </Stack>
            <Divider />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  )
}

export default Setting
