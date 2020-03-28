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
            component_details: [],
            assignment_submissions: [],
            activePage: 1,
            current : 1,
            itemsPerPage : 1,
            isSubmitAssignmentHidden: true,
            isSubmission: "",
            assignSubmission: [],
            grade: "",
            currSumissionId: "",
            user_id: ""
		}
        this.selectTab = this.selectTab.bind(this);
        this.routeChange = this.routeChange.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.reload_screen = this.reload_screen.bind(this);
        this.showCode = this.showCode.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.captureGrades = this.captureGrades.bind(this);
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
                courseOptions : ["Home","Announcement","Assignment","People","Quizzes","Files","Permission Codes"]
            })
        }
        console.log("Course DID MOUNT")
        let obj = queryString.parse(this.props.location.search)
        this.props.getCourseDetails(obj.course, this.props.user_id);
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

    sweetAlert(){
    
        swal("Great", "Code Generated", "success")
        .then(() => {
          //this.reload_screen();
        })
    }

    showCode(){
        this.setState({
            code: this.props.code
        })
        //this.reload_screen()
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
    
    clickHandler(event) {
        this.setState({
            current: Number(event.target.id)
        });
      }

      captureGrades(e){
        this.setState({grade: e.target.value})
      }

    render() {
        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentTodos = this.props.courseDetails.peoples.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + this.props.courseDetails.peoples.length);
        const currentTodos1 = this.props.courseDetails.announcement.slice(indexOfFirstPage, indexOfLastPage);
        console.log(this.props.courseDetails.announcement)
        console.log("Number of properties : " + this.props.courseDetails.announcement.length);
        console.log(this.props.courseDetails && this.props.courseDetails.allAssignment && this.props.courseDetails.allAssignment[0] && this.props.courseDetails.allAssignment[0].assignments? this.props.courseDetails.allAssignment[0] : "")
        var assignment_details = this.props.courseDetails && this.props.courseDetails.allAssignment && this.props.courseDetails.allAssignment[0] && this.props.courseDetails.allAssignment[0].assignments ? this.props.courseDetails.allAssignment[0].assignments : ""
        const currentTodos2 = assignment_details.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + assignment_details.length);
        var quiz_details = this.props.courseDetails && this.props.courseDetails.allQuizzes && this.props.courseDetails.allQuizzes[0] && this.props.courseDetails.allQuizzes[0].quizzes ? this.props.courseDetails.allQuizzes[0].quizzes : ""
        const currentTodos3 = quiz_details.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + assignment_details.length);
        const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.courseDetails.peoples.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const pageNumbers1 = [];
    for (let i = 1; i <= Math.ceil(this.props.courseDetails.announcement.length / itemsPerPage); i++) {
      pageNumbers1.push(i);
    }
    const pageNumbers2 = [];
    for (let i = 1; i <= Math.ceil(assignment_details.length / itemsPerPage); i++) {
      pageNumbers2.push(i);
    }
    const pageNumbers3 = [];
    for (let i = 1; i <= Math.ceil(quiz_details.length / itemsPerPage); i++) {
      pageNumbers3.push(i);
    }

    const showPageNumbers1 = pageNumbers.map(number => {
        return (
          <button class="btn btn-outline-primary pageButton"><a class="page-link" 
            key={number}
            id={number}
            onClick={this.clickHandler}
            className="nums"
          >
      {number}
          </a></button>
        );
      });

      const showPageNumbers2 = pageNumbers1.map(number => {
        return (
          <button class="btn btn-outline-primary pageButton"><a class="page-item active"
            key={number}
            id={number}
            onClick={this.clickHandler}
            className="nums"
          >
      {number}
          </a></button>
        );
      });

      const showPageNumbers3 = pageNumbers2.map(number => {
        return (
          <button class="btn btn-outline-primary pageButton"><a class="page-item active"
            key={number}
            id={number}
            onClick={this.clickHandler}
            className="nums"
          >
      {number}
          </a></button>
        );
      });

      const showPageNumbers4 = pageNumbers3.map(number => {
        return (
          <button class="btn btn-outline-primary pageButton"><a class="page-item active"
            key={number}
            id={number}
            onClick={this.clickHandler}
            className="nums"
          >
      {number}
          </a></button>
        );
      });

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
                                          currentTodos1.map((announce, index) => {
                                              return <div key={index} className="row announcement-row">
                                                          <div className="col-xs-2 announcement-image">
                                                              <img className="people-image" src="/assets/images/user_image.png"/>
                                                          </div>
                                                          <div onClick={() => {this.setState({selectedSubtab : "announcements" , selectedSubtabId : announce.announcements.id}, function() {  this.props.getSingleComponentDetails(this.state.selectedSubtab, this.state.selectedSubtabId, this.state.course_id)   } )} }  className="col-xs-10 announcement-content">
                                                              <h4><b>{announce.announcements.title}</b></h4>
                                                              <br/>
                                                              <span className="pull-right assignment-due">{announce.announcements.date}</span>
                                                              <br/>
                                                              {/* <span>{announce.announcements.content.substring(0,80)}...</span> */}

                                                          </div>
                                                      </div>
                                          })
                                      }
                                      <div>
                                          {showPageNumbers2}
                                      </div>
                                  </div>
                                  :
                                  this.state.selectedTab === "Announcement" && this.state.selectedSubtab !== "" ?
                                  <div className="assignment-container">
                                      
                                      
                                      <h1>{this.props.component_details && this.props.component_details[0] && this.props.component_details[0].announcements && this.props.component_details[0].announcements[0] ? this.props.component_details[0].announcements[0].title : ""}</h1>
                                      <p>{this.props.component_details && this.props.component_details[0] && this.props.component_details[0].announcements && this.props.component_details[0].announcements[0] ? this.props.component_details[0].announcements[0].date : ""}</p>
                                      <p>{this.props.component_details && this.props.component_details[0] && this.props.component_details[0].announcements && this.props.component_details[0].announcements[0] ? this.props.component_details[0].announcements[0].details : ""}</p>

                                      
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
                                          currentTodos2.map((assign, index) => {
                                              
                                              return <div className="single-assignment-area">
                                                  <div onClick={() => {this.setState({selectedSubtab : "assignments" , selectedSubtabId : assign.id}, function() {  this.props.getSingleComponentDetails(this.state.selectedSubtab, this.state.selectedSubtabId, this.state.course_id)   } )} }>{assign.title}</div>
                                                  <i className="fas fa-cloud-download-alt" style={{float:"right", color:"black"}} onClick={()=>this.props.downloadAssignment(assign.assignment_file)}></i>
                                                  <br/>
                                                  <span className="assignment-due">{assign.date}</span>
                                            
                                              </div>
                                          })
                                      }
                                      <div>
                                                {showPageNumbers3}
                                            </div>
                                  </div>
                                  :
                                  this.state.selectedTab === "Assignment" && this.state.selectedSubtab !== "" ?
                                  <div className="assignment-container">
                                        
                                        <h1>{this.props.component_details && this.props.component_details.assignments && this.props.component_details.assignments[0] ? this.props.component_details.assignments[0].title : ""}</h1>
                                      <p>Due date: {this.props.component_details && this.props.component_details.assignments && this.props.component_details.assignments[0] ? this.props.component_details.assignments[0].date : ""}</p>
                                      <div className = "container"><p>{this.props.component_details && this.props.component_details.assignments && this.props.component_details.assignments[0] ? this.props.component_details.assignments[0].details : ""}</p></div>
                                      <button hidden={!this.state.isHidden} class="btn btn-primary" onClick={() => this.setState({isSubmitAssignmentHidden: false})}>Submit</button>
                                      <div class="input-group submitAssignment" hidden={this.state.isSubmitAssignmentHidden}>
                                        <div className="form-group col-md-6 form_assignment">
                                                <label>Upload File</label><br></br>
                                                <input type="file"  id="upload_file" onChange={this.fileChange}/>
                                                <input className="btn btn-success upload" type="button" value="Upload" onClick={() =>{this.props.uploadFile(this.state.course_id,this.props.user_id,this.state.upload_file, "yes", this.props.component_details && this.props.component_details.assignments && this.props.component_details.assignments[0] ? this.props.component_details.assignments[0].id : ""); this.reload_screen()}} id="upload_files" />
                                        </div>
                                        
                                        </div>
                                        <div hidden={this.state.isHidden}>
                                        <table className="table table-striped">
                                          <thead>
                                              <tr>
                                                  <th scope="col">#</th>
                                                  <th scope="col">File Name</th>
                                                  <th scope="col">User ID</th>
                                                  <th scope="col">User Name</th>
                                                  <th scope="col"></th>
                                              </tr>
                                          </thead>
                                          <tbody>

                                          {
                                              this.props.assignment_submissions.map((file,index) => {
                                                  if(this.props.component_details && this.props.component_details.assignments && this.props.component_details.assignments[0] ? this.props.component_details.assignments[0].id : "" === file.submissions[0].assignment_id){
                                                    return <tr key={index}>
                                                          <th scope="row">{index + 1 }</th>
                                                          
                                                          <td data-toggle="modal" data-target=".submissionModal" onClick={() => {this.setState({file_name: file.submissions[0].file_name[0], currSumissionId: file.submissions[0]._id})}}><i className="far fa-file"></i>    {file.submissions[0].file_name[0]}</td>
                                                          <td>{file.user_id}</td>
                                                          <td>{file.name}</td>
                                                          <td hidden={this.state.isHidden}><i onClick={()=>this.props.downloadAssignment(file.submissions[0].file_name[0])} class="far fa-arrow-alt-circle-down download_file"></i></td>
                                                    </tr>
                                                  }
                                              })
                                          }



                                          </tbody>
                                      </table>
                                        </div>

                                        <div className="modal fade bd-example-modal-lg submissionModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" >
                                                <div className="modal-dialog modal-lg">{this.state.file_name}
                                                    <div className="modal-content">
                                                        <div id="parent">
                                                            <input type="text" className="form-control-plaintext grade-box" placeholder="Grade" onChange={this.captureGrades}></input>
                                                            <button className="btn btn-primary grade-button" onClick={() => {this.props.submitGrades(this.state.grade, this.state.currSumissionId); this.reload_screen()}}>Submit</button>
                                                        </div>
                                                        <PDF file={this.state.file_name}/>
                                                    </div>
                                                </div>
                                            </div>
                                  </div>
                                    :
                                  <span></span>
                          }
                          
                          {
                              this.state.selectedTab === "Quizzes" && this.state.selectedSubtab === ""?
                                  <div className="assignment-container">
                                  <div className="assignment-heading-section">    Quizzes
                                            <a href={`/addQuiz?course=${this.state.course_id}`} id="assignment_add" className="btn btn-primary" hidden= {this.state.isHidden}>Add Quiz</a>
                                      </div>
                                      {
                                          currentTodos3.map((quiz, index) => {
                                              console.log(quiz.id)
                                              return <div key={index} className="single-assignment-area">
                                              <div onClick={() => {this.setState({selectedSubtab : "quizzes" , selectedSubtabId : quiz.id}, function() {  this.props.getSingleComponentDetails(this.state.selectedSubtab, this.state.selectedSubtabId, this.state.course_id)   } )} }>{quiz.title} </div>
                                                          
                                                           
                                                              <br/>
                                                              <span className="pull-right assignment-due">{quiz.due}</span>
                                                              

                                                          </div>
                                                      
                                          })
                                      }
                                      <div>
                                      {showPageNumbers4}
                                      </div>

                                  </div>
                                  :
                                  this.state.selectedTab === "Quizzes" && this.state.selectedSubtab !== "" ?
                                  <div className="assignment-container">
                                        <h1>{this.props.component_details && this.props.component_details.quizzes && this.props.component_details.quizzes[0] ? this.props.component_details.quizzes[0].title : ""}</h1>
                                      <p>{this.props.component_details && this.props.component_details.quizzes && this.props.component_details.quizzes[0] ? this.props.component_details.quizzes[0].date : ""}</p>
                                      <div className = "container"><p>{this.props.component_details && this.props.component_details.quizzes && this.props.component_details.quizzes[0] ? this.props.component_details.quizzes[0].details : ""}</p></div>
                                      <a href={`/takeQuiz?quiz=${this.state.selectedSubtabId}&course_id=${this.state.course_id}`} id="assignment_add" hidden={!this.state.isHidden} class="btn btn-primary">Take Quiz</a>
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
                                                          <td>Student</td>
                                                          <td>{this.props.courseDetails.waitlistedStudentsCode[index].permission_code}</td>
                                                          <td hidden={this.state.isHidden}><button hidden={this.state.isHidden} className="btn btn-primary" hidden={this.state.isGenCodeDisabled} onClick={() => {this.props.genCode(people.user_id,this.state.course_id); this.sweetAlert(); this.showCode()}}>Generate code</button></td>
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
                                             
                                              <th scope="col">Score</th>
                                              <th scope="col">Out of</th>
                                          </tr>
                                          </thead>


                                          <tbody>

                                          {
                                              this.props.courseDetails.assignment.map((assign, index) => {
                                                  
                                                  return <tr key={index}>
                                                      <th scope="row">{index + 1 }</th>
                                                      <td>{ assign.assignment_name}</td>
                                                      
                                                      <td>{assign && assign.grade  ? assign.grade[0] : ""}</td>
                                                      <td>{assign.from_grade}</td>
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
                                                  <th hidden={this.state.isHidden} scope="col">Drop Student</th>
                                              </tr>
                                          </thead>
                                          <tbody>

                                          {
                                              currentTodos.map((people,index) => {
                                                  return <tr key={index}>
                                                          <th scope="row">{index + 1 }</th>
                                                          <td><img alt=""  className="people-image" src="/assets/images/user_image1.png"/></td>
                                                          <td>{people.name}</td>
                                                          <td>{people.role}</td>
                                                          <td hidden={this.state.isHidden}><button hidden={this.state.isHidden} onClick={() => {this.props.drop(people.user_id,this.state.course_id); this.reload_screen()}} className="btn btn-danger">Drop</button></td>
                                                      </tr>
                                              })
                                          }



                                          </tbody>
                                      </table>
                                    <div class="page">
                                          {showPageNumbers1}
                                    </div>
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
                                              this.props.courseDetails.files[0].files.map((file,index) => {
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
                                                <input className="btn btn-success upload" type="button" value="Upload" onClick={() =>{this.props.uploadFile(this.state.course_id,this.props.user_id, this.state.upload_file, "no", this.props.component_details.id); this.reload_screen()}} id="upload_files" />
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
        component_details: state.course.component_details,
        assignment_submissions: state.course.assignment_submissions,
        user_id: state.auth.user_id,
        course_list: state.dashboard.course_list
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        getCourseDetails : (course_id, user_id) => dispatch(actions.getCourseDetails(course_id, user_id)),
        genCode : (user_id,course_id) => dispatch(actions.genCode(user_id,course_id)),
        downloadAssignment: (assignment_file) => dispatch(assignActions.downloadAssignment(assignment_file)),
        uploadFile: (course_id, user_id, upload_file, flag, assignmentid) => dispatch(assignActions.uploadFile(course_id,user_id, upload_file, flag, assignmentid)),
        getSingleComponentDetails: (type, id, course_id) => dispatch(actions.getSingleComponentDetails(type, id, course_id)),
        drop : (user_id,course_id) => dispatch(actions.drop(user_id,course_id)),
        submitGrades: (grade, submission_id) => dispatch(actions.submitGrades(grade, submission_id))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CourseContent));

