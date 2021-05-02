import { useLocation } from 'react-router-dom'

const useSearchQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search)
}

export default useSearchQuery
