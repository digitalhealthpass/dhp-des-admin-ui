import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
	changeRoleByDiv,
	changeRoleBySpan,
	listenDatePickerRangeEnd
} from '../../utils/changeAtrribute';
import {
	DataTable,
	DataTableSkeleton,
	Pagination,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
	Button,
	DatePicker,
	DatePickerInput,
} from 'carbon-components-react';
import StatusChart from '../StatusChart/StatusChart';
import S from './UploadResultTable.styles';

const UploadResultTable = ({ rows, title, tabName, startDate, endDate, onRefresh, onDownloadClicked, onDateChanged }) => {
	const [start, setStart] = useState(startDate)
	const [end, setEnd] = useState(endDate)

	const { t } = useTranslation();
	const DATE_RANGE = t('nls.UPLOAD_RESULT_TABLE.dateRange');

	const onDateChange = (event) => {
		if (event.length === 2) {
			setStart(moment(event[0]).format('YYYY-MM-DD'));
			setEnd(moment(event[1]).format('YYYY-MM-DD'));
		}
	};

	useEffect(() => {
		onDateChanged({ startDate: start, endDate: end });
	}, [start, end, onDateChanged])

	useEffect(() => {
		setTimeout(() => {
			changeRoleByDiv();
			changeRoleBySpan();
			listenDatePickerRangeEnd();
		}, 500)
	})

	const updateTabindex = () => {
		const calendar = document.getElementsByClassName("flatpickr-calendar");
		if (tabName === 'userRegistration') {
			calendar[0].focus();
		} else {
			calendar[1].focus();
		}
	}

	const [{ startIndex, endIndex }, setIndices] = useState({
		startIndex: 0,
		endIndex: 10,
	});

	const headers = [
		{
			header: 'Submitted',
			key: 'timestamp',
		},
		{
			header: 'Batch ID',
			key: 'batchID',
		},
		{
			header: 'File name',
			key: 'fileName',
		},
		{
			header: 'Processing summary',
			key: 'summary',
		},
	];

	return (
		<section className="uploadResults">
			{rows && (
				<>
					<S.DateRange>
						<span className="dateRange">{DATE_RANGE}</span>
						<DatePicker
							light
							dateFormat="Y-m-d"
							datePickerType="range"
							maxDate={moment().format('YYYY-MM-DD')}
							minDate={moment().subtract(30, 'days').format('YYYY-MM-DD')}
							onChange={onDateChange}
						>
							<DatePickerInput
								aria-label="Start date"
								value={start}
								id={`${tabName}_date-picker-range-start`}
								labelText=""
								type="text"
								onFocus={updateTabindex}
							/>
							<DatePickerInput
								aria-label="End date"
								value={end}
								id={`${tabName}_date-picker-range-end`}
								labelText=""
								type="text"
								onFocus={updateTabindex}
							/>
						</DatePicker>
						<Button kind="ghost" onClick={onRefresh}><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Refresh table" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" className="bx--btn__icon"><path d="M12 10H6.78A11 11 0 0127 16h2A13 13 0 006 7.68V4H4v8h8zM20 22h5.22A11 11 0 015 16H3a13 13 0 0023 8.32V28h2V20H20z"></path></svg></Button>
					</S.DateRange>

					<DataTable rows={rows} headers={headers} useZebraStyles>
						{({
							rows,
							headers,
							getHeaderProps,
							getTableProps,
							getTableContainerProps,
						}) => (
							<TableContainer
								// style={{ height: 'inherit' }}
								title={title}
								{...getTableContainerProps()}
							>
								<Table {...getTableProps()}>
									<TableHead>
										<TableRow>
											{headers.map((header) => (
												<TableHeader {...getHeaderProps({ header })}>
													{header.header}
												</TableHeader>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.slice(startIndex, endIndex).map((row) =>
											<TableRow key={row.batchID}>
												{row.cells.map((cell) => {
													let cellValue = cell.value;
													if (cell.id === `${row.id}:summary`) {
														cellValue = (<StatusChart {...cell.value} onClickHandler={() => onDownloadClicked(row.id)}></StatusChart>)
													}
													return (
														<TableCell key={cell.id}>{cellValue}</TableCell>
													);
												})}
											</TableRow>
										)}
									</TableBody>
								</Table>

								<Pagination
									backwardText="Previous page"
									forwardText="Next page"
									itemsPerPageText="Items per page:"
									page={1}
									pageNumberText="Page Number"
									pageSize={10}
									pageSizes={[10, 20, 30, 40, 50]}
									totalItems={rows.length}
									onChange={({ page, pageSize }) => {
										setIndices({
											startIndex: page * pageSize - pageSize,
											endIndex: page * pageSize,
										});
									}}
								/>
							</TableContainer>
						)}
					</DataTable>
				</>
			)}

			{!rows && <DataTableSkeleton zebra></DataTableSkeleton>}
		</section>
	);
};

export default UploadResultTable;
