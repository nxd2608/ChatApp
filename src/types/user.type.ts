interface User {
  uid: string
  displayName: string
  email: string
  photoURL: string | null
  key: string
}

type Receiver = Omit<User, 'email'>

type User_Message = {
  uid: string
  key: string
  createAt: number
  latestMessage: string
  friendInfo: Receiver
  sender: string
}
