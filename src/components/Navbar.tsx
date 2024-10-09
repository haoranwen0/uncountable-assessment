import React from 'react'
import { Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react'
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi'

interface NavbarProps {
  isSidePanelOpen: boolean
  setIsSidePanelOpen: (isOpen: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({
  isSidePanelOpen,
  setIsSidePanelOpen
}) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex justifyContent='space-between' alignItems='center' mb={6}>
      <Flex alignItems='center'>
        <IconButton
          aria-label='Open side panel'
          icon={<FiMenu />}
          onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          mr={4}
        />
        <Heading as='h1' size='xl'>
          Dashboard
        </Heading>
      </Flex>
      <Flex>
        <IconButton
          aria-label='Toggle color mode'
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          mr={2}
        />
      </Flex>
    </Flex>
  )
}

export default Navbar
