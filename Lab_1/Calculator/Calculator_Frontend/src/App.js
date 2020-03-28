import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      toCalculate: ''
    }

    this.toCalculateChangeHandler = this.toCalculateChangeHandler.bind(this);
    this.onButtonChangeHandler = this.onButtonChangeHandler.bind(this);
    this.onClearChangeHandler = this.onClearChangeHandler.bind(this);
  }

    toCalculateChangeHandler = (e) => {
      this.setState({
        toCalculate: e.target.value
      })
    }

    onClearChangeHandler = (e) => {
      this.setState({
        toCalculate: ''
      })
    }

    onButtonChangeHandler = (params, e) => {
      this.setState({
        toCalculate: this.state.toCalculate + params
      })
    }
  

  onResult = (e) => {
    
      var headers = new Headers();
      e.preventDefault();
      const data = {
      toCalculate: this.state.toCalculate
}
  
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/calculate',data)
        .then(response => {
            console.log("Status Code : "+response.status);
            console.log("Data: "+response.data);
            this.setState(
              {
                toCalculate : response.data
              }
            );
        });
  }

  render(){
    return(
      <div className="App">
        <div class="container">
        <table>
          <tr>
            <td ><input class="result" type="text" value={this.state.toCalculate}></input></td>
          </tr>
          <tr>
            <td colSpan="1"><button onClick={this.onClearChangeHandler.bind(this)} name="clear" value="AC">AC</button></td>
            <td colSpan="1"><button onClick={this.onButtonChangeHandler.bind(this, '%')} name="modulus" value="%">%</button></td>
            <td colSpan="1"><button onClick={this.onButtonChangeHandler.bind(this, '/')} name="divide" value="/">/</button></td>
          </tr>
          <tr>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '7')} name="seven" value="7">7</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '8')} name="eight" value="8">8</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '9')} name="nine" value="9">9</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, 'X')} name="multiply" value="X">X</button></td>
          </tr>
          <tr>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '4')} name="four" value="4">4</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '5')} name="five" value="5">5</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '6')} name="six" value="6">6</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '-')} name="minus" value="-">-</button></td>
          </tr>
          <tr>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '1')} name="one" value="1">1</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '2')} name="two" value="2">2</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '3')} name="three" value="3">3</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '+')} name="plus" value="+">+</button></td>
          </tr>
          <tr>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '0')} name="zero" value="0">0</button></td>
            <td><button onClick={this.onButtonChangeHandler.bind(this, '.')} name="period" value=".">%</button></td>
            <td><button onClick={this.onResult.bind(this)} name="equals" value="=">=</button></td>
          </tr>
          
        </table>
        </div>
      </div>
    );
}
}

export default App;
