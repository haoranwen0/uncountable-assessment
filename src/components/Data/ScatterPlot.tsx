import React, { useState, useMemo } from 'react'
import {
  Box,
  Heading,
  Select,
  HStack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import {
  ExperimentData,
  experimentInputs,
  experimentOutputs
} from '../../types/utils'

interface ScatterPlotProps {
  data: ExperimentData
}

type Variable = experimentInputs | experimentOutputs

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const [xAxis, setXAxis] = useState<Variable>('Polymer 1')
  const [yAxis, setYAxis] = useState<Variable>('Viscosity')

  const variables: Variable[] = useMemo(() => {
    const sampleExperiment = Object.values(data)[0]
    return [
      ...Object.keys(sampleExperiment.inputs),
      ...Object.keys(sampleExperiment.outputs)
    ] as Variable[]
  }, [data])

  const plotData = useMemo(() => {
    return Object.entries(data).map(([id, experiment]) => ({
      id,
      x:
        experiment.inputs[xAxis as experimentInputs] ||
        experiment.outputs[xAxis as experimentOutputs],
      y:
        experiment.inputs[yAxis as experimentInputs] ||
        experiment.outputs[yAxis as experimentOutputs]
    }))
  }, [data, xAxis, yAxis])

  return (
    <Box width='100%' height='600px'>
      <Heading
        as='h2'
        size='xl'
        my={4}
        textAlign='center'
        fontWeight='bold'
        letterSpacing='tight'
        color='teal.500'
      >
        Interactive Experiment Visualization
      </Heading>
      <Text
        fontSize='md'
        textAlign='center'
        mb={8}
        maxWidth='600px'
        mx='auto'
        color='gray.600'
      >
        Explore relationships between input variables and output metrics across
        multiple experiments. Select variables for X and Y axes to visualize
        correlations and trends in the data.
      </Text>
      <HStack spacing={4} mb={4} justifyContent='center'>
        <Select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value as Variable)}
          width='200px'
          height='40px'
          bg={useColorModeValue('white', 'gray.700')}
          color={useColorModeValue('gray.800', 'white')}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          _hover={{
            borderColor: useColorModeValue('gray.400', 'gray.500')
          }}
          _focus={{
            borderColor: useColorModeValue('blue.500', 'blue.300'),
            boxShadow: useColorModeValue(
              '0 0 0 1px blue.500',
              '0 0 0 1px blue.300'
            )
          }}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Select>
        <Select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value as Variable)}
          width='200px'
          height='40px'
          bg={useColorModeValue('white', 'gray.700')}
          color={useColorModeValue('gray.800', 'white')}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          _hover={{
            borderColor: useColorModeValue('gray.400', 'gray.500')
          }}
          _focus={{
            borderColor: useColorModeValue('blue.500', 'blue.300'),
            boxShadow: useColorModeValue(
              '0 0 0 1px blue.500',
              '0 0 0 1px blue.300'
            )
          }}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Select>
      </HStack>
      <ResponsiveContainer width='100%' height='80%'>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis
            type='number'
            dataKey='x'
            name={xAxis}
            label={{ value: xAxis, position: 'bottom' }}
          />
          <YAxis
            type='number'
            dataKey='y'
            name={yAxis}
            label={{ value: yAxis, angle: -90, position: 'left' }}
          />
          <ZAxis type='category' dataKey='id' name='Experiment' />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={<CustomTooltip />}
          />
          <Scatter name='Experiments' data={plotData} fill='#8884d8' />
          <CartesianGrid strokeDasharray='3 3' />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  )
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <Box bg='white' p={2} border='1px solid #ccc' borderRadius='md'>
        <p>{`Experiment: ${data.id}`}</p>
        <p>{`${payload[0].name}: ${data.x}`}</p>
        <p>{`${payload[1].name}: ${data.y}`}</p>
      </Box>
    )
  }
  return null
}

export default ScatterPlot
