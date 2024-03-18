import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// type Receiver = Pick<User, 'uid' | 'displayName' | 'photoURL'>

interface Props {
  receiver: Receiver | null
}

const initialState: Props = {
  receiver: null
}

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    currentReceiver: (state, action: PayloadAction<Receiver>) => {
      state.receiver = action.payload
    }
  }
})

export const { currentReceiver } = conversationSlice.actions

export default conversationSlice.reducer
