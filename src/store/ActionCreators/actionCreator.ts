// AuthSlice 
const SET_ID = "auth/setID";
const ADD_ROLE = "auth/addRole";
const AUTHENTICATE = "auth/authenticate";
const RESET_AUTH_INFO = "auth/resetAuthInfo";

// Action creators
export const setIDAction = (id: string): { type: string; payload: string } => {
    return { type: SET_ID, payload: id };
  };
  
  export const addRoleAction = (role: string): { type: string; payload: string } => {
    return { type: ADD_ROLE, payload: role };
  };
  
  export const authenticateAction = (): { type: string } => {
    return { type: AUTHENTICATE };
  };
  
  export const resetAuthInfoAction = (): { type: string } => {
    return { type: RESET_AUTH_INFO };
  };
  
  export const AuthActionTypes = {
    SET_ID,
    ADD_ROLE,
    AUTHENTICATE,
    RESET_AUTH_INFO,
  };
 
  
  
  
  
  