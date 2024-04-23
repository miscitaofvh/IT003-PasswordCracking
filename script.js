document.querySelectorAll('.app-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.app-option').forEach(item => {
            item.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});