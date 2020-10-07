import { combineReducers } from 'redux'
import articleReducer from './articleReducers';
import categoryReducers from './categoryReducers';
import userReducer from './usersReducers';

export default combineReducers({
    user: userReducer,
    article: articleReducer,
    category: categoryReducers
})