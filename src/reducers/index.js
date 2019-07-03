import {combineReducers} from 'redux';
import screenReducer from './screenReducer';
import appView from './appViewReducer';
import drawerReducer from './drawerReducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    currentCategory: screenReducer,
    appView: appView,
    drawer:drawerReducer
});

export default allReducers
