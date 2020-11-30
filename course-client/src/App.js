import './App.css';
import React from 'react';
import { Entry } from './components/entry';
import Course from './components/course';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loggedIn: false };
	}

  render() {
    return (
			<div className='App'>
				{!this.state.loggedIn
						? <Entry onLoginSuccess={res => this.setState({ loggedIn: true })} />
						: <Course />
				}
			</div>
    );
  }
}

export default App;
