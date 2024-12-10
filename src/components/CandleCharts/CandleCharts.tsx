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
  const chartInitCount = 300;
  const marketId = useParams();
  const [selectedTab, setSelectedTab] = useState<string>("minutes");
  const [count, setCount] = useState<number>(chartInitCount);

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
    if (period === "minutes") setCount(chartInitCount);
    else if (period === "days") setCount(365);
    else if (period === "weeks") setCount(104);
    else if (period === "months") setCount(60);
  };

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
  const margin = { left: 0, right: 72, top: 0, bottom: 24 };

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const elderRayOrigin = (_: any, h: number) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: any, h: number) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;

  const formatWithCommas = (value: number) => {
    if (value == null || isNaN(value)) return "-";
  
    return value.toLocaleString("en-US", {
      minimumFractionDigits: value >= 1000 ? 0 : 2,
      maximumFractionDigits: value >= 1000 ? 0 : 2,
    });
  };

  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const volumeColor = (data: { close: number; open: number; }) =>
    data.close > data.open ? "rgba(239, 83, 80, 0.3)" : "rgba(67, 135, 249, 0.3)";
  const openCloseColor = (data: { close: number; open: number; }) => (data.close > data.open ? "#ef5350" : "#4387f9");

  return (
    <div className="flex flex-col border border-[#eee]">
      <div className="tabs border-b border-[#eee]">
        <button className={`h-[38px] text-xs pr-[11px] pl-[11px] ${selectedTab === "minutes" ? "text-[#4387f9]": "text-gray-color"}`} onClick={() => handleTabClick("minutes")}>분</button>
        <button className={`h-[38px] text-xs pr-[11px] pl-[11px] ${selectedTab === "days" ? "text-[#4387f9]": "text-gray-color"}`} onClick={() => handleTabClick("days")}>일</button>
        <button className={`h-[38px] text-xs pr-[11px] pl-[11px] ${selectedTab === "weeks" ? "text-[#4387f9]": "text-gray-color"}`} onClick={() => handleTabClick("weeks")}>주</button>
        <button className={`h-[38px] text-xs pr-[11px] pl-[11px] ${selectedTab === "months" ? "text-[#4387f9]": "text-gray-color"}`} onClick={() => handleTabClick("months")}>월</button>
      </div>
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
        <Chart
          id={1}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={(d) => d.volume}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={(d) => d.volume} />
        </Chart>

        <Chart id={2} height={chartHeight} yExtents={(d) => [d.high, d.low]}>
          <XAxis showGridLines showTickLabel={false} strokeStyle="#eee" />
          <YAxis
            showGridLines
            tickFormat={formatWithCommas}
            tickLabelFill="#707882"
            fontSize={10}
            strokeStyle="#eee"
            tickPadding={0}
            showTicks={false}
          />
          <CandlestickSeries fill={openCloseColor} wickStroke={openCloseColor} />
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
            displayFormat={formatWithCommas}
            fontSize={10}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={formatWithCommas}
            yAccessor={(d) => d.close}
            fontSize={10}
          />
          <MovingAverageTooltip
            fontSize={10}
            origin={[8, 24]}
            displayFormat={(value) => 
              value < 1000 ? value.toLocaleString() : Number(value.toFixed(0)).toLocaleString()
            }
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
          <OHLCTooltip
            origin={[8, 16]}
            displayTexts={{o: "시", h: " 고", l:" 저", c: " 종", na: ""}}
            ohlcFormat={(value) => {
              return Number(value).toLocaleString();
            }}
            changeFormat={(value) => {
              return Number(value).toLocaleString();
            }}
          />
        </Chart>
        <Chart
          id={3}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 20, bottom: 20 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#eee" fontSize={10} tickLabelFill="#707882" strokeStyle="#eee" tickPadding={0} showTicks={false} />
          <YAxis ticks={1} tickFormat={formatWithCommas} fontSize={10} tickLabelFill="#707882" strokeStyle="#eee" tickPadding={0} showTicks={false} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={formatWithCommas}
          />
          <ElderRaySeries 
            yAccessor={elder.accessor()}
            fillStyle={{
              bearPower: "#ef5350",
              bullPower: "#4387f9",
            }}
            straightLineStrokeStyle="#eee"
            straightLineStrokeDasharray="Solid"
          /> 
          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="거래량(Elder Ray)"
            valueFill="#707882"
            labelFill="#707882"
            yDisplayFormat={(d) => `매수: ${formatWithCommas(d.bullPower)}, 매도: ${formatWithCommas(d.bearPower)}`}
            origin={[8, 16]}
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
};

export default CandleCharts;