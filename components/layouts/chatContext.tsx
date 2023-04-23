import {
  createContext,
  Dispatch,
  ReactChild,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { Chat } from '../../lib/type'
import { useChatPreference } from '../chat/useChatPreference'

// define the custom context values for the ChatContext
type ContextType = {
  chat: undefined | Chat[]
  chats: undefined | any[]
  id: string | undefined
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}
export const ChatContext = createContext<ContextType>({
  chat: undefined,
  chats: undefined,
  loading: true,
  id: undefined,
  setLoading: () => {}
})

type Props = {
  children: ReactChild[] | ReactChild
  id: string | undefined
}
// takes 'children' and 'id' as props, and manage the 'chat', 'chats', and 'loading' states using useState hook
export const ChatProvider = ({ children, id }: Props) => {
  const { getChatIdPreference, getChatPreference } = useChatPreference()
  const [chat, setChat] = useState([])
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  // Fetch all chats from localStorage and update the 'chats' state. Also set the 'loading' state to false.
  useEffect(() => {
    setChats(getChatPreference())
    setLoading(false)
  }, [loading, id])
  //Fetch the chat with the given ID from localStorage and update the 'chat' state. It also sets the 'loading' state to false.
  useEffect(() => {
    setChat(getChatIdPreference(id))
    setLoading(false)
  }, [loading, id])

  return (
    <ChatContext.Provider
      value={{
        chat: chat,
        chats: chats,
        id: id,
        loading: loading,
        setLoading
        }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => useContext(ChatContext)
