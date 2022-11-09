/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React from "react";
import { Tooltip, Link } from "carbon-components-react";
import { red60, green50, gray30 } from "@carbon/colors";
import { Warning16 } from "@carbon/icons-react";
import S from './StatusChart.styles';

const StatusChart = ({ total, success, error, batchFailureMessage, width = 280, height = 50, onClickHandler }) => {
	const display_error_percent = (error / total).toFixed(2) * 100;
	const display_success_percent = (success / total).toFixed(2) * 100;
	const display_total_percent = (1 - ((success + error) / total)).toFixed(2) * 100;

	return (
		<S.Container height={height} width={width}>
			<S.Stats>
				<span>Processed:{success}</span>
				{(error > 0) ? <Link tabIndex={0} onKeyPress={onClickHandler} onClick={onClickHandler}>Errors:{error}</Link> : <span></span>}
				<span>Total: {total}</span>

				{batchFailureMessage &&
					<Tooltip tabIndex={0} showIcon={true} renderIcon={Warning16} align="end" direction="left" iconDescription="Processing Exception">
						<p>{batchFailureMessage}</p>
					</Tooltip>
				}
			</S.Stats>

			<div>
				<S.Chart className="graph" height="20px">
					<S.Bar className="bar" color={gray30} percentage={display_total_percent}></S.Bar>
					<S.Bar className="bar" color={green50} percentage={display_success_percent}></S.Bar>
					<S.Bar className="bar" color={red60} percentage={display_error_percent}></S.Bar>
				</S.Chart>
			</div>
		</S.Container>
	);
};

export default StatusChart;
