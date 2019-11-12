import React from 'react';
import { Router, Route } from 'react-router-dom';

import StreamCreate from './streams/streamCreate';
import StreamDelete from './streams/streamDelete';
import StreamEdit from './streams/streamEdit';
import StreamList from './streams/streamList';
import StreamShow from './streams/streamShow';
import createBrowserHistory from '../history';

import Header from './header';

const App = () => {
	return(
		<div className="ui container">
			<Router history={createBrowserHistory}>
				<div>
					<Header />
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" exact component={StreamCreate} />
					<Route path="/streams/edit/:id" exact component={StreamEdit} />
					<Route path="/streams/delete/:id" exact component={StreamDelete} />
					<Route path="/streams/show" exact component={StreamShow} />					
				</div>
			</Router>
		</div>
	) 
}

export default App;
