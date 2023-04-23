import { HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import Chat from '../components/chat/chat'
import { ChatProvider } from '../components/layouts/chatContext'
const Page = () => {
  const [isFeatured, setIsFeatured] = useState(false)
  const router = useRouter()
  const onToggle = (e: ChangeEvent, toggleName: string) => {
    e.preventDefault()
    if (isFeatured == false) {
      setIsFeatured(true)
    } else {
      setIsFeatured(false)
    }
  }
  return (
    <HStack mb={4} width={'full'} justify="center">
      <ChatProvider id={router.query.id as string}>
        <Chat />
      </ChatProvider>
    </HStack>
  )
}

export default Page
