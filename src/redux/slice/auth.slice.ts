import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getProfileFromLS } from '../../utils/utils'

interface Props {
  isAuthenticated: boolean
  profile: User | null
}

const initialState: Props = {
  isAuthenticated: Boolean(getProfileFromLS()),
  profile: getProfileFromLS()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    profile: (state, action: PayloadAction<User | null>) => {
      state.profile = action.payload
    }
  }
})

export const { authenticated, profile } = authSlice.actions

export default authSlice.reducer
