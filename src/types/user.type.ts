interface User {
  uid: string
  displayName: string
  email: string
  photoURL: string | null
  keywords?: string[]
}

type Receiver = Omit<User, 'email'>

type User_Message = {
  uid: string[]
  createAt: number
  latestMessage: string
  sender: string
  memberInfo: User[]
  chatId: string
}
