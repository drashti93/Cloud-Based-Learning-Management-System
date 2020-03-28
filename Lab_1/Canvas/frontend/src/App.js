import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import {withRouter} from 'react-router-dom';
import Signin from './components/auth/signin.js';
import Signup from './components/auth/signup.js';
import Dashboard from './components/dashboard/dashboard.js';
import Profile from './components/profile/profile.js';
import Sidebar from './components/sidebar/sidebar.js';
import CourseContent  from './components/dashboard/courseContent/courseContent';
import Assignment from './components/assignment/assignment.js';
import AddAssignment from './components/assignment/addAssignment.js';
import AddCourse from './components/course/addCourse.js';
import Enroll from './components/enrollment/enroll.js'
import * as actions from './actions/auth';


import {BrowserRouter} from "react-router-dom";

class App extends Component {

    constructor(props){
		super(props) ;

		this.state = {
            isLogged: '',
            isStudent: ''
		}
	}

    componentDidMount(){
        this.props.checkSession();
    }

    componentDidUpdate(prevProps) {
        
    }

    

    render() {
        const isLogged = this.props.isLogged;
        console.log(isLogged)
        return (
            <div >
                {
                    isLogged === undefined ? (
                        <div className="text-center"><h1>Loading...</h1></div>
                    ) : (
                        <BrowserRouter>
                            <Switch>
                            
                            <Route exact path='/' render={() => (
                                isLogged ? (
                                <Redirect to="/dashboard/d"/>
                                ) : (
                                <Signin/>
                                )
                            )}/>
                            
                            <Route exact path = '/signup' render={() => (
                               isLogged ? (
                                <Redirect to="/dashboard/d"/>
                                ) : (
                                <Signup/>
                                )
                            )}/>
                            <Route exact path='/signin' render={() => (
                                isLogged ? (
                                <Redirect to="/dashboard/d"/>
                                ) : (
                                <Signin/>
                                )
                            )}/>
                           

                            <Route path='/dashboard/d' render={() => (
                                !isLogged ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <Dashboard {...this.props}/>
                                )
                            )}/>

                            <Route path='/course' render={() => (
                                !isLogged ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <CourseContent {...this.props} />
                                )
                            )}/>

                            <Route exact path='/profile' render={() => (
                                isLogged ? (
                                   <Profile />
                                ) : (
                                    <Redirect to="/" />
                                )
                            )}/>

                            <Route exact path='/addAssignment' render={() => (
                                !isLogged ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <AddAssignment/>
                                )
                            )}/>
                            <Route exact path='/addCourse' render={() => (
                                !isLogged ? (
                                <Redirect to="/"/>
                                ) : (
                                <AddCourse/>
                                )
                            )}/>
                            <Route exact path='/enroll' render={() => (
                                !isLogged ? (
                                <Redirect to="/"/>
                                ) : (
                                <Enroll/>
                                )
                            )}/>
                            </Switch>
                        </BrowserRouter>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogged:state.auth.isLogged,
        user_id:state.auth.user_id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkSession: () => dispatch(actions.checkSession())
    };
}

export default connect(mapStateToProps , mapDispatchToProps )(props => <App {...props}/>);
