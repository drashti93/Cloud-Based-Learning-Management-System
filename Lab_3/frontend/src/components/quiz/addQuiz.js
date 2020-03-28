import swal from 'sweetalert';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import './addQuiz.css';
import * as actions  from '../../actions/quiz';
import queryString from 'query-string';

class AddQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            objectToSave: [{question: "", answers: {answer1: "", answer2: "", answer3: "", answer4: ""}}],
            finalObject: [],
            question: "test",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            counter: 0,
            newQuestion: "",
            quizName: "",
            quizDate: "",
            quizInstructions: "",
            quizId: "",
            isRight: "",
            course_id: ""
        }

        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.updateAnswers1 = this.updateAnswers1.bind(this);
        this.updateAnswers2 = this.updateAnswers2.bind(this);
        this.updateAnswers3 = this.updateAnswers3.bind(this);
        this.updateAnswers4 = this.updateAnswers4.bind(this);
        this.pushQuestionAnswers = this.pushQuestionAnswers.bind(this);
        this.updateQuizName = this.updateQuizName.bind(this);
        this.updateQuizDate = this.updateQuizDate.bind(this);
        this.updateQuizInstructions = this.updateQuizInstructions.bind(this)
        this.updateQuizId = this.updateQuizId.bind(this)
    }

componentDidMount() {
    console.log("Course DID MOUNT")
    let obj = queryString.parse(this.props.location.search)
    sessionStorage.setItem("course_id", obj.course);
    this.setState({
        course_id: obj.course
    })
}

addChild(){
  
    let tempArray = this.state.questions;
    tempArray.push([])

    this.setState({
        questions : tempArray 
    })
    
}

removeChild(i){
    this.state.questions.pop(i);
}

updateQuestion(e){
    this.setState({
        newQuestion: e.target.value
    })
}

updateAnswers1(e){
    this.setState({
        answer1: e.target.value
    })
}

updateAnswers2(e){
    this.setState({
        answer2: e.target.value
    })
}

updateAnswers3(e){
    this.setState({
        answer3: e.target.value
    })
}

updateAnswers4(e){
    this.setState({
        answer4: e.target.value
    })
}

updateQuizName(e){
    this.setState({
        quizName: e.target.value
    })
}

updateQuizDate(e){
    this.setState({
        quizDate: e.target.value
    })
}

updateQuizInstructions(e){
    this.setState({
        quizInstructions: e.target.value
    })
}

updateQuizId(e){
    this.setState({
        quizId: e.target.value
    })
}

reload_screen() {
    setTimeout(function() {
        window.location.reload();
    }, 1000);
    
}

pushQuestionAnswers(){
    if(this.state.newQuestion != ""){
        let objectToSave =  [{
                                question: this.state.newQuestion, 
                                answers: 
                                {
                                    answer1: this.state.answer1, 
                                    answer2: this.state.answer2, 
                                    answer3: this.state.answer3, 
                                    answer4: this.state.answer4
                                },
                                isRight: this.state.isRight
                            }]
    
        this.state.finalObject.push(objectToSave)
    }
}


render() {
    return(
        <div>
            <Sidebar/>
            <div id="assignment_container" className="container">
                <div>
                    <h1 id="h1_assignment"> Add Quiz </h1>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4 form_assignment">
                        <label htmlFor="quiz_id">Quiz ID</label>
                        <input type="number" className="form-control " id="quiz_id" placeholder="Unique Quiz ID" onChange={this.updateQuizId}/>
                    </div>
                    <div className="form-group col-md-4 form_assignment">
                        <label htmlFor="quiz_title">Quiz Title</label>
                        <input type="text" className="form-control " name="quiz_title" id="quiz_title" placeholder="Quiz Name" onChange={this.updateQuizName}/>
                    </div>
                    <div className="form-group col-md-4 form_assignment">
                        <label htmlFor="due_date">Due Date</label>
                        <input type="date" className="form-control " id="due_date" placeholder="Due Date" onChange={this.updateQuizDate}/>
                    </div>
                </div>
                <div className = "form-row">
                    <div className="form-group col-lg-12 form_assignment">
                        <label htmlFor="comment">Quiz Instructions</label>
                        <textarea className="form-control " rows="5" name="quiz_instructions" id="comment" placeholder="Quiz Instructions" onChange={this.updateQuizInstructions}/>
                    </div>
                </div>
                
                <div>
                    {
                    this.state.questions.map((question, index) => {
                        return  <div className = "form-row">
                                    <div className="form-group col-lg-12 form_assignment">
                                        <label htmlFor="comment">Question {index+1}</label><i class="far fa-trash-alt" onClick={() => this.removeChild({index})}></i>
                                        <textarea className="form-control quiz_question" rows="1" name="quiz_question" id="comment" placeholder="Question" onChange={this.updateQuestion}/>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment">
                                        <label htmlFor="comment" className="options">Option 1</label><p className="pCorrect">Correct?</p><input type="radio" className="isAnswer" name = "answer" onChange={() => this.setState({isRight: "ans1"})}></input>
                                        <textarea className="form-control quiz_answer" rows="1" name="quiz_question" id="comment" placeholder="Option 1" onChange={this.updateAnswers1}/>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment">
                                        <label htmlFor="comment" className="options">Option 2</label><p className="pCorrect">Correct?</p><input type="radio" className="isAnswer" name = "answer" onChange={() => this.setState({isRight: "ans2"})}></input>
                                        <textarea className="form-control quiz_answer" rows="1" name="quiz_question" id="comment" placeholder="Option 2" onChange={this.updateAnswers2}/>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment">
                                        <label htmlFor="comment" className="options">Option 3</label><p className="pCorrect">Correct?</p><input type="radio" className="isAnswer" name = "answer" onChange={() => this.setState({isRight: "ans3"})}></input>
                                        <textarea className="form-control quiz_answer" rows="1" name="quiz_question" id="comment" placeholder="Option 3" onChange={this.updateAnswers3}/>
                                    </div>
                                    <div className="form-group col-lg-6 form_assignment">
                                        <label htmlFor="comment" className="options">Option 4</label><p className="pCorrect" >Correct?</p><input type="radio" className="isAnswer" name = "answer" onChange={() => this.setState({isRight: "ans4"})}></input>
                                        <textarea className="form-control quiz_answer" rows="1" name="quiz_question" id="comment" placeholder="Option 4" onChange={this.updateAnswers4}/><br/>
                                    </div>
                                </div>
                    })
                    }
                </div>
                <button className="btn btn-primary" onClick={() => {this.addChild(); this.pushQuestionAnswers()}}>Add Question</button><br/><br/>
                <button className="btn btn-primary" onClick={() => {this.pushQuestionAnswers(); this.props.saveQuiz(this.state.finalObject, this.state.quizId, this.state.quizName, this.state.quizInstructions, this.state.quizDate, this.state.course_id); this.reload_screen()}}>Save Quiz</button>
                
                
            </div>
        </div>
        
    );
}
}

function mapStateToProps(state){
    return{
        course_list: state.dashboard.course_list
    };
}

function mapDispatchToProps(dispatch){
    return{
        saveQuiz: (finalObject, id, name, instructions, date, course_id) => dispatch(actions.saveQuiz(finalObject, id, name, instructions, date, course_id))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddQuiz))

