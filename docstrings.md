# Docstrings for IT003-PasswordCracking

## index.html

**`</div class="container">`**
- Main container for the cracking tool

**`</form action="#" method="post" ...>`**
- Form for uploading the zip file and triggering the password crack

**`</input class="input-file" id="my-file" type="file`">**`
- Input field for selecting the file
  
**`</label for="my-file" class="input-file-trigger">`**
- Button to initiate the cracking process
  
**`</button class="crack-button" type="button">`**
- Button to initiate the cracking process

---

## styles.css

**`body{}`**
- Body styling
  
**`.container{}`**
- Main container styling

**`.input-file-container{}`**
- Input file container styling

**`.output-file-container{}`**
- Output file container styling

**`.js .input-file-trigger{}`**
- Styling for file input trigger button when Javascript is enabled

**`.js .input-file{}`**
- Styling for file input element when Javascript is enable

**`.js .input-fine-trigger:hover, .js .input-file-trigger:focus{}`**
- Styline for file input trigger button on hover and focus when Javascript is enable
  
**`.file-return{}`**
- Styling for file return paragraph

**`.file-return:not(:empty){}`**
- Styling for file return paragraph when not empty

**`.js .file-return{}`**
- Styling for file return paregraph when Javascript is enable

**`.js .file-return:not(:empty){}`**
- Styling for file return paragraph when not empty and Javascript is enable

**`h1, h2{}`**
- Styling for headings (h1, h2)

**`h2{}`**
- Additional styling for heading (h2)

**`form{}`**
- Form styling

**`h2 + P{}`**
- Styling for paragraph following h2

**`.crack-button{}`**
- Styling for the crack button

**`.crack-button:hover{}`**
- Styling for the crack button on hover
  
**`.download-button{}`**
- Styling for the download button

**`download-button:hover`**
- Styling for thw download button on hover

---

## script.js

**`$document.querySelector("html").classList.add("js")`**
- Add 'js' class to the html element to enable JavaScript-specific styling

**`var fileInput, button, the_return, crackButton`**
- Get references to DOM elements

**`$button.addEventListener("keydown", function(event)) {}`**
- Add event listener to the button for keydown events
- Focus the file input when Enter or Space is pressed

**`$button.addEventListener("click", function(event)) {}`**
- Add event listener to the button for click events
- Focus the file input when Enter or Space is clicked

**`$button.addEventListener("change", function(event)) {}`**
- Add event listener to the button for change events
- Get the selected file path
- Extract and display the file name

**`$crack.addEventListener("click", function(event)) {}`**
- Add event listener to the crack button for click events
- Create a FormData object to hold the file
- Create and XMLHttpRequest object
- Configure the request for password cracking
- Parse the response from the server
- Display a message if provided in the response
- Store the cracked password in session storage
- Add the cracked password to the FormData
- Configure the request for removing the password from the zip file
- Redirect to the dowload page after removing the password
- Send the request to remove the password

---

## download.html

**`</div class="container">`**
- Main container for the cracking tool

**`</a href="output.zip">`**
- Link to download the zip file with the password removed

---

## download.js

**`const data = JSON.parse(sessionStorage.getItem('data'));`**
- Retrieve the data stored in session storage and parse it as JSON

**`alert()`**
- Display an alert with the cracked password

---

## server.py

**`app - flask(__name__), CORS(app)`**
- Initialize Flask app and enable CORS

**`def crack{}`**
- Handle the '/crack' route to attempt to crack the password of given zip file
- Returns: JSON response containing either the cracked password or a failure message.

**`def removePassword{}`**
- Handle the '/removePassword' route to remove the password from given zip file
- This route takes a zip file and its password, then creates a new zip file without a password a save it as 'output.zip'.
- Returns: JSON response indicating success or failure.