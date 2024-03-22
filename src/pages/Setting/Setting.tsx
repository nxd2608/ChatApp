import { AppDispatch, RootState } from '../../redux/store'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { Fragment } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import paths from '../../utils/constant'
import { authenticated, profile } from '../../redux/slice/auth.slice'
import { deleteFromLS } from '../../utils/utils'

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
  },
  {
    icon: <LogoutIcon />,
    title: 'Log out'
  }
]

const Setting = () => {
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.auth.profile) as User

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        deleteFromLS()
        dispatch(authenticated(false))
        dispatch(profile(null))
        navigate(paths.login)
      })
      .catch(() => {
        alert('Logout fail')
      })
  }

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
      <Stack px={3}>
        {settingStructure.map((setting) => (
          <Stack
            key={setting.title}
            direction='row'
            spacing={2}
            sx={{
              p: 2,
              borderRadius: 4,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.primary.main
              }
            }}
            onClick={handleLogout}
          >
            <Box sx={{ color: theme.palette.text.primary }}>{setting.icon}</Box>
            <Typography sx={{ color: theme.palette.text.primary }}>{setting.title}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Setting
