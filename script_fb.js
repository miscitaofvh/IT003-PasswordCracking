var prefix = "https://www.facebook.com/";

function checkURL(url) {
    var xhr = new XMLHttpRequest();
    var method = "GET";
    var phpurl = "checkurl.php?url=" + encodeURIComponent(url);

    xhr.open(method, phpurl);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function () {
    console.error('Request failed. Network error.');
    };
    
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
    
    checkURL(inputValue);
}
