import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "GET_PROFILE" : {
			//console.log("Payload " + action.payload.status + action.payload.data.user_id)
            if(action.payload.status===200)
			{
                console.log("reducer fired")
                return {...state,
                            name:action.payload.data.name,
                            email:action.payload.data.email,
                            about_me:action.payload.data.about_me,
                            profile_img:action.payload.data.profile_img,
                            phone_number:action.payload.data.phone_number,
                            city: action.payload.data.city,
                            country: action.payload.data.country,
                            company: action.payload.data.company,
                            school: action.payload.data.school,
                            hometown: action.payload.data.hometown,
                            languages: action.payload.data.languages,
                            gender: action.payload.data.gender,
                            isStudent: action.payload.data.isStudent
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
