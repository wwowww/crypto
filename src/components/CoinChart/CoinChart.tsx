import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useChartData } from "@/hooks/useChartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatPeriod } from "@/utils/formatPeriod";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CoinChart = () => {
  const [selectedTab, setSelectedTab] = useState<string>("minutes");
  const [count, setCount] = useState<number>(30);

  const { chartData, isLoading, isError } = useChartData({
    count,
    period: selectedTab,
  });

  const handleTabClick = (period: string) => {
    setSelectedTab(period);
    if (period === "minutes") setCount(30);
    else if (period === "days") setCount(30);
    else if (period === "weeks") setCount(12);
    else if (period === "months") setCount(6);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !Array.isArray(chartData) || chartData.length === 0) {
    return <div>차트데이터 불러올 수 없습니다...</div>;
  }

  const chartDataFormatted = {
    labels: chartData.map((entry: any) => {
      return formatPeriod({period: selectedTab, entry})
    }),
    datasets: [
      {
        label: "Price",
        data: chartData.map((entry: any) => entry.trade_price),
        borderColor: "#4387f9",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>시세 차트</h2>
      <div className="tabs">
        <button onClick={() => handleTabClick("minutes")}>분</button>
        <button onClick={() => handleTabClick("days")}>일</button>
        <button onClick={() => handleTabClick("weeks")}>주</button>
        <button onClick={() => handleTabClick("months")}>월</button>
      </div>

      <Line
        data={chartDataFormatted}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              title: {
                display: false,
                // text: selectedTab === "minutes" ? "Time" : "Date",
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: false,
                // text: "Price (KRW)",
              },
              grid: {
                display: false,
              },
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
