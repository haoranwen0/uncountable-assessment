import React from 'react'
import { Box, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts'
import { Experiment } from '../../types/utils'

type DataPoint = {
  subject: string
  value: number
  originalValue: number
}

interface RadarPlotProps {
  experiment: Experiment
  experimentId: string
}

const normalizeData = (data: Record<string, number>): DataPoint[] => {
  const maxValue = Math.max(...Object.values(data))
  return Object.entries(data).map(([key, value]) => ({
    subject: key,
    value: (value / maxValue) * 100,
    originalValue: value
  }))
}

const RadarPlot: React.FC<RadarPlotProps> = ({ experiment, experimentId }) => {
  const headingColor = useColorModeValue('black', 'white')
  const tooltipBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box width='100%'>
      <Heading as='h2' size='md' my={4} color={headingColor}>
        Input/Output Radar Plots
      </Heading>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Heading
            as='h3'
            size='md'
            mb={2}
            textAlign='center'
            color={headingColor}
          >
            Inputs
          </Heading>
          <ResponsiveContainer width='100%' height={400}>
            <RadarChart
              cx='50%'
              cy='50%'
              outerRadius='80%'
              data={normalizeData(experiment.inputs)}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey='subject' />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name='Input'
                dataKey='value'
                stroke='#8884d8'
                fill='#8884d8'
                fillOpacity={0.6}
                dot
              />
              <Tooltip content={<CustomTooltip bgColor={tooltipBgColor} />} />{' '}
            </RadarChart>
          </ResponsiveContainer>
        </Box>
        <Box>
          <Heading
            as='h3'
            size='md'
            mb={2}
            textAlign='center'
            color={headingColor}
          >
            Outputs
          </Heading>
          <ResponsiveContainer width='100%' height={400}>
            <RadarChart
              cx='50%'
              cy='50%'
              outerRadius='80%'
              data={normalizeData(experiment.outputs)}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey='subject' />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name='Output'
                dataKey='value'
                stroke='#82ca9d'
                fill='#82ca9d'
                fillOpacity={0.6}
                dot
              />
              <Tooltip content={<CustomTooltip bgColor={tooltipBgColor} />} />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

const CustomTooltip: React.FC<any> = ({ active, payload, bgColor }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <Box bg={bgColor} p={2} border='1px solid #ccc' borderRadius='md'>
        <p>{`${data.subject}`}</p>
        <p>{`Normalized: ${data.value.toFixed(2)}%`}</p>
        <p>{`Original: ${data.originalValue}`}</p>
      </Box>
    )
  }
  return null
}

export default RadarPlot
