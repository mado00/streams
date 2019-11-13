import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

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
					{/*  switch is going to look at all these different routes and it's only going to show one of these given routes for any path that we go to. */}
					<Switch>
						<Route path="/" exact component={StreamList} />
						<Route path="/streams/new" exact component={StreamCreate} />
						<Route path="/streams/edit/:id" exact component={StreamEdit} />
						<Route path="/streams/delete/:id" exact component={StreamDelete} />
						<Route path="/streams/:id" exact component={StreamShow} />	
					</Switch>	
				</div>
			</Router>
		</div>
	) 
}

export default App;
