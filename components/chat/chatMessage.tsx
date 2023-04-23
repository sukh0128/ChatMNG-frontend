import { Box, Heading, useColorModeValue, VStack } from '@chakra-ui/react'

type Props = {
  message?: string
  type?: string
}
//chat message neg negeer n haruulah component

const ChatMessage = ({ message, type }: Props) => {
  //theme toggle hiih ued esvel user or chatbot bgaagas hamaarch ongo oorchloh const.uud
  const userNameColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const aiNameColor = useColorModeValue('gray.600', 'whiteAlpha.700')
  const userTextColor = useColorModeValue('gray.800', 'gray.200')
  const aiTextColor = useColorModeValue('black', 'white')
  return (
    <Box
      w="full"
      minW={'container.md'}
      borderRadius="lg"
      p={4}
      mb={2}
      bg={type == 'user' ? 'none' : 'blackAlpha.200'}
    >
      <Heading
        as={'h3'}
        size={'md'}
        color={type == 'user' ? userNameColor : aiNameColor}
      >
        {type == 'user' ? 'You:' : 'ChatBot:'}
      </Heading>
      <Box color={type == 'user' ? userTextColor : aiTextColor}>{message}</Box>
    </Box>
  )
}
export default ChatMessage
