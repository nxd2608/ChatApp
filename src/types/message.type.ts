interface Message {
  members: string[]
  message: string
  messageType: MessageType
  createAt: number
  sender: string
  receiver: string
}

type MessageType = 'text' | 'image' | 'video'
