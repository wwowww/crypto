import React, { useState } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
} from "react-financial-charts";
import { useChartData } from "@/hooks/useChartData";
import { useParams } from "next/navigation";

const CandleCharts = () => {
  const [selectedTab, setSelectedTab] = useState<string>("minutes");
  const [count, setCount] = useState<number>(30);
  const marketId = useParams();

  console.log(marketId.id?.toString().toUpperCase(), "marketId")

  const { chartData, isLoading, isError } = useChartData({
    count,
    period: selectedTab,
    market: marketId.id?.toString().toUpperCase(),
  });

  const transformData = (rawData: any[]) => {
    return rawData.map((item) => ({
      date: new Date(item.candle_date_time_utc),
      open: item.opening_price,
      high: item.high_price,
      low: item.low_price,
      close: item.trade_price,
      volume: item.candle_acc_trade_volume,
    }));
  };
  
  const transformedData = transformData(chartData);

  const handleTabClick = (period: string) => {
    setSelectedTab(period);
    if (period === "minutes") setCount(30);
    else if (period === "days") setCount(30);
    else if (period === "weeks") setCount(12);
    else if (period === "months") setCount(6);
  };


  console.log(chartData, "chartData")

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !Array.isArray(chartData) || chartData.length === 0)
    return <div>차트를 불러올 수 없습니다.</div>;

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: { ema12: any; }, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: { ema12: any; }) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: { ema26: any; }, c: any) => {
      d.ema26 = c;
    })
    .accessor((d: { ema26: any; }) => d.ema26);

  const elder = elderRay();
  const calculatedData = elder(ema26(ema12(transformedData)));

  if (!Array.isArray(calculatedData)) {
    console.error("calculatedData is not an array:", calculatedData);
    return <div>계산된 데이터를 불러올 수 없습니다.</div>;
  }

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => new Date(d.date)
  );

  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(calculatedData);
  const xExtents = [
    xAccessor(data[Math.max(0, data.length - 100)]),
    xAccessor(data[data.length - 1]),
  ];

  const height = 700;
  const width = 900;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const elderRayOrigin = (_: any, h: number) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: any, h: number) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;

  const pricesDisplayFormat = format(".2f");
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const volumeColor = (data: { close: number; open: number; }) =>
    data.close > data.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)";
  const openCloseColor = (data: { close: number; open: number; }) => (data.close > data.open ? "#26a69a" : "#ef5350");

  return (
    <ChartCanvas
      height={height}
      ratio={3}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="Financial Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      {/* 거래량 차트 */}
      <Chart
        id={1}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={(d) => d.volume}
      >
        <BarSeries fillStyle={volumeColor} yAccessor={(d) => d.volume} />
      </Chart>

      {/* 캔들스틱 차트 */}
      <Chart id={2} height={chartHeight} yExtents={(d) => [d.high, d.low]}>
        <XAxis showGridLines showTickLabel={false} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
        <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate
          yAccessor={ema26.accessor()}
          fillStyle={ema26.stroke()}
        />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
        <CurrentCoordinate
          yAccessor={ema12.accessor()}
          fillStyle={ema12.stroke()}
        />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={(d) => d.close}
        />
        <MovingAverageTooltip
          origin={[8, 24]}
          options={[
            {
              yAccessor: ema26.accessor(),
              type: "EMA",
              stroke: ema26.stroke(),
              windowSize: ema26.options().windowSize,
            },
            {
              yAccessor: ema12.accessor(),
              type: "EMA",
              stroke: ema12.stroke(),
              windowSize: ema12.options().windowSize,
            },
          ]}
        />
        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
      </Chart>

      {/* Elder Ray 차트 */}
      <Chart
        id={3}
        height={elderRayHeight}
        yExtents={[0, elder.accessor()]}
        origin={elderRayOrigin}
        padding={{ top: 8, bottom: 8 }}
      >
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />
        <ElderRaySeries yAccessor={elder.accessor()} />
        <SingleValueTooltip
          yAccessor={elder.accessor()}
          yLabel="Elder Ray"
          yDisplayFormat={(d) =>
            `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
              d.bearPower
            )}`
          }
          origin={[8, 16]}
        />
      </Chart>

      <CrossHairCursor />
    </ChartCanvas>
  );
};

export default CandleCharts;