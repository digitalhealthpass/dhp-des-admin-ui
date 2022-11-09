/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';
import { spacing07 } from '@carbon/layout';
import { white } from '@carbon/colors';

const MainPage = styled.main`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin: ${spacing07};
  overflow: hidden;

  .fileUploader {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row-reverse;

    .bx--file-container {
      margin-top: 0rem;
      margin-left: ${spacing07};
    }
  }

  .dateRange {
    align-self: center;
    font-weight: 700;
    font-size: 14px;
    margin-left: 1rem;
    margin-right: 0.5rem;
    color: #565656;
  }

  .lastRefresh {
    align-self: center;
    font-weight: 300;
    font-size: 14px;
    min-width: 20rem;
    margin-left: 2rem;
    color: #565656;
  }

  .bx--tabs {
    display: flex;
    flex: 0 0 auto;
  }

  .bx--tab-content {
		overflow: unset;

		&:not([hidden]) {
   	 display: flex;
   	 flex-direction: column;
   	 flex: 1 1 auto;

    .uploadResults {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
			.bx--pagination {
				overflow: unset;
			}
      .bx--data-table-container {
        display: flex;
        flex-direction: column;
        width: 100%;
				.bx--data-table-content {
					overflow: visible;
				}

        .bx--toolbar-content {
          .bx--form-item{
            justify-content: center;
          }
        }
			}

      .bx--data-table-header {
        padding: 0px;
    	}
    }

      .bx--skeleton {
        .bx--data-table-header__title {
          height: 2rem;
          width: 14rem;
        }
        .bx--data-table-header__description {
          display: none;
        }
        .bx--btn--sm {
          width: 50px;
        }
      }
    }
  }

  .csvDownloadButton {
    padding: 0px;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-top: ${spacing07};
`;

const PageHeader = styled.div`
  padding-bottom: 1rem;
  .page_title {
    font-size: 1.75rem;
    line-height: 1.25;
    padding-bottom: 0.31rem;
    color: #161616;
    font-weight: 400;
  }

  .page_description {
    font-weight: 400;
    font-size: 0.875rem;
    color: #6f6f6f;
  }
`;

const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: .75rem 0rem; */
`;

const S = {
	MainPage,
	ErrorMessage,
	PageHeader,
	PageActions
};

export default S;
