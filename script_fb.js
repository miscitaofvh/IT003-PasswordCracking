var prefix = "https://www.facebook.com/"


function checkURL(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert(xhr.status);
            } else {
                alert(xhr.status);
            }
        }
    };
    alert(xhr.status);
    xhr.open("HEAD", url, true);
    xhr.send();
}

function solve() {
    var inputValue = document.getElementById("input").value;

    if (inputValue.trim().length === 0) {
        alert("Please enter something");
        return;
    }

    if (inputValue.startsWith(prefix) == false) {
        alert("Please enter Facebook URL");
        return;
    }
    
    if (checkURL(inputValue)) {
        
        return;
    }
   
    return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "process_input.py", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById("output").innerHTML = xhr.responseText;
        }
    };
    xhr.send("inputValue=" + inputValue);
}
