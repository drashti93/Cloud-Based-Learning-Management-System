import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "GET_PROFILE" : {
			//console.log("Payload " + action.payload.status + action.payload.data.user_id)
            if(action.payload.status===200)
			{
                console.log("reducer fired")
                return {...state,
                            name:action.payload.data.user_profile.name,
                            email:action.payload.data.user_profile.email,
                            about_me:action.payload.data.user_profile.about_me,
                            profile_img:action.payload.data.user_profile.profile_img,
                            phone_number:action.payload.data.user_profile.phone_number,
                            city: action.payload.data.user_profile.city,
                            country: action.payload.data.user_profile.country,
                            company: action.payload.data.user_profile.company,
                            school: action.payload.data.user_profile.school,
                            hometown: action.payload.data.user_profile.hometown,
                            languages: action.payload.data.user_profile.languages,
                            gender: action.payload.data.user_profile.gender,
                            isStudent: action.payload.data.user_profile.isStudent
                       };
			}
			else
			{
				console.log('REDUCER ISVALID ' + action.payload);
				return {...state,isLogged:false};	
			}	
			
		}
                    
        default :
            return state;
    }
};

export default reducer;
