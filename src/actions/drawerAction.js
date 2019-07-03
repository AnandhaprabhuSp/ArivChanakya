export const showDrawer = (dispatch) => {
    return dispatch => {
        dispatch({type: "SHOW_DRAWER"})
    }
};

export const hideDrawer = (dispatch) => {
    return dispatch => {
        dispatch({type: "HIDE_DRAWER"})
    }
};