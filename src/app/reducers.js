import {combineReducers} from 'redux';
import configReducer from './../config/configReducer';
import errorReducer from './../error/errorReducer';
import authReducer from './../auth/authReducer';
import schemaReducer from './../schema/schemaReducer';
import tableReducer from './../table/tableReducer';

export default combineReducers({
  configReducer,
  errorReducer,
  authReducer,
  schemaReducer,
  tableReducer
});