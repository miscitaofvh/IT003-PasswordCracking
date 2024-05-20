// Retrieve the data stored in session storage and parse it as JSON
const data = JSON.parse(sessionStorage.getItem('data'));

// Display an alert with the cracked password
alert("Password is " + data.password);
