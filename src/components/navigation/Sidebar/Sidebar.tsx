import { Avatar, Box, IconButton, Stack, useColorScheme, useTheme } from '@mui/material'
import Logo from '../../../assets/Logo'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { NavLink } from 'react-router-dom'
import paths from '../../../utils/constant'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined'

const Sidebar = () => {
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.auth.profile)

  return (
    <Box
      sx={{
        py: 1,
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <NavLink
          to={paths.chat}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Logo />
        </NavLink>

        <NavLink
          to={paths.chat}
          style={({ isActive }) => ({
            borderRadius: 100,
            backgroundColor: isActive ? theme.palette.background.paper : 'transparent'
          })}
        >
          <IconButton>
            <SmsOutlinedIcon />
          </IconButton>
        </NavLink>

        <NavLink
          to={paths.friends}
          style={({ isActive }) => ({
            borderRadius: 100,
            backgroundColor: isActive ? theme.palette.background.paper : 'transparent'
          })}
        >
          <IconButton>
            <PeopleRoundedIcon />
          </IconButton>
        </NavLink>

        <NavLink
          to={paths.setting}
          style={({ isActive }) => ({
            borderRadius: 100,
            backgroundColor: isActive ? theme.palette.background.paper : 'transparent'
          })}
        >
          <IconButton>
            <SettingsSuggestOutlinedIcon />
          </IconButton>
        </NavLink>
      </Stack>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box>
          <ModeToggle />
        </Box>
        <Box>
          <Avatar
            alt='avatar'
            src={user?.photoURL ?? ''}
            sx={{
              background: 'linear-gradient(315deg, rgba(0, 255, 231), rgba(212, 217, 0))'
            }}
          >
            {user?.displayName
              .split(' ')
              .at(length - 1)
              ?.charAt(0)}
          </Avatar>
        </Box>
      </Stack>
    </Box>
  )
}

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme()

  return (
    <IconButton
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? <LightModeRoundedIcon /> : <Brightness4OutlinedIcon />}
    </IconButton>
  )
}

export default Sidebar
