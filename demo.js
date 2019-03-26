import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demo from './Demo/demo';
import ParentComponent from './ParentComponent/ParentComponent'
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import FormComponent from './FormComponent/FormComponent';
import { withRouter } from 'react-router';
import { HashLink as Link } from 'react-router-hash-link';
import withHeader from './withHeader/withHeader';
import axios from 'axios';

class App extends Component {

  state = {
    Auth: true,
    name: '',
    persons: []
  }
  debugger;
  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
  }

  componentDidMount() {
    document.title = "Demo";
    alert("componentDidMount");

    debugger;
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
    console.log("componentDidMount");
  }

  componentWillMount() {
    alert("componentWillMount");
    console.log("Will Mount Life Cycle...");
  }

  componentWillUpdate() {
    alert("componentWillUpdate");
  }

  componentDidUpdate() {
    alert("componentDidUpdate");
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
              </label>
              <button type="submit">Add</button>
            </form>
            <ul>
              {this.state.persons.map(person => <li>{person.name}</li>)}
            </ul>
          </div>
          <BrowserRouter>
            {
              this.state.Auth ? <Route path="/Demo" component={Demo}></Route>
                : <Route render={() => <div>Home</div>}></Route>
            }
            <Route path="/Form" component={ParentComponent}></Route>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default withHeader(App);
