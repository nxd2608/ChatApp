import { Fragment } from 'react'
import useRoutesElement from './routes/useRoutesElement'

function App() {
  const useRoutes = useRoutesElement()
  return <Fragment>{useRoutes}</Fragment>
}

export default App
