import { combineReducers } from 'redux'; //cuando no usas inmutable
//import { combineReducers } from "redux-immutable"; //cuando usas immutable
import dataReducer from '../slices/dataSlice';
import uiReducer from '../slices/uiSlice';


const rootReducer = combineReducers({
    data: dataReducer,
    ui: uiReducer
});

export default rootReducer;