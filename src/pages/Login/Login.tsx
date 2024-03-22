import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { authenticated, profile } from '../../redux/slice/auth.slice'
import { setProfileToLS } from '../../utils/utils'
import { v4 } from 'uuid'

const googleProvider = new GoogleAuthProvider()

function Login() {
  const theme = useTheme()

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      const { uid, displayName, email, photoURL } = result.user

      // result.user.getIdToken().then((token) => localStorage.setItem('access_token', token))

      const userRef = doc(db, 'users', uid)

      const docSnap = await getDoc(userRef)

      if (!docSnap.exists()) {
        setDoc(userRef, {
          uid,
          displayName,
          email,
          photoURL,
          keywords: displayName?.split(' ')
        })
        const newDocSnap = await getDoc(userRef)
        const newUser = newDocSnap.data() as User
        dispatch(profile(newUser))
        setProfileToLS(newUser)
      } else {
        const oldUser = docSnap.data() as User
        dispatch(profile(oldUser))
        setProfileToLS(oldUser)
      }

      dispatch(authenticated(true))
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: '30%',
          [theme.breakpoints.down('xl')]: { width: '50%' },
          [theme.breakpoints.down('sm')]: { width: '100%', p: 3, boxSizing: 'border-box' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Stack direction='column' my={2} spacing={2}>
            <Button type='submit' fullWidth variant='contained'>
              Sign In
            </Button>
            <Button type='submit' fullWidth variant='contained' onClick={handleLoginGoogle}>
              Continue with Google
            </Button>
          </Stack>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
