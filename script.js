document.querySelectorAll('.app-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.app-option').forEach(item => {
            item.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});

const confirmButton = document.querySelector('.submit-button');

confirmButton.addEventListener('click', () => {
    const selectedApp = document.querySelector('.app-option.selected');
    if (selectedApp) {
        const appName = selectedApp.getAttribute('app-name');
        switch (appName) {
            case 'facebook':
                window.location.href = 'facebook.html';
                break;
            case 'instagram':
                window.location.href = 'instagram.html';
                break;
            case 'gmail':
                window.location.href = 'gmail.html';
                break;
        }
    } else {
        var feedback_text = "Please chooose an application";
        var feedback = document.getElementById("feedback");
        feedback.textContent = feedback_text;
        feedback.style.display = "block";

        setTimeout(function() {
        feedback.style.display = "none";
        }, 1000); 
}
});