import React, { useState } from 'react'
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue
} from '@chakra-ui/react'

import DatasetSelector from './components/SearchableDropdown'
import Navbar from './components/Navbar'
import RadarPlot from './components/Data/RadarPlot'
import ScatterPlot from './components/Data/ScatterPlot'
import Sidebar from './components/Sidebar'
import TableView from './components/Data/TableView'

import dataset from './data/dataset.json'

import { ExperimentData } from './types/utils'

const sampleData: ExperimentData = dataset

const App: React.FC = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState('20170102_EXP_56')

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box bg={bgColor} minHeight='100vh' p={4} color={textColor}>
      <Flex>
        <Sidebar isOpen={isSidePanelOpen} />
        <Box
          transition='margin-left 0.3s'
          ml={isSidePanelOpen ? '250px' : '0'}
          width='100%'
        >
          <Navbar
            isSidePanelOpen={isSidePanelOpen}
            setIsSidePanelOpen={setIsSidePanelOpen}
          />
          <Tabs variant='enclosed' mb={4}>
            <TabList>
              <Tab>Individual Experiment</Tab>
              <Tab>All Experiments</Tab>
            </TabList>
            <TabPanels>
              <TabPanel pt={4}>
                <Box mb={6}>
                  <DatasetSelector
                    sampleData={sampleData}
                    selectedDataset={selectedDataset}
                    setSelectedDataset={setSelectedDataset}
                  />
                </Box>
                <Flex flexDir='column' w='100%' gap={4}>
                  <Flex w='100%' justifyContent='space-between' gap={4}>
                    <TableView
                      title='Inputs'
                      data={sampleData[selectedDataset].inputs}
                    />
                    <TableView
                      title='Outputs'
                      data={sampleData[selectedDataset].outputs}
                    />
                  </Flex>
                  <Flex w='100%' gap={4}>
                    <RadarPlot
                      experiment={sampleData[selectedDataset]}
                      experimentId={selectedDataset}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel pt={4}>
                <ScatterPlot data={sampleData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  )
}

export default App
