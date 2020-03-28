import React, { Component } from 'react';
import {connect} from 'react-redux';
import './sidebar.css';
import * as actions from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';

class Sidebar extends Component {

	constructor(props){
		super(props) ;

		this.state = {
            sidebar_width1 : "0px",
            sidebar_width2 : "0px",
            sidebar_width3 : "0px"	
        }
        this.onClickSidebar1 = this.onClickSidebar1.bind(this);
        this.onClickSidebar2 = this.onClickSidebar2.bind(this);
        this.onClickSidebar3 = this.onClickSidebar3.bind(this);
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
                sidebar_width1 : "250px",
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
                sidebar_width2 : "250px",
                sidebar_width3 : "0px"
            })   
    }

    onClickSidebar3(){
        //document.getElementById("mySidebar1").style.width = "250px";
            // closeNav3();
            // closeNav4();
            
            this.setState({
                sidebar_width3 : "250px",
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
                        <div>
                            <a><img id="logo-gold" src="/assets/images/sjsu-logo-gold.png"/></a>
                        </div>
                        <nav id="sidebar">
                            <ul className="list-unstyled components">
                                <li id="sidebarbutton">
                                    <a href="#" onClick={this.onClickSidebar1}>
                                        <div className="containerSideBar">
                                            <div className="inner_div"><img id="user_image" src="/assets/images/user_image.png"/></div>
                                            <div className="text">Account</div>
                                        </div>
                                    </a>
                                </li>
                                <li id="sidebarbutton">
                                    <a href="http://localhost:3000/dashboard" className="active">
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
                                    <a href="#" onClick={this.onClickSidebar3}>
                                        <div className="containerSideBar">
                                            <div className="inner_div"><i className="fas fa-user-friends"></i></div>                               
                                            <div className="text">Groups</div>
                                        </div>
                                    </a>   
                                </li>
                            </ul>
                        </nav>
                        <div id="mySidebar1" className="sidebar" style={{width: this.state.sidebar_width1}}>
                            <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseSidebar1.bind(this)}></a>
                            <div className="containerSideBar">
                                <div id="inner_image_div"><img id="user_image" src="/assets/images/user_image.png"/></div>
                                <div className="text">Account</div>
                            </div>
                            <a href="http://localhost:3000/profile">Profile</a>
                            <a href="#">Files</a>
                        </div>
                        <div id="mySidebar2" className="sidebar" style={{width: this.state.sidebar_width2}}>
                            <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseSidebar2.bind(this)}></a>
                            <h3> Courses</h3>
                            <a href="#">Course1</a>
                            <a href="#">Course2</a>
                            <a href="#">Course3</a>
                            <a href="#">Course4</a>
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

    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);


