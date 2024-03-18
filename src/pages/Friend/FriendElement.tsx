import { Avatar, Stack, Typography, useTheme } from '@mui/material'

const FriendElement = ({ friend }: { friend: User_Message }) => {
  const theme = useTheme()

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
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer'
        }
      }}
    >
      <Avatar sx={{ width: 56, height: 56 }} src={friend.friendInfo.photoURL ?? ''} />
      <Typography variant='subtitle1' fontWeight='600' overflow='hidden' textOverflow='ellipsis'>
        {friend.friendInfo.displayName}
      </Typography>
    </Stack>
  )
}

export default FriendElement
