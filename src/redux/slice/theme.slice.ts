import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getModeFromLS } from '../../utils/utils'

type Mode = 'light' | 'dark' | 'system'

interface Props {
  mode: Mode
}

const initialState: Props = {
  mode: getModeFromLS()
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    mode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload
    }
  }
})

export const { mode } = themeSlice.actions

export default themeSlice.reducer
