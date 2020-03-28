import React, { Component } from 'react';
import {connect} from 'react-redux';
import './enroll.css';
import * as actions  from '../../actions/course'
import Sidebar from '../../components/sidebar/sidebar.js';
import swal from 'sweetalert';
import {withApollo} from 'react-apollo';
import {userLogin, allCourses} from "../../queries/queries"
import {Redirect} from "react-router";

class Enroll extends Component {

    constructor(props){
		super(props) ;

		this.state = {
            isStudent: "",
            user_id: "",
            course_id: "",
            all_courses: [],
            display_courses: [],
            filtered_courses: [],
            enrollment_count: "",
            enrolled: "",
            isEnrollDisabled: "",
            isDropDisabled: "",
            isWaitDisabled: "",
            activePage: 1,
            current : 1,
            itemsPerPage : 4,
            isEnterPemCodeHidden: "true",
            mycourses: []
		}
        this.reload_screen = this.reload_screen.bind(this);
        this.filterList = this.filterList.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
	}

    componentDidMount() {
        console.log("Course DID MOUNT")
        
        if(localStorage.getItem("isStudent") === "on"){
            this.setState({
                isHidden: true
            })
        }
        else{
            this.setState({
                isHidden: false
            })
        }
        this.props.client.query({
            query: allCourses,
            variables: {
                user_id: parseInt(localStorage.getItem("user_id"),10),
                
            }
        })
        .then((response) => {
            console.log(response)
            this.setState({
                display_courses: response.data.allCourses.courses
            })
        })
        
    }

    // componentWillReceiveProps(newProps) {    
    //     console.log('Component WILL RECIEVE PROPS!')
    //     console.log(newProps)
    //     this.setState({
    //         display_courses: newProps.all_courses
    //     })
    // }

    
reload_screen() {
    setTimeout(function() {
        window.location.reload();
    }, 1000);
    
}

filterList(event) {


    let text = event.target.value.toLowerCase();
    if(event.target.value === ""){
        this.setState({display_courses : this.state.mycourses.courses})
    }else{

        

        let tempArray = this.state.mycourses.filter(course => {
           return (course.course_name.toLowerCase().includes(text)) || (course.course_id.toString().includes(text))
        })
        this.setState({display_courses : tempArray})
    }
  
    //this.setState({display_courses: filtered_courses});

    
}

clickHandler(event) {
    this.setState({
        current: Number(event.target.id)
    });
  }

  sweetAlert(){
    
    swal("Great", "Successfully Enrolled", "success")
    .then(() => {
      this.reload_screen();
    })
}

render(){
    console.log(this.state.display_courses)
    const { current, itemsPerPage } = this.state;
    const indexOfLastPage = current * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentTodos = this.state.display_courses.slice(indexOfFirstPage, indexOfLastPage);
    console.log("Number of properties : " + this.state.display_courses.length);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.display_courses.length / itemsPerPage); i++) {
      pageNumbers.push(i);
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

return (
            
    <div className="course-content-area ">
    
      <div className="row course_row">
      <div className="col-xs-3">
        <Sidebar/>
    </div>
          
          <div className='col-xs- course-option-display'>
            
              {
                 
                      <div className="assignment-container">
                          <div className="assignment-heading-section">Enroll Courses
                          </div>
                          <div className="filter-list">
                                <form>
                                <fieldset className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
                                </fieldset>
                                </form>
                          </div>
                          <table className="table">
                          <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Course Term</th>
                                    <th scope="col">Course ID</th>
                                    <th scope="col">Course Name</th>
                                    <th scope="col">Professor</th>
                                    <th scope="col">Enroll</th>
                                    <th scope="col">Drop</th>
                                    <th scope="col">Waitlist</th>
                                    <th scope="col">Permission Code</th>
                                </tr>
                        </thead>
                        <tbody>
                          {
                            currentTodos.map((course,index) => {
                               return <tr key={index}>
                                
                                
                                    <th scope="row">{index}</th>
                                    <td>Spring 2019</td>
                                    <td id={course.course_id}>{course.course_id}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.user_name}</td>
                                    <td><button className="btn btn-success" hidden={(course.enrolled === 'no' && course.enrollment_count >= course.student_capacity) || (course.enrolled === 'yes') || (course.enrollment_count == course.student_capacity + course.waitlist_capacity) || (course.enrolled === 'no' && course.enrollment_count >= course.student_capacity) } onClick= {() => {this.props.enroll(this.props.user_id,course.course_id); this.reload_screen()}}>Enroll</button></td>
                                    <td><button className="btn btn-danger" hidden={(course.enrolled === 'no' ) || (course.enrollment_count == course.student_capacity + course.waitlist_capacity)} onClick={() => {this.props.drop(this.props.user_id,course.course_id); this.reload_screen()}}>Drop</button></td>
                                    <td><button className="btn btn-warning" hidden={ (course.enrolled === 'yes') || (course.enrolled === 'no' && course.enrollment_count < course.student_capacity) || (course.enrollment_count == course.student_capacity + course.waitlist_capacity)} onClick={() => {this.setState({isEnterPemCodeHidden: false}); this.props.waitlist(this.props.user_id,course.course_id);  this.reload_screen()}}>Waitlist</button></td>
                                    <td><button className="btn" hidden={this.state.isEnterPemCodeHidden} onClick={() => swal({text: "Enter code", content: "input"}).then(code => {this.props.getCode(code, this.props.user_id, course.course_id)})}>Enter permission code</button></td>
                                </tr>
                                
                                  
                                  
                                
                              })
                          }
                          </tbody>
                          </table>
                          <div>
                              {showPageNumbers1}
                          </div>
                      </div>
                      
              }

              
          </div>
      </div>
    </div>
);
            }

        }

        // function mapStateToProps(state) {
        //     return {
        //         user_id: state.auth.user_id,
        //         all_courses: state.course.all_courses,
        //         isStudent: state.auth.isStudent,
        //         enrollment_count: state.course.enrollment_count,
        //         course_list: state.dashboard.course_list
        //     };
        // }
        
        // function mapDispatchToProps(dispatch) {
        //     return {
        //         getAllCourses : (user_id) => dispatch(actions.getAllCourses(user_id)),
        //         enroll : (user_id,course_id) => dispatch(actions.enroll(user_id,course_id)),
        //         drop : (user_id,course_id) => dispatch(actions.drop(user_id,course_id)),
        //         waitlist : (user_id,course_id) => dispatch(actions.waitlist(user_id,course_id)),
        //         getCode: (code, user_id,course_id) => dispatch(actions.getCode(code, user_id,course_id))
        //     };
        // }

// export default connect(mapStateToProps,mapDispatchToProps)(Enroll);

export default withApollo(Enroll)