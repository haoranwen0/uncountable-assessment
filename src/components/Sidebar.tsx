import React from 'react'
import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { FiBarChart2, FiHome, FiSettings } from 'react-icons/fi'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const boxBgColor = useColorModeValue('white', 'gray.800')
  const boxShadow = useColorModeValue(
    '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
    '0 4px 12px 0 rgba(255, 255, 255, 0.05)'
  )

  return (
    <Box
      as='nav'
      w={isOpen ? '250px' : '0'}
      h='100vh'
      bg={boxBgColor}
      boxShadow={boxShadow}
      position='fixed'
      top='0'
      left='0'
      overflowX='hidden'
      transition='0.3s'
      zIndex='1000'
    >
      <VStack spacing={4} align='stretch' mt={4} px={4}>
        <Heading size='md'>Menu</Heading>
        <Button leftIcon={<FiHome />}>Home</Button>
        <Button leftIcon={<FiBarChart2 />}>Analytics</Button>
        <Button leftIcon={<FiSettings />}>Settings</Button>
      </VStack>
    </Box>
  )
}

export default Sidebar
