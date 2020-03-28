import React, { Component } from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar/sidebar'
import './message.css'
import * as actions  from '../../actions/message'
import * as people_actions  from '../../actions/people'

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            show: false,
            people: [],
            selectedReceiver: "Send To",
            selectedReceiverId: "",
            message: "",
            modalMessage: ""
        }
        this.changeReceiver = this.changeReceiver.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        console.log("Course DID MOUNT")
        this.props.getAllMessages(this.props.user_id);
        this.props.getAllPeople();
    }

    componentWillReceiveProps(newProps) {    
        console.log('Component WILL RECIEVE PROPS!')
        console.log(newProps)
        this.setState({
            messages: newProps.all_messages,
            people: newProps.all_people
        })
    }

    changeReceiver(name, id){
        {this.setState({selectedReceiver: name, selectedReceiverId: id})}
    }

    handleChange(event) {
        this.setState({message_body: event.target.value});
      }

    callModal(mess){
        console.log(mess);
        this.setState({modalMessage: mess});
    }
    render() {
        
        return (
            <div>
            <div class="col-sm-3 col-md-3 col-lg-3">
            <Sidebar/>
            </div>
            <div className="col-sm-9 col-md-9 col-lg-9">
                <div>
                    <button className="btn btn-primary" id="compose_button" data-toggle="modal" data-target="#exampleModal">Compose</button>
                </div>
                <div className = "container message_container" >
                    {this.props.all_messages.map(message => {
                    return(
                    <div className="message_details row" onClick={() => this.callModal(message.message)} data-toggle="modal" data-target="#exampleModalCenter">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            From: {message.fromName} <br/>
                            To: {message.toName}
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6" id="message_text">
                            <p>Message: {message.message}</p>
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Message</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    {this.state.modalMessage}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            Time: {message.timeStamp}
                        </div>
                        
                    </div>
                    )})}
                </div>
            </div>
            
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New Message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.selectedReceiver}
                    <span class="caret"></span></button>
                    <ul class="dropdown-menu">
                        <input class="form-control" id="myInput" type="text" placeholder="Search.."/>
                        {this.state.people.map(person => {
                            return(
                            <li onClick={() => this.changeReceiver(person.name, person.user_id)}>{person.name}</li>
                        )})}
                    </ul>
                </div>
                    <label>Message: </label>
                    <form><textarea class="form-control" id="message-text" onChange={this.handleChange}></textarea></form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={() => this.props.sendMessages(this.props.user_id, this.state.selectedReceiverId, this.state.message_body)}>Send</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        );
        
    }

}

function mapStateToProps(state) {
    
    return {
        user_id: state.auth.user_id,
        all_messages: state.message.all_messages,
        all_people: state.people.all_people,
        course_list: state.dashboard.course_list
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        getAllMessages : (user_id) => dispatch(actions.getAllMessages(user_id)),
        getAllPeople: () => dispatch(people_actions.getAllPeople()),
        sendMessages: (sender_user_id, receiver_user_id, message_body) => dispatch(actions.sendMessage(sender_user_id,receiver_user_id, message_body))
       };
}
export default connect(mapStateToProps,mapDispatchToProps)(Message);