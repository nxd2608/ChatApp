interface User {
  userID: string
  uid: string
  displayName: string
  email: string
  photoURL: string | null
  friends: string[]
  keywords?: string[]
}

type Receiver = Omit<User, 'email' | 'friends'>

type User_Message = {
  uid: string[]
  createAt: number
  latestMessage: string
  messageType: MessageType
  sender: string
  memberInfo: User[]
  chatId: string
}
