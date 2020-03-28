import React, { Component } from 'react';
import {connect} from 'react-redux';
import './sidebar.css';
import { Link } from 'react-router-dom';
import * as actions  from '../../actions/auth'
import swal from 'sweetalert';

class Sidebar extends Component {

	constructor(props){
		super(props) ;

		this.state = {
            sidebar_width1 : "0px",
            sidebar_width2 : "0px",
            sidebar_width3 : "0px",
            isStudent: "",
            user_id: "",
            isLogged: "",
            isHidden: "",
            navTo: "",
            iclass: "",
            viewtext: ""
        }
        this.onClickSidebar1 = this.onClickSidebar1.bind(this);
        this.onClickSidebar2 = this.onClickSidebar2.bind(this);
        this.onClickSidebar3 = this.onClickSidebar3.bind(this);
	}

    componentDidMount(){
        if(localStorage.getItem("isStudent") === "on"){
            this.setState({
                isHidden: true,
                navTo: "http://localhost:3000/enroll",
                iclass: "fas fa-cart-plus",
                viewtext: "Enroll"
            })
        }
        else{
            this.setState({
                isHidden: false,
                
            })
        }
    }

	onChangeUsername(e){
		this.setState({
			username : e.target.value
		})
	}
	onChangePassword(e){
		this.setState({
			password : e.target.value
		})
	}

    onClickSidebar1(){
        //document.getElementById("mySidebar1").style.width = "250px";
            // closeNav3();
            // closeNav4();
            this.setState({
                sidebar_width1 : "350px",
                sidebar_width2 : "0px",
                sidebar_width3 : "0px"
            })   
    }

    onClickSidebar2(){
        //document.getElementById("mySidebar1").style.width = "250px";
            // closeNav3();
            // closeNav4();
        
            this.setState({
                sidebar_width1 : "0px",
                sidebar_width2 : "350px",
                sidebar_width3 : "0px"
            })   
    }

    onClickSidebar3(){
        //document.getElementById("mySidebar1").style.width = "250px";
            // closeNav3();
            // closeNav4();
            
            this.setState({
                sidebar_width3 : "350px",
                sidebar_width2 : "0px",
                sidebar_width1 : "0px"
            })   
    }

    onCloseSidebar1(){
        this.setState({
            sidebar_width1: "0px"
        })
    }

    onCloseSidebar2(){
        this.setState({
            sidebar_width2: "0px"
        })
    }

    onCloseSidebar3(){
        this.setState({
            sidebar_width3: "0px"
        })
    }

    render() {
        return (
            	<div>

                    <div className="wrapper">
                    
                        <nav id="sidebar">
                        <div id="div_logo_gold">
                            <img id="logo-gold" alt="" src="/assets/images/sjsu-logo-gold.png"/>
                        </div><br/>
                        <div id="content_div">
                            <ul className="list-unstyled components">
                                <li id="sidebarbutton">
                                    <a href="#" onClick={this.onClickSidebar1}>
                                        <div className="containerSideBar">
                                            <div className="inner_div"><img alt="" id="user_image_sidebar" src="/assets/images/user_image.png"/></div>
                                            <div className="text">Account</div>
                                        </div>
                                    </a>
                                </li>
                                <li id="sidebarbutton">
                                    <a href="http://localhost:3000/dashboard/d" className="active">
                                        <div className="containerSideBar">
                                            <div className="inner_div"><i className="fas fa-tachometer-alt"></i></div>
                                            <div className="text">Dashboard</div>
                                        </div>
                                    </a>
                                </li>
                                <li id="sidebarbutton">
                                    <a href="#" onClick={this.onClickSidebar2}>
                                        <div className="containerSideBar">
                                            <div className="inner_div"><i className="fas fa-book"></i></div>
                                            <div className="text">Courses</div>
                                        </div>
                                    </a>
                                </li>
                                <li id="sidebarbutton">
                                    <a href="http://localhost:3000/message">
                                        <div className="containerSideBar">
                                            {/* <div className="inner_div"><i class="fas fa-qrcode"></i></div>    */}
                                            <div className="inner_div"><i className="far fa-envelope"></i></div>
                                            <div className="text">Messages</div>
                                        </div>
                                    </a>   
                                </li>
                                <li id="sidebarbutton">
                                    <a href={this.state.navTo}>
                                        <div className="containerSideBar">
                                            {/* <div className="inner_div"><i class="fas fa-qrcode"></i></div>    */}
                                            <div className="inner_div"><i className={this.state.iclass}></i></div>
                                            <div className="text">{this.state.viewtext}</div>
                                        </div>
                                    </a>   
                                </li>
                            </ul>
                            </div>
                        </nav>
                        <div id="mySidebar1" className="sidebar" style={{width: this.state.sidebar_width1}}>
                            <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseSidebar1.bind(this)}>&times;</a>
                            <div className="containerSideBar">
                            <div className="sidebar-header">
                                
                                <div className="inner_image_div"><img alt="" id="user_image" src="/assets/images/user_image.png"/></div>
                                <button id="logout" className="btn btn-danger" type="submit" onClick={() => {localStorage.clear(); window.location.reload()}}>Log Out</button>
                                </div>
                                <div className="text">Account</div>
                            </div>
                            <div className = "sidebar-options">
                            <Link to="/profile" className="course-area" >Profile</Link>
                            <Link to="/files" className="course-area" >Files</Link>
                            </div>
                        </div>
                        <div id="mySidebar2" className="sidebar" style={{width: this.state.sidebar_width2}}>
                            <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseSidebar2.bind(this)}>&times;</a>

                            <div className="sidebar-content-area">
                                <div className="sidebar-header">
                                    <h5> Courses</h5>
                                </div>
                                <div className="sidebar-options">

                                    {
                                        this.props.course_list.map((course,index) => {
                                            return <div key={index} className="">


                                                <div className="course-area">
                                                <a className="course-area" href={`/course?course=${course.course_id}`}>CMPE {course.course_id} : {course.course_name}</a>
                                                    <br/>
                                                    <div className="term">
                                                        {course.course_term}
                                                    </div>
                                                </div>

                                            </div>








                                        })
                                    }



                                </div>
                            </div>



                        </div>



                        <div id="mySidebar3" className="sidebar" style={{width: this.state.sidebar_width3}}>
                            <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseSidebar3.bind(this)}>&times;</a>
                            <h3>Groups</h3>
                            <a href="#">all groups</a>
                        </div>
                    </div>
      			</div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user_id: state.auth.user_id,
        course_list: state.dashboard.course_list,
        isLogged: state.auth.isLogged,
        isStudent: state.auth.isStudent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout : () => dispatch(actions.logout()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);


