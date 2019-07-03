// import {polyfill} from 'es6-promise';
// polyfill();
// import fetch from 'isomorphic-fetch';

// import data from './test.json'

export default function callApi({path='', method = 'get', body, query}) {

  let url = path;
  let data = {
    method,
    // headers: { 'content-type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': '*','mode': 'no-cors' },
    // body: JSON.stringify(body),
  };
  
  console.log("API action info : => API call is going for the path",path)
  // if(path == "https://arivohmreactjs.firebaseio.com/arivohmReactJs.json"){
  //   console.log(("api call to fetch app data"))
  // } else{
  //   console.log("api call to fetch lastupdate time")
  // }
  return fetch(url, data)
  .then(response => response.json().then(json => ({json, response})))
  .then(({json, response}) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    if(json[0])
      return json[0];

    return json;
  })
  .then(
    response => response,
    error => error
  );
  
}
