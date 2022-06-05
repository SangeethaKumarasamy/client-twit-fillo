import { combineReducers } from 'redux'
import ErrorReducer from './ErrorReducer'
import AuthReducer from './AuthReducer'
import PostReducer from './PostReducer'
import ProfileReducer from './ProfileReducer'


export default combineReducers({
	errors: ErrorReducer,
	auth: AuthReducer,
	post: PostReducer,
	profile: ProfileReducer
})