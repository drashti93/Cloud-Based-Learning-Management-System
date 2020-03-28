import React, { Component } from 'react';
import {connect} from 'react-redux';
import './courseContent.css';
import * as actions  from '../../../actions/course';
import * as assignActions  from '../../../actions/assignments';
import Sidebar from '../../../components/sidebar/sidebar.js';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PDF from '../../pdf/pdf';
import swal from 'sweetalert';

class CourseContent extends Component {

	constructor(props){
		super(props) ;

		this.state = {
		    courseOptions : ["Home","Announcement","Assignment","People","Grades","Quizzes",],
            selectedTab : "Home",
            selectedSubtab: "",
            selectedSubtabId : "",
            assignment : [],
            peoples : [],
            announcement : [],
            waitlistedStudents: [],
            isStudent: "",
            isHidden: "",
            course_id: "",
            file_name: "",
            upload_file: "",
            code: "",
            isGenCodeDisabled: "",
            component_details: []
		}
        this.selectTab = this.selectTab.bind(this);
        this.routeChange = this.routeChange.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.reload_screen = this.reload_screen.bind(this);
        this.showCode = this.showCode.bind(this);
    }

   
    

    componentDidMount() {
        if(this.props.isStudent === "on"){
            this.setState({
                isHidden: true,
                courseOptions : ["Home","Announcement","Assignment","People","Grades","Quizzes","Files"]
            })
        }
        else{
            this.setState({
                isHidden: false,
                courseOptions : ["Home","Announcement","Assignment","People","Grades","Quizzes","Files","Permission Codes"]
            })
        }
        console.log("Course DID MOUNT")
        let obj = queryString.parse(this.props.location.search)
        this.props.getCourseDetails(obj.course);
        sessionStorage.setItem("course_id", obj.course);
        this.setState({
            course_id: obj.course
        })
        
    }


    componentWillReceiveProps(newProps) {
        
        
    }
    
    reload_screen() {
        setTimeout(function() {
            window.location.reload();
        }, 1000);
        
    }

    showCode(){
        this.setState({
            code: this.props.code
        })
        this.reload_screen()
    }

	selectTab(val){
	    console.log(val)
    }

    routeChange() {
        let path = "/addAssignment";
        this.props.history.push(path);
    }

    fileChange(event){
        this.setState({upload_file: event.target.files});
    }

    

