import { Data } from "plotly.js";
import { useCallback, useEffect, useState } from "react";

import Chart from "./Chart";
import { productFamilies } from "./ProductFamilySelector";

export interface SalesData {
  date: string;
  id: number;
  store_nbr: number;
  total_sales: number;
}

export interface SalesChartProps {
  salesType: "historical" | "predicted" | "errors";
  chartType: "line" | "bar" | "scatter";
  productFamily: string;
}

export const SalesChart = ({ salesType, chartType, productFamily }: SalesChartProps) => {
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
      let filter = productFamily === "all_products" ? "" : `/${productFamily}`;

      const response = await fetch(`/api/sales/${salesType}${filter}`);

      if (response.ok) {
        const json = await response.json();

        const data = generateChartData(json[`${salesType}_sales`]);
        setChartData(data);
      }
    })();
  }, [salesType, productFamily, setChartData, generateChartData]);

  const titlePrefix =
    salesType === "historical" ? "Historical" : salesType === "predicted" ? "Predicted" : "Prediction Errors of";

  const chartTitle = `${titlePrefix} Sales for ${(productFamilies as any)[productFamily]}`;

  return chartData.length > 0 ? <Chart data={chartData} title={chartTitle} width={960} height={500} /> : null;
};

export default SalesChart;
