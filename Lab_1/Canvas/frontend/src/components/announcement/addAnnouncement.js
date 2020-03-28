import React, { Component } from 'react';
import {connect} from 'react-redux';
import './addAssignment.css';
import * as actions from '../../actions/assignments';
import Sidebar from '../sidebar/sidebar.js';
import swal from 'sweetalert';


class AddAssignment extends Component {

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
            assignment_id: "",
            assignment_name: "",
            assignment_description: "",
            assignment_file: "",
            assignment_date: "",
            assignment_dept: ""
        }
        
        this.idChange = this.idChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.deptChange = this.deptChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.fileChange = this.fileChange.bind(this);
	}

    idChange(event){
        this.setState({assignment_id: event.target.value});
    }

    nameChange(event){
        this.setState({assignment_name: event.target.value});
    }

    deptChange(event){
        this.setState({assignment_dept: event.target.value});
    }

    descChange(event){
        this.setState({assignment_description: event.target.value});
    }

    dateChange(event){
        this.setState({assignment_date: event.target.value});
    }

    fileChange(event){
        this.setState({assignment_file: event.target.files});
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
                <Sidebar/>
                      <div id="assignment_container" className="container">
        <div>
            <h1 id="h1_assignment"> Add Assignment </h1>
        </div>
        <form>
                <div className="form-row">
                  <div className="form-group col-md-6 form_assignment">
                    <label htmlFor="assignment_id">Assignment ID</label>
                    <input type="number" className="form-control " value={this.state.assignment_id} id="assignment_id" placeholder="Assignment ID" onChange={this.idChange.bind(this)}/>
                  </div>
                  <div className="form-group col-md-6 form_assignment">
                        <label htmlFor="assignment_name">Assignment Name</label>
                        <input type="text" className="form-control " value={this.state.assignment_name} id="assignment_name" placeholder="Assignment Name" onChange={this.nameChange}/>
                  </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 form_assignment">
                        <label htmlFor="course_department">Course Department</label>
                        <input type="text" className="form-control " value={this.state.assignment_dept} id="course_department" placeholder="Course Department" onChange={this.deptChange}/>
                    </div>
                    <div className="form-group col-md-6 form_assignment">
                        <label htmlFor="due_date">Due Date</label>
                        <input type="date" className="form-control " value={this.state.assignment_date} id="due_date" placeholder="Due Date" onChange={this.dateChange}/>
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6 form_assignment">
                            <label htmlFor="assignment_description">Assignment Description</label>
                            <input type="text" className="form-control " value={this.state.assignment_description} id="assignment_description" onChange={this.descChange}/>
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6 form_assignment">
                            <label htmlFor="assignment_description">Upload File</label>
                            <input type="file"  id="assignment_file" onChange={this.fileChange}/>
                </div>
                </div>
                <div className="form-row">
                    <input className="btn btn-success" type="button" value="Save" onClick={() =>this.props.addNewAssignment(this.state)} id="save_assignment" />
                </div>
              </form>
            </div>  
                        
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
        addNewAssignment : (user_id) => dispatch(actions.addNewAssignment(user_id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddAssignment);


