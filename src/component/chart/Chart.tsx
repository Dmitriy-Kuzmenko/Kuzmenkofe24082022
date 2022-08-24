import React, { useEffect, useRef, useState } from 'react';
import './chart.css';
import { ChartLine } from '../chartLine/ChartLine';

export interface IChart {
	name: string;
	time: number;
}
const delay = (53 * 1000) / 2;
function getRandom(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.random() * (max - min + 1) + min;
}
export const Chart = () => {
	const [chartValue, setChartValue] = useState<IChart[]>([
		{ name: 'Landing Page', time: 7.4 },
		{ name: 'Check Out', time: 0.2 },
		{ name: 'Configuration', time: 7 },
		{ name: 'Deal', time: 3.2 },
	]);
	const [percent, setPercent] = useState<number[]>([]);
	const [position, setPosition] = useState<number[]>([]);

	const buttonRef = useRef(null);

	function defineCharts() {
		const newCharts = chartValue.map((v: IChart) => {
			v.time = +getRandom(0.1, 20).toFixed(1);
			return v;
		});
		const fullTime = +chartValue
			.reduce((prev: number, cur: IChart) => {
				return (prev += cur.time);
			}, 0)
			.toFixed(1);

		const perc = chartValue.map((v: IChart) => {
			return +(v.time / fullTime).toFixed(3) * 100;
		});
		const positions: number[] = [];
		perc.reduce((sum: number, cur: number) => {
			positions.push(sum);
			return +(sum += cur).toFixed(3);
		}, 0);
		setChartValue(newCharts);
		setPercent(perc);
		setPosition(positions);
	}
	useEffect(() => {
		defineCharts();
	}, []);

	useEffect(() => {
		let timer1 = setInterval(() => defineCharts(), delay);
		return () => {
			clearInterval(timer1);
		};
	});

	const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		defineCharts();
	};

	return (
		<div className='chart'>
			<div className='title'>{'SPENT TIME (SECONDS)'}</div>
			<div className='chart__block'>
				{chartValue.map((v: IChart, ind: number) => (
					<ChartLine
						chartValue={v}
						key={v.name}
						percent={percent[ind]}
						position={position[ind]}
					/>
				))}

				<button
					className='chart__button'
					onClick={onClickHandler}
					ref={buttonRef}
					data-testid="update"
				>
					Change values
				</button>
			</div>
		</div>
	);
};
