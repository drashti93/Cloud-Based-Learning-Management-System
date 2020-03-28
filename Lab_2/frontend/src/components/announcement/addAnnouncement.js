import React, { Component } from 'react';
import {connect} from 'react-redux';
import './addAnnouncement.css';
import * as actions from '../../actions/announcement';
import Sidebar from '../sidebar/sidebar.js';
import swal from 'sweetalert';
import CourseContent from '../dashboard/courseContent/courseContent'

class AddAnnouncement extends Component {
    
    constructor(props){
		super(props) ;

		this.state = {
            isDisabled: true,
            user_id: "125",
            assignment_id: "",
            assignment_name: "",
            assignment_description: "",
            
        }
        
        this.idChange = this.idChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.reload_screen = this.reload_screen.bind(this);
       
	}

    idChange(event){
        this.setState({assignment_id: event.target.value});
    }

    nameChange(event){
        this.setState({assignment_name: event.target.value});
    }

    descChange(event){
        this.setState({assignment_description: event.target.value});
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

    reload_screen() {
        setTimeout(function() {
            window.location.reload();
        }, 1000);
        
    }

    sweetAlert(){
	
        swal("Great", "Profile Updated", "success")
        .then(() => {
            this.reload_screen();
        })
}

    render() {
        return (
            
            	<div>
                <Sidebar/>
                      <div id="assignment_container" className="container">
        <div>
            <h1 id="h1_assignment"> Add Announcement </h1>
        </div>
        <form>
                <div className="form-row">
                  <div className="form-group col-md-6 form_assignment">
                    <label htmlFor="assignment_id">Announcement ID</label>
                    <input type="number" className="form-control " value={this.state.assignment_id} id="assignment_id" placeholder="Announcement ID" onChange={this.idChange.bind(this)}/>
                  </div>
                  <div className="form-group col-md-6 form_assignment">
                        <label htmlFor="assignment_name">Announcement Title</label>
                        <input type="text" className="form-control " value={this.state.assignment_name} id="assignment_name" placeholder="Announcement Name" onChange={this.nameChange}/>
                  </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6 form_assignment">
                            <label htmlFor="assignment_description">Announcement Details</label>
                            <input type="text" className="form-control " value={this.state.assignment_description} id="assignment_description" onChange={this.descChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <input className="btn btn-success" type="button" value="Save" onClick={() =>{this.props.addNewAnnouncement(this.state.assignment_id, this.state.assignment_description, this.state.assignment_name, this.props.user_id); this.sweetAlert()}} id="save_assignment" />
                </div>
              </form>
            </div>  
                        
      			</div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        user_id: state.auth.user_id,
        course_list: state.dashboard.course_list
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        addNewAnnouncement : (id, details, name, user_id) => dispatch(actions.addNewAnnouncement(id, details, name, user_id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddAnnouncement);


