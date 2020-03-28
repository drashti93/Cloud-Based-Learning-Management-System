import swal from 'sweetalert';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import './takeQuiz.css';
import * as actions  from '../../actions/quiz';
import queryString from 'query-string';

class TakeQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            quiz_id: "",
            course_id: "",
            quiz_details: [],
            quizid_details: [],
            selectedAnswer: "",
            answeredQuestion: "",
            quiz_answers: [{
                question: "",
                answer: ""
            }]
        }

        
    }

componentDidMount() {
    console.log("Course DID MOUNT")
    let obj = queryString.parse(this.props.location.search)
    this.props.getQuizDetails(obj.quiz);
    sessionStorage.setItem("quiz_id", obj.quiz);
    sessionStorage.setItem("course_id", obj.course_id)
    this.setState({
        quiz_id: obj.quiz,
        course_id: obj.course_id,
        quiz_details: [],
        quizid_details: [],
        user_id: ""
    })
}

selectAnswer(q, a){

        let answeredQuestion = q;
        let selectedAnswer = a;
   
    this.state.quiz_answers.push({question: answeredQuestion, answer: selectedAnswer})
    
        
}

reload_screen() {
    setTimeout(function() {
        window.location.reload();
    }, 1000);
    
}


render() {
    console.log("Question"+this.state.answeredQuestion+" Answers"+this.state.selectedAnswer)
    return(
        <div>
            <Sidebar/>
            <div id="assignment_container" className="container">
                <div>
                    <h1 id="h1_assignment"> Take Quiz </h1>
                </div>
                <div>
                    {
                    this.props.quiz_details.map((question, index) => {
                        return  <div className = "form-row">
                                    <div className="form-group col-lg-12 form_assignment block">
                                        <label htmlFor="comment">Question 1</label><p id="points">Points:{question.points}</p>
                                        <p name="quiz_question" className="comment">{question.question}</p>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment block">
                                        <label htmlFor="comment" className="options">Option 1</label><input type="radio" className="isAnswer" name = {index} onChange={() => this.selectAnswer(question._id, "ans1")}></input>
                                        <p name="quiz_question" className="comment">{question.ans_1}</p>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment block">
                                        <label htmlFor="comment" className="options">Option 2</label><input type="radio" className="isAnswer" name = {index} onChange={() => this.selectAnswer(question._id, "ans2")}></input>
                                        <p name="quiz_question" className="comment">{question.ans_2}</p>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment block">
                                        <label htmlFor="comment" className="options">Option 3</label><input type="radio" className="isAnswer" name = {index} onChange={() => this.selectAnswer(question._id, "ans3")}></input>
                                        <p name="quiz_question" className="comment">{question.ans_3}</p>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment block">
                                        <label htmlFor="comment" className="options">Option 4</label><input type="radio" className="isAnswer" name = {index} onChange={() => this.selectAnswer(question._id, "ans4")}></input>
                                        <p name="quiz_question" className="comment">{question.ans_4}</p>
                                    </div>
                                </div>
                    })
                    }
                </div>
                <button className="btn btn-primary" onClick={() => {this.props.submitQuiz(this.props.user_id, this.state.quiz_answers, this.props.quizid_details.id, this.state.course_id); this.reload_screen()}}>Submit Quiz</button>
                
                
            </div>
        </div>
        
    );
}
}

function mapStateToProps(state){
    return{
       quiz_details: state.quiz.quiz_details,
       quizid_details: state.quiz.quizid_details,
       user_id: state.auth.user_id,
       course_list: state.dashboard.course_list
    };
}

function mapDispatchToProps(dispatch){
    return{
        getQuizDetails: (quiz_id) => dispatch(actions.getQuizDetails(quiz_id)),
        submitQuiz: (user_id, quiz_answers,id, course_id) => dispatch(actions.submitQuiz(user_id, quiz_answers, id, course_id))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TakeQuiz))

