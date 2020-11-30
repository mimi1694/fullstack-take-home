import './App.css';
import React from 'react';
import { Entry } from './components/entry';
import CourseList from './components/course-list';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loggedIn: false, userId: '' };
	}

  render() {
    return (
			<div className='App'>
				{!this.state.loggedIn
						? <Entry onLoginSuccess={res => this.setState({ loggedIn: true, userId: res.data.id })} />
						: <CourseList userId={this.state.userId} />
				}
			</div>
    );
  }
}

export default App;
