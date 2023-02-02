'use strict'

// Assume data is sent and responses come back as JSON
// Both are wrappers for built-in async function fetch
// Checks response.status (using response.ok) 

// send a get request
async function sendGetRequest(url) {
  let params = {
    method: 'GET', 
     };

  console.log("about to send GET request");
  console.log(params);
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw Error(response.status);
  }

  console.log("received response");
}

// send a POST request
async function sendPostRequest(url,data) {
  let params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) };
  
  console.log("about to send POST request");
  console.log(params);

  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.json();
		return data;
  } else {
    throw Error(response.status);
  }
  console.log("received response");
}

export {sendGetRequest, sendPostRequest};