import React, { Component } from 'react';
import {connect} from 'react-redux';
import './addCourse.css';
import * as actions from '../../actions/course';
import Sidebar from '../../components/sidebar/sidebar.js';
import swal from 'sweetalert';


class AddCourse extends Component {

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
            user_id:"",
            course_id: "",
            course_name:"",
            course_department:"",
            course_description:"",
            room_number:"",
            student_capacity:"",
            waitlist_capacity:"",
            course_term:"",
            user_name: "",
            
            
        }
        
        
	}


     componentDidMount() {
        console.log('Component DID MOUNT!');
        
     }
     
     componentWillReceiveProps(newProps) {
        console.log('Will Receive Props ' , newProps)
        
        
    }
    
    onChangeCourseid(e){
		this.setState({
			course_id : e.target.value
		})
    }

    onChangeCourseName(e){
		this.setState({
			course_name : e.target.value
		})
    }

    onChangeCourseDepartment(e){
		this.setState({
			course_department : e.target.value
		})
    }

    onChangeCourseDesp(e){
		this.setState({
			course_description : e.target.value
		})
    }

    onChangeCourseRoom(e){
		this.setState({
			room_number : e.target.value
		})
    }

    onChangeCourseCapacity(e){
		this.setState({
      student_capacity : e.target.value,
		})
    }

    onChangeWaitCap(e){
		this.setState({
			waitlist_capacity : e.target.value
		})
    }

    onChangeCourseTerm(e){
		this.setState({
			course_term : e.target.value
		})
    }

        

    

    render() {
        return (
            
            	<div>
                    <Sidebar/>
                      <div id="assignment_container" className="container">
                        <div>
                            <h1 id="h1_assignment"> Add Course </h1>
                        </div>
                        
                            <div className="form-row">
                            <div className="form-group col-md-6 form_assignment">
                                <label htmlFor="course_id">Course ID</label>
                                <input type="number" className="form-control " name="course_id" id="course_id" placeholder="Course ID" onChange={this.onChangeCourseid.bind(this)}/>
                            </div>
                            <div className="form-group col-md-6 form_assignment">
                                    <label htmlFor="course_name">Course Name</label>
                                    <input type="text" className="form-control " name="course_name" id="course_name" placeholder="Course Name" onChange={this.onChangeCourseName.bind(this)}/>
                            </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6 form_assignment">
                                    <label htmlFor="course_department">Course Department</label>
                                    <input type="text" className="form-control " name="course_department" id="course_department" placeholder="Course Department" onChange={this.onChangeCourseDepartment.bind(this)}/>
                                </div>
                                <div className="form-group col-md-6 form_assignment">
                                        <label htmlFor="course_description">Course Description</label>
                                        <input type="text" className="form-control " name="course_description" id="course_description" placeholder="Course Description" onChange={this.onChangeCourseDesp.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6 form_assignment">
                                    <label htmlFor="room_number">Course Room</label>
                                    <input type="text" className="form-control " name="room_number" id="room_number" placeholder="Course Room" onChange={this.onChangeCourseRoom.bind(this)}/>
                                </div>
                                <div className="form-group col-md-6 form_assignment">
                                        <label htmlFor="student_capacity">Course Capacity</label>
                                        <input type="number" className="form-control " name="student_capacity" id="student_capacity" placeholder="Course Capacity" onChange={this.onChangeCourseCapacity.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6 form_assignment">
                                    <label htmlFor="waitlist_capacity">Waitlist Capacity</label>
                                    <input type="text" className="form-control " name="waitlist_capacity" id="waitlist_capacity" placeholder="Waitlist Capacity" onChange={this.onChangeWaitCap.bind(this)}/>
                                </div>
                                <div className="form-group col-md-6 form_assignment">
                                    <label htmlFor="course_term">Course Term</label>
                                    <input type="text" className="form-control " name="course_term" id="course_term" placeholder="Course Term" onChange={this.onChangeCourseTerm.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <button type="submit" className="btn btn-success" name="save_assignment" onClick={() =>this.props.addCourse(this.props.user_id,this.state.course_id,this.state.course_name, this.state.course_department,this.state.course_description,this.state.room_number,this.state.student_capacity,this.state.waitlist_capacity,this.state.course_term, this.state.user_name )} >Save</button>
                            </div>
                        
                    </div>  
                        
      			</div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        user_id: state.auth.user_id,
        user_name: state.auth.user_name
        
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        
        addCourse : (user_id, course_id, course_name, course_department, course_description, room_number, student_capacity, waitlist_capacity, course_term, user_name) => dispatch(actions.addCourse(user_id,course_id,course_name, course_department,course_description,room_number,student_capacity, waitlist_capacity, course_term,user_name))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCourse);


