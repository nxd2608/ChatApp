import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { MainLayout } from '../layout'
import ChatList from '../pages/Chat/components/ChatList'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import paths from '../utils/constant'
import FriendList from '../pages/Friend/FriendList'
import Setting from '../pages/Setting/Setting'
import Call from '../pages/Call/Call'

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />
}

const RejectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to={paths.chat} />
}

const useRoutesElement = () => {
  const routes = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: paths.login,
          element: <Login />
        },
        {
          path: paths.register,
          element: <Register />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: paths.chat,
          element: (
            <MainLayout>
              <ChatList />
            </MainLayout>
          ),
          children: [
            {
              path: paths.conversation,
              element: (
                <MainLayout>
                  <ChatList />
                </MainLayout>
              )
            }
          ]
        },
        {
          path: paths.friends,
          element: (
            <MainLayout>
              <FriendList />
            </MainLayout>
          )
        },
        {
          path: paths.setting,
          element: (
            <MainLayout>
              <Setting />
            </MainLayout>
          )
        },
        {
          path: paths.call,
          element: <Call />
        }
      ]
    }
  ])
  return routes
}

export default useRoutesElement
