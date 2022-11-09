/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage.component';

import S from './App.styles';
import AppHeader from './components/Header/Header';

import ProvideAuth from './hooks/useAuth';

import './App.scss';
import './i18n';
import LogoutPage from './pages/LogoutPage/LogoutPage.component';

function App() {
	return (
		<Router>
			<ProvideAuth>
				<S.Header>
					<AppHeader />
				</S.Header>

				<S.MainContent>
					<Switch>
						<Route exact path="/logout" component={LogoutPage} />
						<ProtectedRoute
							path="/"
							component={MainPage}
							allowedRoles={['testadmin', 'regadmin']}
						/>
						<Route exact path="/login" component={LoginPage} />
					</Switch>
				</S.MainContent>
			</ProvideAuth>
		</Router>
	);
}

export default App;
