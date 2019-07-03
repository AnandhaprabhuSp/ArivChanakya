import callApi from "../util/apiCaller";
import data from "../util/home.json"
import {AsyncStorage} from 'react-native'
export const getAppData = () => {
    console.log("API action info : => getAppData is called ");
    return dispatch => {
        // let url = "https://reactnative-arivohm.firebaseio.com/appdata.json";
        let url = 'https://chanakyamotivq.firebaseio.com/chanakyamotivq.json';
        return callApi({path: url }).then((response) => {
            console.log("API action info : => getAppdata api response", response)
            if (response == "TypeError: Network request failed") {
                console.log("API action info : => getAppdata api response error due to wifi login issue")
                let date = new Date().getDate().toString();
                AsyncStorage.setItem('@appData_remindMe',date);
                dispatch(staticDataFetch());
            } else {
                console.log("API action info : => getAppdata api success and fetched the data")
                AsyncStorage.setItem('@appData_LUD', response.lastUpdate.dateTime.toString());
                AsyncStorage.setItem('@appData', JSON.stringify(response));
                AsyncStorage.removeItem("@appData_CUD");
                AsyncStorage.setItem('@appData_showPopup',"false");
                AsyncStorage.setItem('@appData_dontRemind',"false");
                AsyncStorage.setItem('@appData_remindMe',"false");
                AsyncStorage.setItem('@appData_showUpdatedToast',"true");
                dispatch({type: "dataFetch_Success", payload: response})
                dispatch({type: "lastUpdateTime", payload: response.lastUpdate})
            }
        }).catch((error) => {
            let date = new Date().getDate().toString();
            AsyncStorage.setItem('@appData_remindMe',date);
            console.log("API action info : => getAppdata api response error")
            dispatch(staticDataFetch());
        });
    }
};
export const getAppDataStatus = () => {
    console.log("API action info : => getAppDataStatus called");
    let LastUpdateTime = store.getState().appView.lastUpdatedTime;
    console.log("API action info : => LastUpdateTime",LastUpdateTime)
    // if ('dateTime' in LastUpdateTime) {
        console.log("API action info : => lastUpdateTime data is present already",LastUpdateTime)
        return dispatch => {
            console.log("API action info : => lastUpdateTime api is called");
            // let url = 'https://reactnative-arivohm.firebaseio.com/lastUpdateTime.json'
            let url = 'https://chanakyamotivq.firebaseio.com/lastUpdate.json';
            return callApi({path: url}).then((response) => {
                console.log("API action info : => lastUpdateTime response received",response)
                if (response == "TypeError: Network request failed") {
                    // dispatch({type: "dataFetch_Success", payload: data})
                    console.log("API action info : => lastUpdateTime response cannot able to fetch due to wifi login issue",response)
                    // dispatch(getAppData());
                } else if (response.dateTime && response.dateTime > LastUpdateTime.dateTime) {
                            console.log("API action info : => lastUpdateTime has been upgraded in server side")
                            // dispatch(getAppData());
                            AsyncStorage.setItem('@appData_CUD', response.dateTime.toString());
                            AsyncStorage.setItem('@appData_showPopup',"true").then(function (result, error) { 
                                dispatch({type: "lastUpdateTime", payload: response})
                            })
                }
            }).catch((error) => {
                // dispatch({type: "dataFetch_Failure", payload: error})
                // dispatch({type: "dataFetch_Success", payload: data})
                console.log("API action info : => lastUpdateTime api error")
                // dispatch(getAppData());
            });
        }
    // }
    // else{
    //     console.log("API action info : => lastUpdateTime data is not there")
    //     return dispatch => {
    //         dispatch(getAppData());
    //     }
    // }
    
};
export const persistStoreAction = () => {}

export const staticDataFetch = () => {
    console.log("API action info : => staticDataFetch called since internet is not there");
    return dispatch => { 
            AsyncStorage.getItem('@appData').then(function (result, error) {
                    // console.log("Response of the asyncstorage", result)
                    console.log("Error of the asyncstorage", error)
                    if (result) {
                        let appdata = JSON.parse(result)
                        console.log("Dispatching the response of asyncstorage to store", appdata)
                        dispatch({type: "dataFetch_Success", payload: appdata})
                    } else {
                        console.log("Response of aysnc storage is not there dispatching static data from json");
                        AsyncStorage.setItem('@appData',JSON.stringify(data));
                        dispatch({type: "dataFetch_Success", payload: data})
                    }
                });
    }
}

export const USER = {
    SELECTED: 'USER_SELECTED',
    FAILED: 'USER_SELECTED_FAILED'
}