import React, {useEffect, useRef} from "react";
import {createChart} from "lightweight-charts";
import {sma} from "moving-averages"

const Chart = (props) => {
    const chartContainerRef = useRef();

    useEffect (
        () => {

            const chartProperties = {
                layout: {
                    backgroundColor: '#2B2B43',
                    lineColor: '#2B2B43',
                    textColor: '#D9D9D9',
                },
                watermark: {
                    color: 'rgba(93, 218, 204, 0.8)',
                    visible: true,
                    text: 'NFTBull Watermark',
                    fontSize: 24,
                    horzAlign: 'left',
                    vertAlign: 'bottom',
                },
                crosshair: {
                    color: '#758696',
                    mode: 0,
                },
                grid: {
                    vertLines: {
                        color: '#2B2B43',
                    },
                    horzLines: {
                        color: '#363C4E',
                    },
                },
                autoWidth: true,
                height:500,
                timeScale: {
                    rightOffset: 12,
                    barSpacing: 3,
                    fixLeftEdge: true,
                    lockVisibleTimeRangeOnResize: true,
                    rightBarStaysOnScroll: true,
                    borderVisible: false,
                    borderColor: "#fff000",
                    visible: true,
                    timeVisible: true,
                    secondsVisible: false
                },
                handleScale: {
                    axisPressedMouseMove: true,
                    mouseWheel: true,
                    pinch: true,
                },
            }
            const candleData = props.data.map(d => {
                return {time:d["time"]/1000,open:d["open"],high:d["high"],low:d["low"],close:d["close"]}
            });
            const smaData = candleData.map((d) => {return {time:d["time"], value:d["close"]}} )
            const chart = createChart(chartContainerRef.current,chartProperties);
            chart.timeScale().fitContent();
            const maSeries = chart.addLineSeries({color: "red",
                title: "SMA"})
            const candleSeries = chart.addCandlestickSeries();
            maSeries.setData(sma(
                smaData.map((x) => x.value),
                5
            ).map((value, index) => ({ value, time: candleData[index].time })))
            candleSeries.setData(candleData)



        }
    );

    return (
        <div className="container">
            <h2 className="header">NFTBull Chart</h2>
            <div className="chart" ref={chartContainerRef}/>
        </div>

    )
}
export default Chart;