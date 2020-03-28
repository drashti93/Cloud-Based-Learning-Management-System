import React, { Component } from 'react';
import {connect} from 'react-redux';
import './profile.css';
import * as actions from '../../actions/profile';
import Sidebar from '../sidebar/sidebar'


class Profile extends Component {

	
    
    constructor(props){
		super(props) ;

		this.state = {
            isDisabled: true,
            user_id: "",
            email: "",
            phone_number: "",
            about_me: "",
            city: "",
            country: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            gender: ""
        }
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeAboutMe = this.onChangeAboutMe.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeHometown = this.onChangeHometown.bind(this);
	}


     componentDidMount() {
        console.log('Component DID MOUNT!');
        this.props.getProfile(this.props.user_id);

     }
     
     componentWillReceiveProps(newProps) {
        console.log('Will Receive Props ' , newProps)
        
        this.setState({
            email: newProps.email,
            name: newProps.name,
            phone_number: newProps.phone_number,
            about_me: newProps.about_me,
            city: newProps.city,
            company: newProps.company,
            school: newProps.school,
            country: newProps.country,
            hometown: newProps.hometown,
            languages: newProps.languages,
            gender: newProps.gender
		})
		//   if(newProps.isLogged){
		// 	console.log('Pushing to the page ')
		// 	newProps.history.push('/home');
		//   }
	}

    editProfile(e){
        this.setState({
            isDisabled: e.target.value
        })
    }
    
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
        
    }

    onChangePhoneNumber(e){
        this.setState({
            phone_number: e.target.value
        })
        
    }

    onChangeAboutMe(e){
        this.setState({
            about_me: e.target.value
        })
    }

    onChangeCity(e){
        this.setState({
            city: e.target.value
        })
    }

    onChangeCountry(e){
        this.setState({
            country: e.target.value
        })
    }

    onChangeCompany(e){
        this.setState({
            company: e.target.value
        })
    }

    onChangeSchool(e){
        this.setState({
            school: e.target.value
        })
    }

    onChangeLanguage(e){
        this.setState({
            languages: e.target.value
        })
    }

    onChangeGender(e){
        this.setState({
            gender: e.target.value
        })
    }

    onChangeHometown(e){
        this.setState({
            hometown: e.target.value
        })
        console.log(e.target.value);
    }

    render() {
        return (
            	<div>
                        <Sidebar/>
                        <div className="container profile_container">
                            <div className="picture_div">
                                <a><img id="user_image" alt="" src="/assets/images/user_image.png"/></a>
                                <p className="profile_p">{this.state.name}</p>
                                <button className="btn btn-primary" id="edit_button" onClick={this.editProfile.bind(this)} >Edit</button>
                            </div>
                        <div className="container form_container">
                            <form className="edit_form form-group">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div>
                                        <label htmlFor="name" className="col-form-label">Name :</label>
                                        <input className="input_form form-control" type="text" placeholder="Name" name="name" defaultValue={this.state.name} disabled={true} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="col-form-label">Email :</label>
                                        <input className="input_form form-control" type="email" name="email" placeholder="Email" value={this.state.email} disabled= {this.state.isDisabled} onChange={this.onChangeEmail}/>
                                    </div>
                                    <div>
                                        <label htmlFor="about_me" className="col-form-label">About Me :</label>
                                        <input className="input_form form-control" type="text" name="about_me" placeholder="About Me" value={this.state.about_me} disabled={this.state.isDisabled} onChange={this.onChangeAboutMe}/>
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="col-form-label">Country :</label>
                                        <input className="input_form form-control" type="text" name="country" placeholder="Country" value={this.state.country} disabled={this.state.isDisabled} onChange={this.onChangeCountry}/>
                                    </div>
                                    <div>
                                        <label htmlFor="school" className="col-form-label">School :</label>
                                        <input className="input_form form-control" type="text" name="school" placeholder="School" value={this.state.school} disabled={this.state.isDisabled} onChange={this.onChangeSchool}/>
                                    </div>
                                    <div>
                                        <label htmlFor="hometown" className="col-form-label">Hometown :</label>
                                        <input className="input_form form-control" type="text" name="hometown" placeholder="Hometown" value={this.state.hometown} disabled={this.state.isDisabled} onChange={this.onChangeHometown}/><br/>
                                
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div>
                                        <label htmlFor="sjsuid" className="col-form-label">SJSU ID :</label>
                                        <input id="sjsuid" className="input_form form-control" type="number" placeholder="SJSU ID" name="user_id" defaultValue={this.props.user_id} disabled={true}/>
                                    
                                    </div>
                                    <div>
                                        <label htmlFor="number" className="col-form-label">Phone Number :</label>
                                        <input className="input_form form-control" type="number" name="phone_number" placeholder="Contact" value={this.state.phone_number} disabled={this.state.isDisabled} onChange={this.onChangePhoneNumber}/>
                                    
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="col-form-label">City :</label>
                                        <input className="input_form form-control" type="text" name="city" placeholder="City" value={this.state.city} disabled={this.state.isDisabled} onChange={this.onChangeCity}/>
                                    
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="col-form-label">Company :</label>
                                        <input className="input_form form-control" type="text" name="company" placeholder="Company" value={this.state.company} disabled={this.state.isDisabled} onChange={this.onChangeCompany}/>
                                     
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="col-form-label">Gender :</label>
                                        <input className="input_form form-control" type="text" name="gender" placeholder="Gender" value={this.state.gender} disabled={this.state.isDisabled} onChange={this.onChangeGender}/>
                                      
                                    </div>
                                    <div>
                                        <label htmlFor="languages" className="col-form-label">Languages :</label>
                                        <input className="input_form form-control" type="text" name="languages" placeholder="Languages" value={this.state.languages} disabled={this.state.isDisabled} onChange={this.onChangeLanguage}/>
                                    </div>
                                    
                                </div>
                                <input className="btn btn-success" id="save_button" type="button" value="Save" disabled={this.state.isDisabled} onClick={() =>this.props.setProfile(this.props.user_id, this.state.email, this.state.phone_number, this.state.about_me, this.state.city, this.state.company, this.state.school, this.state.country, this.state.hometown, this.state.languages, this.state.gender)}/>
                            </div>
                            </form>
                            </div>
                         </div>
      			</div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        user_id: state.auth.user_id,
        name: state.profile.name,
        email: state.profile.email,
        phone_number: state.profile.phone_number,
        about_me: state.profile.about_me,
        city: state.profile.city,
        company: state.profile.company,
        school: state.profile.school,
        country: state.profile.country,
        hometown: state.profile.hometown,
        languages: state.profile.languages,
        gender: state.profile.gender 

    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        getProfile : (user_id) => dispatch(actions.getProfile(user_id)),
        setProfile : (user_id, email, phone_number, about_me, city, company, school, country, hometown, languages, gender) => dispatch(actions.setProfile(user_id, email, phone_number, about_me, city, company, school, country, hometown, languages, gender))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);


