import React, { Component } from 'react';
import {connect} from 'react-redux';
import './dashboard.css';
import * as actions from '../../actions/dashboard';
import Sidebar from '../sidebar/sidebar';
import DashboardContent from './dashboardContent/dashboardContent'
import { Route } from 'react-router-dom';
import CourseContent from './courseContent/courseContent'
import swal from 'sweetalert';

class Dashboard extends Component {

	constructor(props){
		super(props) ;

		this.state = {
            user_id: '',
            isStudent: ''
		}
	}

    componentDidMount() {
       // console.log("DID MOUNT " + this.props.user_id)
        
        this.props.getDashboardcourses(this.props.user_id);
    }
    
    
    componentWillReceiveProps(newProps) {
        
	}

    render() {
        console.log(this.props)
        return (
            	<div >
                    
                    <div className="content-area ">

                        
                            <DashboardContent {...this.props}/>
                       

                        
                    </div>



                </div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        user_id : state.auth.user_id,
        course_list: state.auth.course_list,
        isStudent: state.auth.isStudent
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        getDashboardcourses : (user_id) => dispatch(actions.getDashboardcourses(user_id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

