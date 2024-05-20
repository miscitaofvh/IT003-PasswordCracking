// Add 'js' class to the html element to enable JavaScript-specific styling
document.querySelector("html").classList.add('js');

// Get references to DOM elements
var fileInput  = document.querySelector(".input-file"),  
    button     = document.querySelector(".input-file-trigger"),
    the_return = document.querySelector(".file-return"), 
    crackButton = document.querySelector(".crack-button");

// Add event listener to the button for keydown events
button.addEventListener("keydown", function(event) {  
    if (event.keyCode == 13 || event.keyCode == 32) {  
        // Focus the file input when Enter or Space is pressed
        fileInput.focus();  
    }  
});

// Add event listener to the button for click events
button.addEventListener("click", function(event) {
    // Focus the file input when the button is clicked
    fileInput.focus();
    return false;
});  

// Add event listener to the file input for change events
fileInput.addEventListener("change", function(event) {  
    // Get the selected file path
    var filePath = this.value;
    // Extract and display the file name
    var fileName = filePath.substring(12);
    the_return.innerHTML = fileName;
});  

// Add event listener to the crack button for click events
crackButton.addEventListener("click", function(event) {
    // Create a FormData object to hold the file
    var formData = new FormData();
    var file = fileInput.files[0];
    formData.append('file', file);

    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request for password cracking
    xhr.open("POST", 'http://127.0.0.1:5000/crack', true);
    xhr.onload = function () {
        // Parse the response from the server
        var response = JSON.parse(xhr.responseText);
        if (response.hasOwnProperty('message')) {
            // Display a message if provided in the response
            alert(response.message);
        }
        if (response.hasOwnProperty('password')) {
            // Store the cracked password in session storage
            const data = {"password": response.password};
            sessionStorage.setItem('data', JSON.stringify(data));

            // Add the cracked password to the FormData
            formData.append("password", response.password);
            var _xhr = new XMLHttpRequest();

            // Configure the request for removing the password from the zip file
            _xhr.open("POST", 'http://127.0.0.1:5000/removePassword');
            _xhr.onload = function () {
                // Redirect to the download page after removing the password
                window.location.href = "download.html";
            };

            // Send the request to remove the password
            _xhr.send(formData);
        }
    };
    
    // Send the request to crack the password
    xhr.send(formData);
});
