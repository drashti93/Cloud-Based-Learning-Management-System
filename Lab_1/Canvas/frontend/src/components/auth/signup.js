import React, { Component } from 'react';
import {connect} from 'react-redux';
import './signup.css';
import * as actions from '../../actions/auth';
import swal from 'sweetalert';



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
		  if(newProps.isSigned){
			console.log('Pushing to the page ')
			newProps.history.push('/signin');
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
		                    <p className="signup_p"><strong>Sign Up</strong></p>
		                    <form id="inner_form">
		                    	<input id="fullname" name="fullname" type="text" placeholder="First Name Last Name" onChange={this.onChangeFullname.bind(this)}/><br/>
                        		<input id="email" name="email" type="email" placeholder="Email" onChange={this.onChangeemail.bind(this)}/><br/>
		                        <input id="user_id" name="user_id" type="number" placeholder="ID Number" onChange={this.onChangeUserid.bind(this)}/><br/>
		                        <input id="password" name="password" type="password" placeholder="Password" onChange={this.onChangePassword.bind(this)}/><br/>
								<label className="signup_label">Are you a Student? </label>
								<input id="check" name="isStudent" type="checkbox" onChange={this.onChangeStudent.bind(this)}/>
		                        <input id="sign_up" type="button" className="btn btn-primary" value="Sign Up" onClick={() =>this.props.signup(this.state.fullname,this.state.email,this.state.user_id, this.state.password, this.state.isStudent)}/><br/>
		                    </form>
		                    <a id="signup_link" href="http://localhost:3000/signin">Already have an account? Sign In</a>
		                </div>
		        </div>

      		</div>
        );
    }
}


function mapStateToProps(state) {
    return {
    	isSigned: state.auth.isSigned,

    };
}

function mapDispatchToProps(dispatch) {
    return {
    	signup : (fullname,email,user_id,password, isStudent) => dispatch(actions.signup(fullname,email,user_id,password, isStudent))
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);


