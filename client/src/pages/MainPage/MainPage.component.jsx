/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import {
	Tabs,
	Tab,
	FileUploader,
	InlineNotification,
	NotificationActionButton
} from 'carbon-components-react';

import { useAuth } from '../../hooks/useAuth';
import UploadResultTable from '../../components/UploadResultTable/UploadResultTable';
import OrgSelect from '../../components/OrgSelect/OrgSelect';

import S from './MainPage.styles';
import { uploadRegistration, uploadResult, getStatus } from '../../services/dataService'

const maxFileSize = 1024 * 1024 * 5; // 5MB

const MainPage = () => {
	const { t } = useTranslation();
	const TAB_LABEL_REGISTRATION = t('nls.MAIN_PAGE.registration');
	const TAB_LABEL_RESULTS = t('nls.MAIN_PAGE.results');
	const BTN_UPLOAD_TEXT = t('nls.MAIN_PAGE.btnUploadText');
	const PAGE_TITLE = t('nls.MAIN_PAGE.page_title');
	const PAGE_DESCRIPTION = t('nls.MAIN_PAGE.page_description');
	const UPLOAD_FILE_INVALID = t('nls.MAIN_PAGE.file_invalid');

	const REGADMIN = 'regadmin';

	const [loading, setLoading] = useState(false);
	const [uploadStatus, setUploadStatus] = useState('uploading'); // responsibile for the icon which shows up next to the file name (uploading, error, etc)
	const [errorMessage, setErrorMessage] = useState(undefined); // holds any error message returned from the API call
	const [rows, setRows] = useState([]); // data table rows
	const [tableRefresh, setTableRefresh] = useState(Date.now());
	const { user, setUser } = useAuth(); // get the user info from the context
	const { orgs, roles, currentOrg, currentRole } = user;

	const initialStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
	const initialEndDate = moment().format('YYYY-MM-DD');
	const [dateRange, setDateRange] = useState({
		startDate: initialStartDate,
		endDate: initialEndDate,
	});
	const [action, setAction] = useState();
	const history = useHistory();

	const errorStruct = useRef({});

	const refreshCallback = useCallback(() => {
		setTableRefresh(Date.now());
	}, []);

	const downloadCallback = useCallback((batchId) => {
		const { fileName, errorRows } = errorStruct.current[batchId];

		const blob = new Blob([errorRows], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.href = url;
		link.download = fileName || 'download';
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
	}, []);

	// triggered whenver the user selects a local file via the FileUploader
	const uploadCallback = useCallback(
		(e) => {
			e.preventDefault();

			// given a file, return true if type and size are valid
			const isFileValid = (file) => {
				const isValidSize = file.size <= maxFileSize;

				if (!isValidSize) {
					setErrorMessage('File size exceeded');
				}

				return isValidSize;
			};

			// given an file and org, upload the file and return a promise
			const uploadFile = async ({ file }) => {
				const sendSMS = (sessionStorage.getItem('disableSMS') === 'true') ? false : true;

				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
						'x-hpass-send-sms': sendSMS
					},
					withCredentials: true,
				};

				const form = new FormData();
				form.append('organization', currentOrg);
				form.append('file', file);

				if (currentRole === REGADMIN) {
					return uploadRegistration(form, config)
				} else {
					return uploadResult(form, config);
				}
			};

			const file = e?.target?.files?.item(0);
			const reader = new FileReader();
			reader.onload = async (evt) => {
				// if the file is valid, then attempt to upload it.
				if (file && isFileValid(file)) {
					try {
						const response = await uploadFile({ file })
						const row = response.data;
						const timestamp = moment(row.submittedTimestamp).format('LLL');
						const batchFailureMessage = (row?.batchFailureMessages[0]) ? t('nls.MAIN_PAGE.batchAborted', { processingIndex: row.successCountTotal + row.failureCountTotal }) : undefined;
						const summary = { total: row.rowCount, success: row.successCountTotal, error: row.failureCountTotal, batchFailureMessage }
						const newRow = { ...row, summary: summary, timestamp, id: row.batchID };

						setRows([newRow, ...rows])
						setUploadStatus('complete');
						setErrorMessage(undefined);
					} catch (error) {
						setUploadStatus('edit');
						if (error.response?.status === 403) {
							history.push('/logout');
						} else if (error.response?.status === 400) {
							const { message, payload } = error.response.data;
							const errorCSV = createErrorCSV(payload);

							errorStruct.current[-1] = {
								fileName: "error.csv",
								errorRows: errorCSV,
							};

							if (errorCSV) {
								setAction(<NotificationActionButton onClick={() => { downloadCallback(-1); setAction(); setErrorMessage(); }}>Download</NotificationActionButton>)
							}
							setErrorMessage(message);
						} else {
							setErrorMessage(error.message);
						}
					}
				} else {
					setUploadStatus('edit');

					let errorMessage = UPLOAD_FILE_INVALID;

					setErrorMessage(errorMessage);
				}
			};
			reader.readAsText(file);
		},
		[currentOrg, currentRole, rows, setRows, UPLOAD_FILE_INVALID, t, downloadCallback, history]
	);

	const dateChangedCallback = useCallback((dates) => {
		const startDate = moment(dates.startDate).format('YYYY-MM-DD');
		const endDate = moment(dates.endDate).format('YYYY-MM-DD');
		setDateRange({ startDate, endDate })
	}, [])

	const createErrorCSV = (row) => {
		const failedRow = row?.failedRows;

		if (failedRow && failedRow.length > 0) {
			const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
			const header = Object.keys(failedRow[0]);
			const errorCSV = [
				header.join(','), // header row first
				...failedRow.map((row) =>
					header
						.map((fieldName) => {
							let value = '';
							switch (fieldName) {
								case 'failureReasons':
									value = Array.isArray(row[fieldName]) ? row[fieldName].join('; ') : row[fieldName];
									break;
								default:
									value = JSON.stringify(row[fieldName], replacer);
									break;
							}
							return value;
						})
						.join(',')
				),
			].join('\r\n');

			console.log(errorCSV);
			return errorCSV
		}
	}

	// execute the status query whenever the user's org, role changes or manual refresh is triggered.
	useEffect(() => {
		const processData = (rows) => {
			const tableData = [];

			// create CSV data as a string from the failedRows
			rows.payload.forEach((row) => {
				const fileName = row?.fileName;
				const errorCSV = createErrorCSV(row);

				// save the errors by batchID (outside of the table model)
				errorStruct.current[row.batchID] = {
					fileName,
					errorRows: errorCSV,
				};
			});

			rows.payload.reduce((acc, row) => {
				const timestamp = moment(row.submittedTimestamp).format('LLL');

				const batchFailureMessage = (row?.batchFailureMessages && row?.batchFailureMessages[0]) ? t('nls.MAIN_PAGE.batchAborted', { processingIndex: row.successCountTotal + row.failureCountTotal }) : undefined;

				const summary = { total: row.rowCount, success: row.successCountTotal, error: row.failureCountTotal, batchFailureMessage }
				const tableRow = { id: row.batchID, batchID: row.batchID, ...row, timestamp, summary: summary };
				acc.push(tableRow);

				return acc;
			}, tableData);

			return tableData;
		};

		const executeQuery = async () => {
			try {
				setRows(undefined);
				setLoading(true);
				setErrorMessage(undefined);

				const { startDate, endDate } = dateRange

				// need to send the start and end datetime in Zulu
				const zuluStartDate = new Date(`${startDate}T00:00:00`).toISOString();
				const zuluEndDate = new Date(`${endDate}T23:59:59`).toISOString();

				const queryParam = (startDate && endDate) ? `?startDate=${zuluStartDate}&endDate=${zuluEndDate}` : '';

				const response = await getStatus(currentOrg, currentRole, queryParam)

				const rows = processData(response.data);

				rows.sort((a, b) => new Date(b.submittedTimestamp) - new Date(a.submittedTimestamp));

				setRows(rows);
				setLoading(false);
			} catch (error) {
				if (error.response?.status === 403) {
					history.push('/logout');
				} else {
					console.error(error);
					setRows([]);
					setErrorMessage('Error retrieving data');
					setLoading(false);
				}
			}
		}

		if (currentOrg && currentRole) {
			executeQuery()
		}
	}, [currentRole, currentOrg, tableRefresh, dateRange, t, history]);

	const orgChanged = useCallback((value) => {
		setUser({ ...user, currentOrg: value })
	}, [user, setUser])

	// const roleChanged = useCallback((value) => {
	//   debugger;
	//   setUser({ ...user, currentRole: value })
	// }, [user, setUser])

	return (
		<S.MainPage>
			{/* Display the error message as an error InlineNotification */}
			{errorMessage && (
				<InlineNotification
					kind="error"
					title="Failure"
					subtitle={errorMessage}
					actions={action}
					onClick={() => { setAction(); setErrorMessage() }}
				></InlineNotification>
			)}

			<S.PageHeader>
				<div className="page_title">{PAGE_TITLE}</div>
				<div className="page_description">{PAGE_DESCRIPTION}</div>
			</S.PageHeader>

			<S.PageActions>
				{(orgs.length > 1) ? (
					<div className="orgSelectWrapper">
						<OrgSelect selected={currentOrg} orgNames={orgs} onChangeCallback={orgChanged}></OrgSelect>
					</div>
				) : (<div></div>)}

				{user && currentOrg && (
					<FileUploader
						className="fileUploader"
						accept={['.csv']}
						buttonKind="tertiary"
						buttonLabel={BTN_UPLOAD_TEXT}
						filenameStatus={uploadStatus}
						iconDescription="Clear file"
						onChange={(e) => uploadCallback(e)}
						onClick={() => {
							setErrorMessage(undefined);
						}}
					/>)}
			</S.PageActions>

			{user && currentOrg && (
				<Tabs selected={roles.indexOf(currentRole)}>
					{roles.map((role, index) =>
						<Tab
							disabled={loading}
							id={`tab_${index}`}
							label={(role === REGADMIN) ? TAB_LABEL_REGISTRATION : TAB_LABEL_RESULTS}
							onClick={() => setUser({ ...user, currentRole: role })}
							onSelect={() => setUser({ ...user, currentRole: role })}
						>

							<UploadResultTable
								tabName={(role === REGADMIN) ? 'userRegistration' : 'testResults'}
								rows={rows}
								refreshTime={tableRefresh}
								startDate={dateRange.startDate}
								endDate={dateRange.endDate}
								onRefresh={refreshCallback}
								onDownloadClicked={downloadCallback}
								onDateChanged={dateChangedCallback}
							></UploadResultTable>
						</Tab>
					)}
				</Tabs>
			)}

		</S.MainPage>
	);
};

export default MainPage;
