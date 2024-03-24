import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import paths from '../../utils/constant'
import { useForm } from 'react-hook-form'
import { CredentialSchema, credentialSchema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { alert } from '../../utils/alert'

const Register = () => {
  const theme = useTheme()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CredentialSchema>({
    resolver: yupResolver(credentialSchema)
  })

  const onSubmit = handleSubmit((data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const newUser = {
          uid: userCredential.user.uid,
          displayName: `${data.lastName} ${data.firstName}`,
          email: userCredential.user.email,
          photoURL: null,
          friends: [],
          keywords: `${data.lastName} ${data.firstName}`.split(' ')
        }

        setDoc(doc(db, 'users', newUser.uid), newUser).then(() => {
          alert({
            title: 'Thành công',
            message: 'Tạo tài khoản thành công',
            icon: 'success'
          }).then(() => navigate(paths.login))
        })
      })
      .catch(() =>
        alert({
          title: 'Lỗi',
          message: 'Tài khoản đã tồn tại',
          icon: 'error'
        })
      )
  })

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
          [theme.breakpoints.down('xl')]: { width: '50%' },
          [theme.breakpoints.down('sm')]: { width: '100%', p: 3, boxSizing: 'border-box' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography component='h1' sx={{ color: theme.palette.text.primary }}>
          Sign up
        </Typography>
        <Box component='form' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id='firstName' label='First Name' {...register('firstName')} />
              <Typography variant='subtitle2' sx={{ minHeight: '1.25rem', color: theme.palette.error.main }}>
                {errors.firstName?.message && errors.firstName.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id='lastName' label='Last Name' {...register('lastName')} />
              <Typography variant='subtitle2' sx={{ minHeight: '1.25rem', color: theme.palette.error.main }}>
                {errors.lastName?.message && errors.lastName.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id='email' label='Email Address' {...register('email')} />
              <Typography variant='subtitle2' sx={{ minHeight: '1.25rem', color: theme.palette.error.main }}>
                {errors.email?.message && errors.email.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label='Password' type='password' id='password' {...register('password')} />
              <Typography variant='subtitle2' sx={{ minHeight: '1.25rem', color: theme.palette.error.main }}>
                {errors.password?.message && errors.password.message}
              </Typography>
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={onSubmit}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <NavLink
                to={paths.login}
                style={{
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                  textDecoration: 'none'
                }}
              >
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
