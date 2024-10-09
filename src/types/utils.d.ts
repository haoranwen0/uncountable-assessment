type experimentInputs =
  | 'Polymer 1'
  | 'Polymer 2'
  | 'Polymer 3'
  | 'Polymer 4'
  | 'Carbon Black High Grade'
  | 'Carbon Black Low Grade'
  | 'Silica Filler 1'
  | 'Silica Filler 2'
  | 'Plasticizer 1'
  | 'Plasticizer 2'
  | 'Plasticizer 3'
  | 'Antioxidant'
  | 'Coloring Pigment'
  | 'Co-Agent 1'
  | 'Co-Agent 2'
  | 'Co-Agent 3'
  | 'Curing Agent 1'
  | 'Curing Agent 2'
  | 'Oven Temperature'

type experimentOutputs =
  | 'Viscosity'
  | 'Cure Time'
  | 'Elongation'
  | 'Tensile Strength'
  | 'Compression Set'

interface Experiment {
  inputs: Record<experimentInputs, number>
  outputs: Record<experimentOutputs, number>
}

export type ExperimentData = Record<string, Experiment>

export interface ChartData {
  name: string
  value: number
}
