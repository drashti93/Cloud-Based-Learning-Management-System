import React, { Component } from 'react';
import {connect} from 'react-redux';
import './assignment.css';
//import * as actions from '../../actions/assignment';
import Sidebar from '../sidebar/sidebar'
import swal from 'sweetalert';


class Assignment extends Component {

	// constructor(props){
	// 	super(props) ;

	// 	this.state = {
    //         sidebar_width1 : "0px",
    //         sidebar_width2 : "0px",
    //         sidebar_width3 : "0px"	
    //     }
    //     this.onClickSidebar1 = this.onClickSidebar1.bind(this);
    //     this.onClickSidebar2 = this.onClickSidebar2.bind(this);
    //     this.onClickSidebar3 = this.onClickSidebar3.bind(this);
    // }
    
    constructor(props){
		super(props) ;

		this.state = {
            isDisabled: true,
            user_id: "125",
            email: "",
            phone_number: "",
            about_me: "",
            city: "",
            country: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            gender: ""
        }
        
        
	}


     componentDidMount() {
        console.log('Component DID MOUNT!');
        
     }
     
     componentWillReceiveProps(newProps) {
        console.log('Will Receive Props ' , newProps)
        
        // this.setState({
        //     user_id: newProps.user_id,
            
		// })
		//   if(newProps.isLogged){
		// 	console.log('Pushing to the page ')
		// 	newProps.history.push('/home');
		//   }
	}

    

    render() {
        return (
            	<div>
                        
                        
      			</div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        user_id: state.profile.user_id,
        

    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        //getProfile : (user_id) => dispatch(actions.getProfile(user_id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignment);


