import { ReactNode } from 'react'
import { Sidebar } from '../../components/navigation'
import { Box, useTheme } from '@mui/material'
import Conversation from '../../pages/Chat/components/Conversation'

interface Props {
  children: ReactNode
}

export const MainLayout = ({ children }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box flexShrink={0} sx={{ width: 100 }}>
        <Sidebar />
      </Box>
      <Box
        flexShrink={0}
        sx={{
          p: 1,
          width: 400,
          height: '100vh',
          backgroundColor: theme.palette.background.default,
          boxSizing: 'border-box',
          position: 'sticky',
          top: 0
        }}
      >
        {children}
      </Box>
      <Box flexGrow={1}>
        <Conversation />
      </Box>
    </Box>
  )
}

export default MainLayout
