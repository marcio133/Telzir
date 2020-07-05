export interface Call {
  destiny: string;
  duration: number;
  origin: string;
  plan: string;
}

export interface Simulation {
  result: number;
  resultNoPlan: number;
}

export interface HistoricData {
  date: string;
  destiny: string;
  duration: number;
  origin: string;
  plan: string;
  result: number;
  resultNoPlan: number;
}
