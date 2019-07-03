export default function (state = {
    drawerActive:false
}, action) {
    switch (action.type) {
        case 'SHOW_DRAWER':
            return {
                ...state,drawerActive:true
            };
            break;
        case 'HIDE_DRAWER':
            return {
                ...state,drawerActive:false
            };
            break;
        // case 'persist/REHYDRATE' :
        // return{
        //     ...state,state: action.paylaod
        // }
    }
    return state;
}
