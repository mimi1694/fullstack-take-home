import '../App.css';
import React from 'react';
import { createUser } from '../api/user';

export class Entry extends React.Component {
	constructor(props) {
    super(props);
    this.state = { name: '', email: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
		this.login = this.login.bind(this);
  }

  handleNameChange(event) {
		this.setState({name: event.target.value});
	}
	
	handleEmailChange(event) {
		this.setState({email: event.target.value});
  }

  login(event) {
		if (this.state.name.length && this.state.email.length) {
			createUser(this.state.name, this.state.email)
        .then(res => {
          this.props.onLoginSuccess(res);
        });
		} else {
			console.error("Fields must not be empty.");
		}
		event.preventDefault();
	}

  render() {
    return (
			<div className='App'>
				<h1>Course Sign Up</h1>
				<h2>Enter your name and email address...</h2>

				<form onSubmit={this.login}>
					<label>
						Name:
						<input type='text' value={this.state.name} onChange={this.handleNameChange} />
					</label>
					<label>
						Email:
						<input type='text' value={this.state.email} onChange={this.handleEmailChange} />
					</label>
					<button type='submit' value='Submit'>Log in</button>
				</form>
			</div>
    );
  }
}