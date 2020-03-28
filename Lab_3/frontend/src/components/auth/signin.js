import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './signin.css';
import * as actions from '../../actions/auth';
import swal from 'sweetalert';
import {withApollo} from 'react-apollo';
import {userLogin} from "../../queries/queries"
import {Redirect} from "react-router";

class Signin extends Component {

	
	// componentWillReceiveProps(newProps) {
	// 	console.log('Will Receive Props ' , newProps)
	// 	  if(newProps.isLogged){
	// 		console.log('Pushing to the page ')
	// 		console.log(this.state.user_id)
	// 		newProps.history.push('/dashboard/d');
	// 	  }
	// 	  else{
	// 		swal("Invalid username/password")
	// 	  }
	// }

	
	
	constructor(props){
		super(props) ;

		this.state = {
			user_id : '' , 
			password : '',
			authFlag: false
		}
	}

	onChangeUserid(e){
		this.setState({
			user_id : e.target.value
		})
	}
	onChangePassword(e){
		this.setState({
			password : e.target.value
		})
	}

	onSignIn(){
		console.log("In signin in")
		console.log(this.state.user_id, this.state.password)
		this.props.client.query({
			query: userLogin,
			variables: {
				user_id: parseInt(this.state.user_id,10),
				password: this.state.password
			}
		})
		.then((response)=>{
			console.log('Response', response)
			console.log(response.data.userLogin)
			localStorage.setItem("usertoken",response.data.userLogin.jwttoken)
			localStorage.setItem("user_id", response.data.userLogin.user_id)
			localStorage.setItem("user_name", response.data.userLogin.name)
			localStorage.setItem("isStudent", response.data.userLogin.isStudent)
			this.setState({
				authFlag : true
			})
	});
}
	    render() {
				let redirectVar = null;
				if(localStorage.getItem('usertoken') && this.state.authFlag === true){
					redirectVar = <Redirect to= "/dashboard/d"></Redirect>
				}
		return (
	        <div>	
					{redirectVar}
	        	<nav className="signup_nav">
	           		Connecting to <img id = "sjsu_logo" alt="" src="/assets/images/sjsu_logo.png"/>
	        	</nav>
		        <div className="container" id="signin_container">
						
		                <div id="logo_div">
		                    <img id="sjsu_full_logo" alt="" src="/assets/images/sjsu_full_logo.png"/>
		                </div>
		                <div id="form_div">
		                    <p className="signup_p"><strong>Sign In</strong></p>
		                    <form id="inner_form" >

		                        <input id="input_form" required="true" name="user_id" type="number" placeholder="ID Number" onChange={this.onChangeUserid.bind(this)}/><br/>
		                        <input id="input_form" required="true" name="password" type="password" placeholder="Password" onChange={this.onChangePassword.bind(this)}/><br/>
		                        <input id="input_form" type="button" className="btn btn-primary" value="Sign In" onClick={() => this.onSignIn()}/>
		                    </form>
		                    <a id="signup_link" href="http://localhost:3000/signup">Don't have an account? Sign Up</a>
						</div>
		        </div>

      		</div>
        );
    }
}


// function mapStateToProps(state) {
//     	return { 
// 			isLogged: state.auth.isLogged,
// 			user_id: state.auth.user_id,
// 			isStudent: state.auth.isStudent
// 		};

// }

// function mapDispatchToProps(dispatch) {
	
//     return {
//     	login : (user_id,password) => dispatch(actions.login(user_id,password))
//     };
// }


// export default withRouter(connect(mapStateToProps , mapDispatchToProps )(props => <Signin {...props}/>));

export default withApollo(Signin);
