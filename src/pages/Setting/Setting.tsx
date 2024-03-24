import { AppDispatch, RootState } from '../../redux/store'
import { Avatar, Box, Stack, Typography, styled, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'firebase/auth'
import { auth, db, storage } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import paths from '../../utils/constant'
import { authenticated, profile } from '../../redux/slice/auth.slice'
import { deleteFromLS, setProfileToLS } from '../../utils/utils'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { v4 } from 'uuid'

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const avatarRef = ref(storage, `avatar/${v4()}`)

const Setting = () => {
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.auth.profile) as User

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      uploadBytes(avatarRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref).then((downloadUrl) => handleUpdateProfile(downloadUrl)))
        .catch((error) => console.log(error))
    }
  }

  const handleUpdateProfile = async (url: string) => {
    await updateDoc(doc(db, 'users', user.uid), {
      photoURL: url
    })

    const docSnap = await getDoc(doc(db, 'users', user.uid))
    if (docSnap.exists()) {
      const data = docSnap.data() as User
      setProfileToLS(data)
      dispatch(profile(data))
    }
  }

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
        <Box component='label'>
          <Avatar
            alt='avatar'
            src={user.photoURL ?? ''}
            sx={{
              width: 75,
              height: 75,
              background: 'linear-gradient(315deg, rgba(0, 255, 231), rgba(212, 217, 0))'
            }}
          >
            {user?.displayName
              .split(' ')
              .at(length - 1)
              ?.charAt(0)}
          </Avatar>
          <VisuallyHiddenInput type='file' accept='.png,.jpg,.jpeg' onChange={handleUploadFile} />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='space-between' height={'100%'}>
          <Typography variant='h5' sx={{ color: theme.palette.text.primary }}>
            {user.displayName}
          </Typography>
          <Typography variant='body2' sx={{ color: theme.palette.text.primary, fontStyle: 'italic' }}>
            {user.email}
          </Typography>
        </Box>
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
                backgroundColor: theme.palette.action.hover
              }
            }}
          >
            <Box sx={{ color: theme.palette.text.primary }}>{setting.icon}</Box>
            <Typography sx={{ color: theme.palette.text.primary }}>{setting.title}</Typography>
          </Stack>
        ))}
        <Stack
          direction='row'
          spacing={2}
          sx={{
            p: 2,
            borderRadius: 4,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }}
          onClick={handleLogout}
        >
          <Box sx={{ color: theme.palette.text.primary }}>
            <LogoutIcon />
          </Box>
          <Typography sx={{ color: theme.palette.text.primary }}>Log out</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Setting
