import React, { Component } from 'react';
import {connect} from 'react-redux';
import './signup.css';
import * as actions from '../../actions/auth';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';


class Signup extends Component {

	constructor(props){
		super(props) ;

		this.state = {
			email : '' , 
			password : '' ,
			fullname : '' ,
			user_id : '',
			isStudent: "off"
		}
	}

	componentWillReceiveProps(newProps) {
		console.log('Will Receive Props ' , newProps)
		  if(newProps.isSigned === true && newProps.message == 'right'){
			console.log('Pushing to the page ')
			newProps.history.push('/signin');
		  }
		  else if(newProps.isSigned === false && newProps.message == 'wrong'){
			this.setState({formError:"User ID already exists"});
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

	onChangeFullname(e){
		this.setState({
			fullname : e.target.value
		})
	}

	onChangeemail(e){
		this.setState({
			email : e.target.value
		})
	}

	onChangeStudent(e){
		
		if(this.state.isStudent==="on") {

			this.setState({
				isStudent: "off"
			})
		}
		else{ 
			this.setState({
				isStudent: "on"
			})
		}
	}

	reload_screen() {
		setTimeout(function() {
			window.location.reload();
		}, 1000);
		
	}

	sweetAlert(){
	
			swal("Great", "Signup successfull", "success")
			.then(() => {
				this.reload_screen();
			})
	}

	handlSignup(){
		this.setState({
			emailError: "",
			nameError: "",
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
		if(this.state.email === ''){
            this.setState({emailError:"Please enter your Email"});
            isFormValid = false;
		}
		else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))){
			this.setState({emailError:"Please enter valid email"});
            isFormValid = false;
		}
		if(this.state.fullname === ''){
            this.setState({nameError:"Please enter your Full Name"});
            isFormValid = false;
		}
		if(isFormValid){
			this.props.signup(this.state.fullname,this.state.email,this.state.user_id, this.state.password, this.state.isStudent)
		}
	}

    render() {
        return (
	        <div>	
	        	<nav className="signup_nav">
	           		Connecting to <img id = "sjsu_logo" alt="" src="/assets/images/sjsu_logo.png"/>
	        	</nav>
		        <div className="container" id="signup_container">
		                <div id="logo_div">
		                    <img id="sjsu_full_logo" alt="" src="/assets/images/sjsu_full_logo.png"/>
		                </div>
		                <div id="form_div">
							<span class="error">{this.state.formError}</span>
		                    <p className="signup_p"><strong>Sign Up</strong></p>
		                    <form id="inner_form">
		                    	<input id="fullname"  name="fullname" type="text" placeholder="First Name Last Name"  onChange={this.onChangeFullname.bind(this)} /><br/>
								<span class="error">{this.state.nameError}</span>
                        		<input id="email" name="email" type="email" placeholder="Email"  onChange={this.onChangeemail.bind(this)} required/><br/>
								<span class="error">{this.state.emailError}</span>
		                        <input id="user_id" name="user_id" type="number" placeholder="ID Number"  onChange={this.onChangeUserid.bind(this)} required/><br/>
								<span class="error">{this.state.useridError}</span>
		                        <input id="password" name="password" type="password" placeholder="Password"  onChange={this.onChangePassword.bind(this)} required/><br/>
								<span class="error">{this.state.passwordError}</span><br/>
								<label className="signup_label">Are you a Student? </label>
								<input id="check" name="isStudent" type="checkbox" onChange={this.onChangeStudent.bind(this)}/>
		                        <input id="sign_up" type="button" className="btn btn-primary" value="Sign Up" onClick={this.handlSignup.bind(this)}/><br/>
		                    </form>
		                    <a id="signup_link" href="http://warm-sierra-47496.herokuapp.com/signin">Already have an account? Sign In</a>
		                </div>
		        </div>

      		</div>
        );
    }
}


function mapStateToProps(state) {
    return {
    	isSigned: state.auth.isSigned,
		message: state.auth.message,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	signup : (fullname,email,user_id,password, isStudent) => dispatch(actions.signup(fullname,email,user_id,password, isStudent))
        
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signup));


