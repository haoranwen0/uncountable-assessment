import React from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue
} from '@chakra-ui/react'

interface TableViewProps {
  title: string
  data: Record<string, number>
}

const TableView: React.FC<TableViewProps> = ({ title, data }) => {
  const boxBgColor = useColorModeValue('white', 'gray.700')
  const boxShadow = useColorModeValue('md', 'dark-lg')

  return (
    <Box
      bg={boxBgColor}
      p={4}
      borderRadius='md'
      boxShadow={boxShadow}
      h='100%'
      flex='1'
    >
      <Heading as='h2' size='md' mb={4}>
        {title}
      </Heading>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Parameter</Th>
            <Th isNumeric>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(data).map(([key, value]) => (
            <Tr key={key}>
              <Td>{key}</Td>
              <Td isNumeric>{value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TableView
