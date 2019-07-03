/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = {
    mainData: {},
    lastUpdatedTime:{},
    NetworkError:false,
    updateFound:false
}, action) {
    switch (action.type) {
        case 'dataFetch_Success':
            return {
                ...state,
                mainData: action.payload
            };
            break;
        case 'dataFetch_Failure':
            return {
                ...state,
                NetworkError: action.payload
            };
            break;
        case 'lastUpdateTime':
            return {
                ...state,
                lastUpdatedTime : action.payload
            }
            break;
        case 'updateFound':
            return {
                ...state,
                updateFound : true
            }
        case 'persist/REHYDRATE':
            return {
                ...state,
                // state:action.payload
                mainData : action.payload && action.payload.appView  ? action.payload.appView.mainData : {},
                lastUpdatedTime : action.payload &&  action.payload.appView ? action.payload.appView.lastUpdatedTime : {},
                updateFound :  action.payload && action.payload.appView ? action.payload.appView.updateFound : false
            }
            break;
    }
    return state;
}
