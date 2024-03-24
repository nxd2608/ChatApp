import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../firebase/firebaseConfig'
import { NavLink, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { authenticated, profile } from '../../redux/slice/auth.slice'
import { setProfileToLS } from '../../utils/utils'
import paths from '../../utils/constant'
import { CredentialSchema, credentialSchema } from '../../utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const googleProvider = new GoogleAuthProvider()

type FormData = Pick<CredentialSchema, 'email' | 'password'>
const loginSchema = credentialSchema.pick(['email', 'password'])

function Login() {
  const theme = useTheme()

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const handleLoginWithEmailAndPassword = handleSubmit((data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const { uid } = userCredential.user
        getDoc(doc(db, 'users', uid)).then((docSnap) => {
          const user = docSnap.data()! as User
          dispatch(profile(user))
          dispatch(authenticated(true))
          setProfileToLS(user)
          navigate(paths.chat)
        })
      })
      .catch(() =>
        setError('password', {
          type: 'server',
          message: 'Email hoặc password không chính xác'
        })
      )
  })

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      const { uid, displayName, email, photoURL } = result.user

      const userRef = doc(db, 'users', uid)

      const docSnap = await getDoc(userRef)

      if (!docSnap.exists()) {
        setDoc(userRef, {
          userID: uid,
          uid,
          displayName,
          email,
          photoURL,
          friends: [],
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
      navigate(paths.chat)
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
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Box
        sx={{
          width: '30%',
          [theme.breakpoints.down('sm')]: { width: '100%', p: 3, boxSizing: 'border-box' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography component='h1' variant='h5' sx={{ color: theme.palette.text.primary }}>
          Sign in
        </Typography>
        <Stack sx={{ mt: 1, width: '100%' }} spacing={2}>
          <Box>
            <TextField required fullWidth id='email' label='Email Address' type='text' {...register('email')} />
            <Typography variant='subtitle2' sx={{ minHeight: '1.25rem', color: theme.palette.error.main }}>
              {errors.email?.message && errors.email.message}
            </Typography>
          </Box>
          <Box>
            <TextField required fullWidth label='Password' type='password' id='password' {...register('password')} />
            <Typography variant='subtitle2' sx={{ minHeight: '1.25rem', color: theme.palette.error.main }}>
              {errors.password?.message && errors.password.message}
            </Typography>
          </Box>
          <Stack direction='column' my={2} spacing={2}>
            <Button type='submit' fullWidth variant='contained' onClick={handleLoginWithEmailAndPassword}>
              Sign In
            </Button>
            <Button type='submit' fullWidth variant='contained' onClick={handleLoginGoogle}>
              Continue with Google
            </Button>
          </Stack>
          <Grid container>
            <Grid item xs>
              <NavLink
                to={'#'}
                style={{
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                  textDecoration: 'none'
                }}
              >
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to={paths.register}
                style={{
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                  textDecoration: 'none'
                }}
              >
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login
