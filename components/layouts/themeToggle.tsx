import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
//Light and Dark theme toggler button
const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      mb="4"
      aria-label="Toggle theme"
      colorScheme={useColorModeValue('purple', 'orange')}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      onClick={toggleColorMode}
    ></IconButton>
  )
}

export default ThemeToggle
