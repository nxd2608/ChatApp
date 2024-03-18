import { configureStore } from '@reduxjs/toolkit'
import { authReducer, conversationReducer, themeReducer } from './slice/index'

const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
