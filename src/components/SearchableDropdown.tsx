import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'

interface SearchableDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Box position='relative' ref={dropdownRef}>
      <Input
        placeholder={placeholder}
        value={value || ''}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        cursor='pointer'
      />
      {isOpen && (
        <Box
          position='absolute'
          top='100%'
          left='0'
          right='0'
          zIndex={10}
          bg={bgColor}
          border='1px solid'
          borderColor={borderColor}
          borderRadius='md'
          boxShadow='md'
          mt={1}
        >
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            variant='unstyled'
            p={2}
            borderBottom='1px solid'
            borderColor={borderColor}
            borderRadius='none'
            _focus={{
              outline: 'none',
              borderColor: 'blue.500'
            }}
          />
          <List maxHeight='200px' overflowY='auto'>
            {filteredOptions.map((option) => (
              <ListItem
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                  setSearchTerm('')
                }}
                px={3}
                py={2}
                cursor='pointer'
                _hover={{ bg: hoverBgColor }}
              >
                <Text>{option}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

interface DatasetSelectorProps {
  sampleData: Record<string, any>
  selectedDataset: string
  setSelectedDataset: (value: string) => void
}

const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  sampleData,
  selectedDataset,
  setSelectedDataset
}) => {
  return (
    <VStack align='stretch' spacing={2}>
      <Text as='label' htmlFor='dataset-select'>
        Select Dataset
      </Text>
      <SearchableDropdown
        options={Object.keys(sampleData)}
        value={selectedDataset}
        onChange={setSelectedDataset}
        placeholder='Choose a dataset'
      />
    </VStack>
  )
}

export default DatasetSelector
