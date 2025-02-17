// slices/index.js
import { combineReducers } from 'redux';
import DocumentTypes  from './DucumentTypes';
import Login from './autthentication/login';
import siginUp from './autthentication/siginUp';
import Loader from './loader';

const rootReducer = combineReducers({
    documentTypes: DocumentTypes,
    login: Login,
    signUp: siginUp,
    loader: Loader,
});

export default rootReducer;