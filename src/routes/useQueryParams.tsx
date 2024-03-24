import { useSearchParams } from 'react-router-dom'

const useQueryParams = () => {
  const [params] = useSearchParams()
  return Object.fromEntries(params)
}

export default useQueryParams