    render() {
       
        return (
            
                <div className="course-content-area ">
                
                  <div className="row course_row">
                  <div className="col-xs-3">
                    <Sidebar/>
                </div>
                      <div className="col-xs-3 course-option-area">
                          {
                              
                              this.state.courseOptions.map((option,index) => {
                                  return <div  onClick={() => {
                                    this.setState({selectedTab : option , selectedSubtab : "" , selectedSubtabId : ""})
                                  }}  className="row single-course-option" key={index}>
                                      <span>{option}</span>
                                  </div>
                              })
                          }
                      </div>
                      <div className='col-xs-9 course-option-display'>
                          {
                              this.state.selectedTab === "Home" ?
                                  <div>
                                      { this.state.selectedTab }
                                      
                                  </div>
                                  :
                                  <span></span>
                          }

                          {
                              this.state.selectedTab === "Announcement" && this.state.selectedSubtab === ""?
                                  <div className="assignment-container">
                                  <div className="assignment-heading-section">    Announcements
                                            <Link to="/addAnnouncement" id="assignment_add" className="btn btn-primary" hidden= {this.state.isHidden}>Announcement</Link>
                                      </div>
                                      {
                                          this.props.courseDetails.announcement.map((announce, index) => {
                                              return <div key={index} className="row announcement-row">
                                                          <div className="col-xs-2 announcement-image">
                                                              <img className="people-image" src="/assets/images/user_image2.png"/>
                                                          </div>
                                                          <div onClick={() => {this.setState({selectedSubtab : "announcements" , selectedSubtabId : announce.id}, function() {  this.props.getSingleComponentDetails(this.state.selectedSubtab, this.state.selectedSubtabId)   } )} }  className="col-xs-10 announcement-content">
                                                              <h4><b>{announce.heading}</b></h4>
                                                              <br/>
                                                              <span className="pull-right assignment-due">{announce.date}</span>
                                                              <br/>
                                                              <span>{announce.content.substring(0,80)}...</span>

                                                          </div>
                                                      </div>
                                          })
                                      }

                                  </div>
                                  :
                                  this.state.selectedTab === "Announcement" && this.state.selectedSubtab !== "" ?
                                  <div className="assignment-container">
                                      
                                      
                                      <h1>{this.props.component_details.name}</h1>
                                      <p>{this.props.component_details.date}</p>
                                      <p>{this.props.component_details.description}</p>

                                      
                                  </div>
                                    :
                                    <span></span>
                                  
                                  
                          }

                          {
                              this.state.selectedTab === "Assignment" && this.state.selectedSubtab === ""?
                                  <div className="assignment-container">
                                      <div className="assignment-heading-section">    Assignment
                                            <Link to="/addAssignment" id="assignment_add" className="btn btn-primary" hidden= {this.state.isHidden}>Add Assignment</Link>
                                      </div>


                                      {
                                          this.props.courseDetails.allAssignment.map((assign, index) => {
                                              return <div className="single-assignment-area">
                                                  <div onClick={() => {this.setState({selectedSubtab : "assignments" , selectedSubtabId : assign.id}, function() {  this.props.getSingleComponentDetails(this.state.selectedSubtab, this.state.selectedSubtabId)   } )} }>{assign.name} {index}</div>
                                                  <i className="fas fa-cloud-download-alt" style={{float:"right", color:"black"}} onClick={()=>this.props.downloadAssignment(assign.assignment_file)}></i>
                                                  <br/>
                                                  <span className="assignment-due">{assign.due}</span>
                                              </div>
                                          })
                                      }

                                  </div>
                                  :
                                  this.state.selectedTab === "Assignment" && this.state.selectedSubtab !== "" ?
                                  <div className="assignment-container">
                                        <h1>{this.props.component_details.name}</h1>
                                      <p>{this.props.component_details.date}</p>
                                      <div className = "container"><p>{this.props.component_details.description}</p></div>
                                      <button hidden={!this.state.isHidden} class="btn btn-primary">Submit</button>
                                  </div>
                                    :
                                  <span></span>
                          }
                          
                          {
                              this.state.selectedTab === "Quizzes" && this.state.selectedSubtab === ""?
                                  <div className="assignment-container">
                                  <div className="assignment-heading-section">    Quizzes
                                            <Link to="/addQuiz" id="assignment_add" className="btn btn-primary" hidden= {this.state.isHidden}>Add Quiz</Link>
                                      </div>
                                      {
                                          this.props.courseDetails.allQuizzes.map((quiz, index) => {
                                              console.log(quiz.id)
                                              return <div key={index} className="single-assignment-area">
                                              <div onClick={() => {this.setState({selectedSubtab : "quizzes" , selectedSubtabId : quiz.id}, function() {  this.props.getSingleComponentDetails(this.state.selectedSubtab, this.state.selectedSubtabId)   } )} }>{quiz.name} </div>
                                                          
                                                           
                                                              <br/>
                                                              <span className="pull-right assignment-due">{quiz.due}</span>
                                                              

                                                          </div>
                                                      
                                          })
                                      }

                                  </div>
                                  :
                                  this.state.selectedTab === "Quizzes" && this.state.selectedSubtab !== "" ?
                                  <div className="assignment-container">
                                        <h1>{this.props.component_details.name}</h1>
                                      <p>{this.props.component_details.date}</p>
                                      <div className = "container"><p>{this.props.component_details.description}</p></div>
                                      <button hidden={!this.state.isHidden} class="btn btn-primary">Take Quiz</button>
                                  </div>
                                  :
                                  <span></span>
                          }

                          {
                              this.state.selectedTab === "Permission Codes" ?

                                  <div className="assignment-container">
                                      <div className="assignment-heading-section"> Waitlisted Students </div>
                                        <table className="table table-striped">
                                          <thead>
                                              <tr>
                                                  <th scope="col">#</th>
                                                  {/* <th scope="col"></th> */}
                                                  <th scope="col">Name</th>
                                                  <th scope="col">Role</th>
                                                  <th scope="col">Permission Code</th>
                                                  <th scope="col">Generate Code</th>
                                              </tr>
                                          </thead>
                                          <tbody>

                                          {
                                              this.props.courseDetails.waitlistedStudents.map((people,index) => {
                                                  if(people.permission_code != null){
                                                      this.state.isGenCodeDisabled=true;
                                                  }
                                                  return <tr key={index}>
                                                          <th scope="row">{index + 1 }</th>
                                                          {/* <td><img alt=""  className="people-image" src="/assets/images/user_image.png"/></td> */}
                                                          <td>{people.name}</td>
                                                          <td>{people.role}</td>
                                                          <td>{people.permission_code}</td>
                                                          <td><button className="btn btn-primary" hidden={this.state.isGenCodeDisabled} onClick={() => {this.props.genCode(people.user_id,this.state.course_id); this.showCode()}}>Generate code</button></td>
                                                      </tr>
                                              })
                                          }



                                          </tbody>
                                      </table>

                                  </div>


                                  :
                                  <span></span>
                          }

                          {
                              this.state.selectedTab === "Grades" ?
                                  <div className="assignment-container">
                                      <div className="assignment-heading-section">  Grades</div>

                                      <table className="table">
                                          <thead className="thead-dark">
                                          <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Name</th>
                                              <th scope="col">Due</th>
                                              <th scope="col">Score</th>
                                              <th scope="col">Out of</th>
                                          </tr>
                                          </thead>


                                          <tbody>

                                          {
                                              this.props.courseDetails.assignment.map((assign, index) => {
                                                  return <tr key={index}>
                                                      <th scope="row">{index + 1 }</th>
                                                      <td>{ assign.name}</td>
                                                      <td>{assign.due}</td>
                                                      <td>{assign.score}</td>
                                                      <td>{assign.score_from}</td>
                                                  </tr>
                                              })
                                          }

                                          </tbody>
                                      </table>





                                  </div>
                                  :
                                  <span></span>
                          }

                          {
                              this.state.selectedTab === "People" ?

                                  <div className="assignment-container">
                                      <div className="assignment-heading-section"> People </div>
                                        <table className="table table-striped">
                                          <thead>
                                              <tr>
                                                  <th scope="col">#</th>
                                                  <th scope="col"></th>
                                                  <th scope="col">Name</th>
                                                  <th scope="col">Role</th>
                                                  <th scope="col">Drop Student</th>
                                              </tr>
                                          </thead>
                                          <tbody>

                                          {
                                              this.props.courseDetails.peoples.map((people,index) => {
                                                  return <tr key={index}>
                                                          <th scope="row">{index + 1 }</th>
                                                          <td><img alt=""  className="people-image" src="/assets/images/user_image1.png"/></td>
                                                          <td>{people.name}</td>
                                                          <td>{people.role}</td>
                                                          <td><button className="btn btn-danger">Drop</button></td>
                                                      </tr>
                                              })
                                          }



                                          </tbody>
                                      </table>

                                  </div>


                                  :
                                  <span></span>
                          }
                          {
                              this.state.selectedTab === "Files" ?

                                  <div className="assignment-container">
                                      <div className="assignment-heading-section"> Files </div>
                                        <table className="table table-striped">
                                          <thead>
                                              <tr>
                                                  <th scope="col">#</th>
                                                  <th scope="col">File Name</th>
                                                  <th scope="col"></th>
                                              </tr>
                                          </thead>
                                          <tbody>

                                          {
                                              this.props.courseDetails.files.map((file,index) => {
                                                    return <tr key={index}>
                                                          <th scope="row">{index + 1 }</th>
                                                          <td data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => {this.setState({file_name: file.file_name})}}><i className="far fa-file"></i>    {file.file_name}</td>
                                                          <td hidden={!this.state.isHidden}><i onClick={()=>this.props.downloadAssignment(file.file_name)} class="far fa-arrow-alt-circle-down download_file"></i></td>
                                                    </tr>
                                              })
                                          }



                                          </tbody>
                                      </table>

                                            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" >
                                                <div className="modal-dialog modal-lg">{this.state.file_name}
                                                    <div className="modal-content">
                                                        <PDF file={this.state.file_name}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div hidden={this.state.isHidden} className="form-group col-md-6 form_assignment">
                                                <label>Upload File</label><br></br>
                                                <input type="file"  id="upload_file" onChange={this.fileChange}/>
                                                <input className="btn btn-success upload" type="button" value="Upload" onClick={() =>{this.props.uploadFile(this.state.course_id,this.state.upload_file); this.reload_screen()}} id="upload_files" />
                                            </div>

                                  </div>
                                  


                                  :
                                  <span></span>
                          }
                      </div>
                  </div>
                </div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
       course_list: state.dashboard.course_list,
        courseDetails : state.course.courseDetails,
        isStudent: state.auth.isStudent,
        code: state.course.code,
        component_details: state.course.component_details
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        getCourseDetails : (course_id) => dispatch(actions.getCourseDetails(course_id)),
        genCode : (user_id,course_id) => dispatch(actions.genCode(user_id,course_id)),
        downloadAssignment: (assignment_file) => dispatch(assignActions.downloadAssignment(assignment_file)),
        uploadFile: (course_id,upload_file) => dispatch(assignActions.uploadFile(course_id,upload_file)),
        getSingleComponentDetails: (type, id) => dispatch(actions.getSingleComponentDetails(type, id))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CourseContent));

