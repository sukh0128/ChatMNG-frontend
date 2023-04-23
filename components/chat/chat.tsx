import { Flex, Spacer } from '@chakra-ui/react'
import { Chat } from '../../lib/type'
import { useChatContext } from '../layouts/chatContext'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'
type Props = {
  data?: undefined | Chat
}

// Main Chat component that users can input and then receive messages from the api call

const Chat = ({ data }: Props) => {
  const router = useRouter()
  const { chat } = useChatContext() // useChatContext hook is used to fetch new messages without refreshing the page
  const [apiResponse, setApiResponse] = useState('')
  const inputRef = useRef<any>(null)
  
  // Generate an ID for the chat and redirect to the chat URL with the ID as soon as the Chat component is mounted
  useEffect(() => {
    let id = router.query.id as string

    if (!id) {
      id = uuid()
      router.push(`/chat/${id}`)
    }
  }, [router])


  const handleApiResponse = (response: string) => {
    setApiResponse(response)
  }

  
  return (
    <Flex
      minH="89vh"
      h="full"
      flexDir="column"
      w={{ sm: '150px', md: '360px', lg: '600px', xl: '900px' }}
      justifyContent="space-between"
    >
      {/* Map the chat data and send it to the ChatMessage component*/}
      {chat &&
        chat?.map((item: any, i: any) => (
          <ChatMessage
            message={item.message as string}
            type={item.type as string}
          />
        ))}
      {/*Upon receiving a response from the API, it updates the 'apiResponse' state, which in turn renders a new ChatMessage component for the bot's response. */}
      {apiResponse && <ChatMessage message={apiResponse} type="bot" />}
      <Spacer />
      <ChatInput
        onSubmitProp={handleApiResponse}
      />
      </Flex>
  )
}
export default Chat
