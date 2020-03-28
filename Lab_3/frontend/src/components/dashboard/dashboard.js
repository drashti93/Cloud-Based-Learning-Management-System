import React, { Component } from 'react';
import {connect} from 'react-redux';
import './dashboard.css';
import * as actions from '../../actions/dashboard';
import Sidebar from '../sidebar/sidebar';
import DashboardContent from './dashboardContent/dashboardContent'
import { Route } from 'react-router-dom';
import CourseContent from './courseContent/courseContent'
import swal from 'sweetalert';
import {withApollo} from 'react-apollo';
import {userLogin, allCourses} from "../../queries/queries"
import {Redirect} from "react-router";

class Dashboard extends Component {

	constructor(props){
		super(props) ;

		this.state = {
            user_id: '',
            isStudent: '',
            courses: []
		}
	}

    componentDidMount() {
       // console.log("DID MOUNT " + this.props.user_id)
       this.props.client.query({
        query: allCourses,
        variables: {
            user_id: parseInt(localStorage.getItem("user_id"),10),
            
        }
    })
    .then((response) => {
        console.log(response)
        this.setState({
            courses: response.data.allCourses
        })
    })
        
    }
    
    
    // componentWillReceiveProps(newProps) {
        
	// }

    render() {
        console.log(this.state.courses)
        return (
            	<div >
                    
                    <div className="content-area ">

                        
                            <DashboardContent {...this.state.courses}/>
                       

                        
                    </div>



                </div>
        );
    }
}


// function mapStateToProps(state) {
    
//     return {
//         user_id : state.auth.user_id,
//         course_list: state.auth.course_list,
//         isStudent: state.auth.isStudent
//     };
// }

// function mapDispatchToProps(dispatch) {
    
//     return {
//         getDashboardcourses : (user_id) => dispatch(actions.getDashboardcourses(user_id))
//     };
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

export default withApollo(Dashboard)