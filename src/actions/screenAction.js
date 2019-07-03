
import RNFetchBlob from 'react-native-fetch-blob'

export const currentScreen = (category) => {
    // alert("coming here");
    return dispatch => {
        dispatch({type: "currentScreen",payLoad:category})
    }
};

export const showDetailScreen = (quesId) => {
    return dispatch => {
        dispatch({type: "showDetailScreen",payLoad:quesId})
    }
};

export const hideDetailScreen = () => {
    // alert("coming here");
    return dispatch => {
        dispatch({type: "hideDetailScreen"})
    }
};

export const launchHomePage = () => {
    // alert("coming here");
    return dispatch => {
        dispatch({type: "launchHomePage"})
    }
};

export const shareData = (data) =>{
    console.log("shareData method called")
    if(data.imgUrls && data.imgUrls.length > 0 &&  data.imgUrls[0].imgUrl){

        let URL =  data.imgUrls[0].imgUrl;
        return dispatch => {
            RNFetchBlob.fetch('GET', URL, {
                // more headers  ..
            })
            // when response status code is 200
            .then((res) => {
                // the conversion is done in native code
                let base64Str = res.base64()
                // console.log('base64Str',base64Str)
                let finalBase64 = `data:image/png;base64,${base64Str}`;
                // console.log("finalBase64",finalBase64)
                data["base64"] = finalBase64
                dispatch({type: "questionData",payLoad:data})
            })
            // Status code is not 200
            .catch((errorMessage, statusCode) => {
                // error handling
                data["base64"] = URL;
                dispatch({type: "questionData",payLoad:data})
            })
        }
       
    }
    else{
        return dispatch => {
        dispatch({type: "questionData",payLoad:data}) 
        }
    }



    // dispatch({type: "questionData",payLoad:data})
}
