import { Data } from "plotly.js";
import Plot from "react-plotly.js";

export interface ChartProps {
  data: Array<Data>;
  width: number;
  height: number;
  title: string;
}

export const Chart = ({ data, width, height, title }: ChartProps) => {
  return <Plot data={data} layout={{ width, height, title }} />;
};

export default Chart;
