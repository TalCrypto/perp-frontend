/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, forwardRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { formatDateTime } from '@/utils/date';
import { wsSelectedTimeIndex } from '@/stores/WalletState';
import { useStore as useNanostore } from '@nanostores/react';

function ChartDisplay(props: any) {
  const { lineChartData } = props;
  const chartContainerRef: any = useRef();
  const chartRef = useRef<IChartApi | null>(null);
  const selectedTimeIndex = useNanostore(wsSelectedTimeIndex);

  const colors = {
    // backgroundColor: 'rgb(23, 24, 51)',
    backgroundColor: 'transparent',
    lineColor: 'rgb(165, 92, 171)',
    textColor: 'rgba(168, 203, 255, 0.75)',
    areaTopColor: 'rgba(185, 15, 127, 0.45)',
    areaBottomColor: 'rgba(185, 15, 127, 0.05)'
  };

  useEffect(() => {
    const newChartData: any = [];
    if (lineChartData) {
      lineChartData.map((item: any) => newChartData.push({ time: item.time, value: Number(item.value) }));
    }
    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(46, 48, 100, 0.5)' }
      },
      width: chartContainerRef.current.clientWidth,
      height: 220,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        lockVisibleTimeRangeOnResize: false,
        tickMarkFormatter: (time: any /* , tickMarkType, locale */) => {
          const timeFormat = selectedTimeIndex === 0 ? 'HH:mm' : 'DD/MM HH:mm';
          return formatDateTime(time, timeFormat);
        }
      },
      localization: {
        timeFormatter: (time: any) => {
          const timeFormat = 'DD/MM HH:mm';
          return formatDateTime(time, timeFormat);
        }
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
        horzTouchDrag: false,
        vertTouchDrag: false
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false
      }
    });
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.remove();

        chartRef.current = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: colors.backgroundColor },
            textColor: colors.textColor
          },
          grid: {
            vertLines: { visible: false },
            horzLines: { color: 'rgba(46, 48, 100, 0.5)' }
          },
          width: chartContainerRef.current.clientWidth,
          // height: 450,
          height: 220,
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            lockVisibleTimeRangeOnResize: false,
            tickMarkFormatter: (time: any /* , tickMarkType, locale */) => {
              const timeFormat = selectedTimeIndex === 0 ? 'HH:mm' : 'DD/MM HH:mm';
              return formatDateTime(time, timeFormat);
            }
          },
          localization: {
            timeFormatter: (time: any) => {
              const timeFormat = 'DD/MM HH:mm';
              return formatDateTime(time, timeFormat);
            }
          },
          handleScroll: {
            mouseWheel: false,
            pressedMouseMove: false,
            horzTouchDrag: false,
            vertTouchDrag: false
          },
          handleScale: {
            axisPressedMouseMove: false,
            mouseWheel: false,
            pinch: false
          }
        });

        const newSeries = chartRef.current.addAreaSeries({
          lineColor: colors.lineColor,
          topColor: colors.areaTopColor,
          bottomColor: colors.areaBottomColor,
          lineWidth: 1
        });
        newSeries.setData(newChartData);
        chartRef.current.timeScale().fitContent();
      }
      // chart.applyOptions({
      //   width: chartContainerRef.current.clientWidth,
      //   rightPriceScale: {
      //     scaleMargins: {
      //       top: 0.1,
      //       bottom: 0.1
      //     }
      //   }
      // });
    };
    const newSeries = chartRef.current.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
      lineWidth: 1
    });
    newSeries.setData(newChartData);
    chartRef.current.timeScale().fitContent();
    // setMyChart(chartRef.current);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [lineChartData]);

  return (
    <div className="flex justify-center bg-darkBlue py-6">
      <div className="w-full" ref={chartContainerRef} />
    </div>
  );
}

export default forwardRef(ChartDisplay);
