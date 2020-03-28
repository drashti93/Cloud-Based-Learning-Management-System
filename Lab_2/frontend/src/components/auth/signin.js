import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './signin.css';
import * as actions from '../../actions/auth';
import swal from 'sweetalert';
var loginStatus = "";

class Signin extends Component {

	
	componentWillReceiveProps(newProps) {
		console.log('Will Receive Props ' , newProps)
		  if(newProps.isLogged){
			console.log('Pushing to the page ')
			console.log(this.state.user_id)
			newProps.history.push('/dashboard/d');
		  }
		  else if(newProps.message) {
				
				loginStatus = "false"
				console.log("Login status"+loginStatus)
				this.setState({formError:"Invalid User Id or Password"});
		}
	}
	
	constructor(props){
		super(props) ;

		this.state = {
			user_id : '' , 
			password : '',
			useridError: '',
			passwordError: '',
			formError: ''
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

	handlSignin(){
		this.setState({
			useridError: "",
			passwordError:"",
			formError:""
	});
	let isFormValid = true;
        if(this.state.user_id === ''){
            this.setState({useridError:"Please enter your User ID"});
            isFormValid = false;
				}
        if(this.state.password === ''){
            this.setState({passwordError:"Please enter your Password"});
            isFormValid = false;
				}
				if(isFormValid){
					this.props.login(this.state.user_id,this.state.password)
				}
	}

	

	    render() {
		return (
	        <div>	
	        	<nav className="signup_nav">
	           		Connecting to <img id = "sjsu_logo" alt="" src="/assets/images/sjsu_logo.png"/>
	        	</nav>
		        <div className="container" id="signin_container">
						
		                <div id="logo_div">
		                    <img id="sjsu_full_logo" alt="" src="/assets/images/sjsu_full_logo.png"/>
		                </div>
		                <div id="form_div">
										<span className="error">{this.state.formError}</span>
		                    <p className="signup_p"><strong>Sign In</strong></p>
		                    <form id="inner_form" >

		                        <input id="input_form" required="true" name="user_id" type="number" placeholder="ID Number" onChange={this.onChangeUserid.bind(this)}/><br/>
														<span className="error">{this.state.useridError}</span>
		                        <input id="input_form" required="true" name="password" type="password" placeholder="Password" onChange={this.onChangePassword.bind(this)}/><br/>
														<span className="error">{this.state.passwordError}</span>
		                        <input id="input_form" type="button" className="btn btn-primary" value="Sign In" onClick={this.handlSignin.bind(this)}/>
														
		                    </form>
		                    <a id="signup_link" href="http://warm-sierra-47496.herokuapp.com/signup">Don't have an account? Sign Up</a>
						</div>
		        </div>

      		</div>
        );
    }
}


function mapStateToProps(state) {
    	return { 
			isLogged: state.auth.isLogged,
			user_id: state.auth.user_id,
			isStudent: state.auth.isStudent,
			message: state.auth.message
		};

}

function mapDispatchToProps(dispatch) {
	
    return {
    	login : (user_id,password) => dispatch(actions.login(user_id,password))
    };
}


export default withRouter(connect(mapStateToProps , mapDispatchToProps )(props => <Signin {...props}/>));


