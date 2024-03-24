import { Alert, AlertColor, Snackbar } from '@mui/material'

interface Props {
  message: string
  type: AlertColor
  isOpen: boolean
  handleClose: () => void
}

const Toast = ({ message, type, isOpen, handleClose }: Props) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={type} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
