import { Data } from "plotly.js";
import { useCallback, useEffect, useState } from "react";

import Chart from "./Chart";

export interface SalesData {
  date: string;
  id: number;
  store_nbr: number;
  total_sales: number;
}

export interface SalesChartProps {
  mode: "historical" | "predicted";
  chartType: "line" | "bar" | "scatter";
}

export const SalesChart = ({ mode, chartType }: SalesChartProps) => {
  const [chartData, setChartData] = useState<Array<Data>>([]);

  const generateChartData = useCallback(
    (salesData: Array<SalesData>) => {
      const results: Array<Data> = [];

      for (const { date, store_nbr, total_sales } of salesData) {
        if (results[store_nbr - 1] === undefined) {
          let data: any = { x: [date], y: [total_sales], name: `Store ${store_nbr}` };
          switch (chartType) {
            case "line":
              data.type = "scatter";
              data.mode = "lines";
              break;
            case "scatter":
              data.type = "scatter";
              data.mode = "markers";
              break;
            default:
              data.type = "bar";
          }
          results.push(data);
        } else {
          const data: any = results[store_nbr - 1];
          data.x.push(date);
          data.y.push(total_sales);
        }
      }

      return results;
    },
    [chartType]
  );

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/sales/${mode}`);

      if (response.ok) {
        const json = await response.json();

        const data = generateChartData(json[`${mode}_sales`]);
        setChartData(data);
      }
    })();
  }, [mode, setChartData, generateChartData]);

  const salesType = mode === "historical" ? "Historical" : "Predicted";

  const chartTitle = `${salesType} Sales for All Products`;

  return chartData.length > 0 ? <Chart data={chartData} title={chartTitle} width={960} height={500} /> : null;
};

export default SalesChart;
