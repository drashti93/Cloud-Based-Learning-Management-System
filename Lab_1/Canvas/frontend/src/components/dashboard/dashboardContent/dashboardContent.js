import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import './dashboardContent.css';
import Sidebar from '../../../components/sidebar/sidebar.js';
import { Link } from 'react-router-dom';
import { throws } from 'assert';
import swal from 'sweetalert';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


class DashboardContent extends Component {

	constructor(props){
		super(props) ;

		this.state = {
            user_id: "",
            color : ["rgb(77, 61, 77)","rgb(145, 52, 155)","rgb(37, 66, 132)","rgb(0, 118, 184)","rgb(77, 61, 77)",
                "rgb(77, 61, 77)","rgb(145, 52, 155)","rgb(37, 66, 132)","rgb(0, 118, 184)","rgb(77, 61, 77)",
                "rgb(77, 61, 77)","rgb(145, 52, 155)","rgb(37, 66, 132)","rgb(0, 118, 184)","rgb(77, 61, 77)",
                "rgb(77, 61, 77)","rgb(145, 52, 155)","rgb(37, 66, 132)","rgb(0, 118, 184)","rgb(77, 61, 77)",
                "rgb(77, 61, 77)","rgb(145, 52, 155)","rgb(37, 66, 132)","rgb(0, 118, 184)","rgb(77, 61, 77)"],
                isStudent: "",
            isHidden: ""
        }
        this.routeChange = this.routeChange.bind(this);
	}

    componentDidMount() {
        if(this.props.isStudent === "on"){
            this.setState({
                isHidden: true
            })
        }
        else{
            this.setState({
                isHidden: false
            })
        }
        console.log(this.props.isStudent)
        console.log("Dash " + this.props)
        console.log("dashboard did mount"+this.props.user_id)
    }

    componentWillReceiveProps(newProps) {
        console.log('Will Receive Props ' , newProps)
	}

    routeChange() {
        let path = "/addCourse";
        this.props.history.push(path);
    }

    render() {
	    console.log(typeof this.props.course_list)
        return (
            	<div>
                   <div className="row">
                   <div className="col-xs-3">
                        <Sidebar/>
                    </div>
                    <Link to="/addCourse" id="assignment_add" className="btn btn-primary" hidden={this.state.isHidden}>Add Course</Link>
                        
                        {
                            this.props.course_list.map((course,index) => {
                                return <Draggable><div key={index} className="course-component col-xs-4">
                                    <div className="colored-area" style={{ "backgroundColor" : this.state.color[index]}}>
                                    </div>
                                    <div className="course-details-area">
                                        <a href={`/course?course=${course.course_id}`}>SP19: CMPE {course.course_id} : {course.course_name}</a>
                                        <div id="course-details">Spring 2019</div> 
                                    </div>
                                    <div>
                                        <i className="fas fa-bullhorn"></i>
                                        <i className="fas fa-file-signature"></i>
                                        <i className="far fa-comments"></i>
                                        <i className="fas fa-folder"></i>
                                    </div>

                                    </div>
                                    </Draggable>






                            })
                        }

                    </div>
                </div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        isStudent: state.auth.isStudent,
       course_list: state.dashboard.course_list,
       user_id: state.dashboard.user_id
    };
}

function mapDispatchToProps(dispatch) {
    
    return {

    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DashboardContent));

