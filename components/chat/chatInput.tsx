import {
  Button,
  HStack,
  Icon,
  Input,
  Spinner,
  chakra,
  InputGroup,
  InputLeftElement,
  useColorModeValue
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useChatPreference } from './useChatPreference'
import { v4 as uuid } from 'uuid'
import { useChatContext } from '../layouts/chatContext'
import { SearchIcon } from '@chakra-ui/icons'
function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay))
}
// // Will call this function prop when we get the API response for the user's message prompt
type Props = {
  onSubmitProp: (response: string) => void
}
//hailt hiih component
const ChatInput = ({ onSubmitProp }: Props) => {
  const [disabled, useDisable] = useState(false)
  const inputTextColor = useColorModeValue('gray.700', 'gray.100')
  const buttonColor = useColorModeValue('green', 'gray')
  const inputRef = useRef<any>(null)
  const router = useRouter()
  const { setLoading } = useChatContext()
  const { saveChatPreference, saveMessagePreference } = useChatPreference()

  // async method to call the back-end API
  const callApi = async (message: string) => {
    // call the hard coded api url
    const url = `https://localhost:44317/api/Chat/translateAndTalk?text=${encodeURIComponent(
      message
    )}&targetLanguage=en&sourceLanguage=mn`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.text()
      onSubmitProp(result)
    } 
    catch (error) {
      console.error('Error calling API:', error)
    }
  }

  // When the submit button is called the onSubmit async function will be executed
  const onSubmit = async () => {
    const message = inputRef.current?.value

    if (!message) {
      return
    }
    // get the id of the url/chat and if it has a value we store it in localstorage and call the API
    // if it doesn't have a value, we create a new chat and route it to the chat/{id} endpoint and call the API
    let id = router.query.id as string

    if (!id) {
      useDisable(true)
      await timeout(2000)
      useDisable(false)
      id = uuid()
      // Save the chat preference and route the values
      saveChatPreference({
        id: id,
        message: message,
        created: new Date(),
        type: 'user'
      })
      router.replace({
        pathname: `/chat/${id}`
      })
      setLoading(true)
      callApi(message) // Call the ASP.NET Core API with the user input
    } 
    else {
      // Create the new message and route it
      saveMessagePreference(id, {
        id: uuid(),
        message: message,
        created: new Date(),
        type: 'user'
      })
      setLoading(true)
      // after we get the input, empty the input box for additional prompts
      inputRef.current.value = null
      callApi(message) // Call the ASP.NET Core API with the user input
    }
  }

  return (
    <chakra.form
      w={{ xs: '20vh', sm: '40vh', md: '45vh', lg: '90vh' }}
      px={{ base: '4', md: '2', lg: '4' }}
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <HStack w="full">
        <InputGroup
          display={['none', null, 'block']}
          color={inputTextColor}
          fontSize={'large'}
          borderColor={inputTextColor}
        >
          <InputLeftElement pointerEvents="none" color={inputTextColor}>
            <Icon fontSize={'md'} as={SearchIcon}></Icon>
          </InputLeftElement>

          <Input
            type="tel"
            pl={8}
            height="44px"
            placeholder="Асуух зүйлээ бичнэ үү..."
            ref={inputRef}
          />
        </InputGroup>
        <Button w="30" onClick={onSubmit} colorScheme={buttonColor}>
          {disabled ? <Spinner /> : 'Хай'}
        </Button>
      </HStack>
    </chakra.form>
  )
}

export default ChatInput
