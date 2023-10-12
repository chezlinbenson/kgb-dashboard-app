

const AuthReducer = (state, action) => { 
    switch (action.type){ 
        case "LOGIN": { 
            localStorage.setItem("user", action.payload)
            console.log("I'm Right Here")
            console.log(action.payload)
            return { 
                currentUser: action.payload,
            };
        }
        case "LOGOUT": { 
            return { 
                currentUser: null,
            };
        }
        default: 
        return state;
    }
 }

 export default AuthReducer;