import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// type Receiver = Pick<User, 'uid' | 'displayName' | 'photoURL'>

interface Props {
  receiver: Receiver | null
  chatId: string | null
}

const initialState: Props = {
  receiver: null,
  chatId: null
}

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    currentReceiver: (state, action: PayloadAction<Receiver>) => {
      state.receiver = action.payload
    },
    currentChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload
    }
  }
})

export const { currentReceiver, currentChatId } = conversationSlice.actions

export default conversationSlice.reducer
