import { formatDistanceToNowStrict, formatRelative, subDays } from 'date-fns'

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  return localStorage.setItem('profile', JSON.stringify(profile))
}

export const getModeFromLS = (): 'light' | 'dark' | 'system' => {
  const result = localStorage.getItem('mui-mode')
  switch (result) {
    case 'dark':
      return 'dark'
    case 'system':
      return 'system'
    default:
      return 'light'
  }
}

export const formatDateRelative = (seconds: number) => {
  return formatRelative(subDays(new Date(seconds), 0), new Date())
}

export const formatDateDistance = (seconds: number) => {
  return formatDistanceToNowStrict(new Date(seconds))
}
