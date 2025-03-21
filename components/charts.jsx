import React from "react";
import ReactApexChart from "react-apexcharts";

export default function DexCandlestickChart({ seriesData, symbol }) {
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "transparent",
      zoom: {
        autoScaleYaxis: true
      }
    },
    title: {
      text:`Tokens: ${symbol}`,
      align: "left",
    },
    tooltip: {
      shared: true,
      custom: [function({seriesIndex, dataPointIndex, w}) {
        return w.globals.series[seriesIndex][dataPointIndex]
      }, function({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
        return (
          '<div class="apexcharts-tooltip-candlestick">' +
          '<div>Open: <span class="value">' +
          o +
          '</span></div>' +
          '<div>High: <span class="value">' +
          h +
          '</span></div>' +
          '<div>Low: <span class="value">' +
          l +
          '</span></div>' +
          '<div>Close: <span class="value">' +
          c +
          '</span></div>' +
          '</div>'
        )
      }]
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <ReactApexChart options={options} series={[{ data: seriesData }]} type="candlestick" height={430} width={1000} />
  );
}
