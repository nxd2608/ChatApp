import { ConversationHeader, ConversationFooter } from '../../../components/conversation'
import { Box, Stack, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import useFirestore from '../../../hooks/useFirestore'
import { Query, and, collection, doc, getDoc, or, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { currentChatId, currentReceiver } from '../../../redux/slice/conversation.slice'
import paths from '../../../utils/constant'
import { getReceiver } from '../../../utils/utils'
import MessageElement from './MessageElement'

const Conversation = () => {
  const { id } = useParams()
  const user = useSelector((state: RootState) => state.auth.profile) as User
  let receiver = useSelector((state: RootState) => state.conversation.receiver)

  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const queryMessage = useMemo<Query | undefined>(() => {
    if (!id || !user) return
    return query(
      collection(db, 'messages'),
      and(
        where('members', 'array-contains', user.uid),
        or(where('sender', '==', receiver?.uid ?? ''), where('receiver', '==', receiver?.uid ?? ''))
      )
    )
  }, [id, receiver])

  const messages = useFirestore<Message>(queryMessage)
  console.log(messages)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length])

  useEffect(() => {
    if (!id) return
    if (!receiver) {
      getDoc(doc(db, 'user_message', id))
        .then((result) => {
          const user_message = result.data() as User_Message
          receiver = getReceiver(user_message.memberInfo, user.uid)
          dispatch(currentReceiver(receiver))
          dispatch(currentChatId(id))
        })
        .catch(() => navigate(paths.chat))
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.background.paper
      }}
    >
      {id && (
        <Fragment>
          <Box flexShrink={0} sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <ConversationHeader />
          </Box>
          <Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                p: 1,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                boxSizing: 'border-box',
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Stack
                spacing={0.5}
                sx={{
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                {messages
                  .sort((a, b) => a.createAt - b.createAt)
                  .map((message, index) => {
                    let isLastMessage = true
                    if (index + 1 != messages.length) {
                      isLastMessage = message.sender !== messages[index + 1].sender
                    }
                    return <MessageElement key={message.createAt} message={message} isLastMessage={isLastMessage} />
                  })}
              </Stack>
            </Box>

            <Box flexShrink={0} sx={{ position: 'sticky', bottom: 0 }}>
              <ConversationFooter />
            </Box>

            <Box ref={ref} />
          </Box>
        </Fragment>
      )}
    </Box>
  )
}

export default Conversation
