import React from "react";
import './chartLine.css'
import {IChart} from '../chart/Chart'

export interface ChartLineProps {
    chartValue: IChart;
    percent: number;
    position: number;
}

export const ChartLine = ({chartValue,percent,position}: ChartLineProps) => {
    return <div className="chart__line">
        <div className="chart__title"> {chartValue.name}</div>
        <div className="chartLine__block" > 
        <div className="chart__position" style={{'width':`${percent}%`, 'left': `${position}%`}}>
            {chartValue.time}
        </div>
        </div>
    </div>
}

