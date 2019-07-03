export default function (state = {
    title:"",
    showDetailScreen:false,
    questionId : "",
    zoomPageActive:false,
    questionData:null,
    catgeoryClickBool:true,
}, action) {
    switch (action.type) {
        case 'currentScreen':
            return {
                ...state,title:action.payLoad,showDetailScreen:false,catgeoryClickBool:!state.catgeoryClickBool
            };
            break;
        case 'dataFetch_Success':
            return {
                ...state,title:action.payload.appData.categories[0].title,catgeoryClickBool:!state.catgeoryClickBool
            };
            break;
        case 'showDetailScreen':
            return {
                ...state,showDetailScreen:true,questionId:action.payLoad
            };
            break;
        case 'hideDetailScreen':
            return {
                ...state,showDetailScreen:false,questionId : ""
            };
            break;
        case 'toggleZoomPageActive':
            return {
                ...state,zoomPageActive:!state.zoomPageActive
            };
            break;
        case 'persist/REHYDRATE':
            return {
                ...state,title: action.payload && action.payload.appView && action.payload.appView.mainData &&  action.payload.appView.mainData.appData ? 
                action.payload.appView.mainData.appData.categories[0].title :"",showDetailScreen:false,questionId : "",zoomPageActive:false,
                catgeoryClickBool:true
            };
        case 'questionData':
            return{
                ...state,questionData:action.payLoad
            }
            break;
    }
    return state;
}
