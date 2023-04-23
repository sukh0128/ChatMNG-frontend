import { ChatIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, Icon, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { CSSProperties, useState } from 'react'
import { localConfirm } from '../../lib/toast'
import { Chat } from '../../lib/type'
import { useElementRects } from '../../lib/useElementsRects'
import { useChatContext } from './chatContext'
import ThemeToggle from './themeToggle'

type Props = {
  id: any
  message?: string
}
// Show the whole chat history
export const Chats = ({ id, message }: Props) => {
  const router = useRouter()
  // Check if the provided ID is not a theme color or an actual id
  const isChat = id === 'dark' || id === 'light' ? false : true
  // Push the id to the router
  const handleClick = (id: string) => {
    router.push(`/chat/${id}`)
  }
  if(isChat)
  {
    
    const l: Chat[] = JSON.parse(id)
    return (
      <Box
        w="300px"
        mt={1}
        borderRadius={4}
        noOfLines={1}
        lineHeight={7}
        minH="10"
        px={4}
        py={2}
        cursor="pointer"
        _hover={{ bg: 'gray.700' }}
        onClick={() => handleClick(l[0].id)}
      >
        <Icon as={ChatIcon} fontSize="md" mr={3} />
        {/*Nevigation text must be the first search prompt text*/}
        {l[0].message}
      </Box>
    )
  }
  // if not a chat, we still need to return it
  else {
    return (
      <Box
        w="300px"
        mt={1}
        borderRadius={4}
        noOfLines={1}
        lineHeight={7}
        minH="10"
        px={4}
        py={2}
        cursor="pointer"
        _hover={{ bg: 'gray.700' }}
      >
        <Icon as={ChatIcon} fontSize="md" mr={3} />
        {message}
      </Box>
    )
  }
}

// Render the chat navigation menu and provide chat-related actions such as creating a new chat, clearing all chats, and toggling the theme.
export const ChatSelection = () => {
  const { chats: data } = useChatContext()
  // 'useElementRects' to obtain a ref and the top value for managing the scroll behavior of the navigation 
  const { ref, top } = useElementRects()
  const router = useRouter()
  // Create new chat
  const handleCreateChat = () => {
    router.push('/')
  }
  // Clear the localstorage if the user requests it
  const handleClearChats = async () => {
    ;(await localConfirm('Are you sure you want to delete all chats?')) &&
      localStorage.clear()
      router.push('/')
  }
  // Make sure the right side navigation menu is fixed and static when scrolling
  const stickyStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.08)',
    borderRadius: '2',
    zIndex: 200
  }
  const [navSize, changeNavSize] = useState('large')

  return (
    <Box ref={ref} w={'300px'} style={stickyStyle}>
      <Flex
        style={stickyStyle}
        left="5"
        minH="100vh"
        h="100vh"
        borderRadius={navSize == 'small' ? '4px' : '8px'}
        flexDir="column"
        justifyContent="space-between"
      >
        <Button
          mt="2"
          leftIcon={<SmallAddIcon />}
          id={'new'}
          onClick={handleCreateChat}
          variant="ghost"
          justifyContent="left"
        >
          New Chat
        </Button>
        <Divider />
        {/* Render the list of chats and provide additional chat-related actions */}
        {data && data.map((item: any, i: any) => <Chats id={item} key={i} />)}
        <Spacer />
        <Button
          leftIcon={<DeleteIcon />}
          id={'delete'}
          onClick={handleClearChats}
          variant="ghost"
          justifyContent="left"
        >
          Clear all conversation
        </Button>
        <ThemeToggle />
      </Flex>
    </Box>
  )
}
