document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const scanButton = document.getElementById('scan-button');

    // Anima il logo
    setTimeout(() => {
        logo.style.left = '50%';
        logo.style.transform = 'translateX(-50%)';
    }, 1000);

    // Anima il pulsante
    setTimeout(() => {
        scanButton.style.right = '50%';
        scanButton.style.transform = 'translate(50%, calc(50% + 50px))';
    }, 2000);

    // Gestisci il click sul pulsante
    scanButton.addEventListener('click', function() {
        window.location.href = 'HomePage/index.html';
    });
});

