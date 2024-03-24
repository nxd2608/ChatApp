import { Avatar, Stack, Typography, useTheme } from '@mui/material'
import { getReceiver } from '../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const FriendElement = ({ friend }: { friend: User_Message }) => {
  const theme = useTheme()

  const user = useSelector((state: RootState) => state.auth.profile) as User
  const receiver = getReceiver(friend.memberInfo, user.uid)

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{
        p: 1,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          cursor: 'pointer'
        }
      }}
    >
      <Avatar sx={{ width: 56, height: 56 }} src={receiver?.photoURL ?? ''} />
      <Typography
        variant='subtitle1'
        fontWeight='600'
        overflow='hidden'
        textOverflow='ellipsis'
        sx={{ color: theme.palette.text.disabled }}
      >
        {receiver?.displayName}
      </Typography>
    </Stack>
  )
}

export default FriendElement
