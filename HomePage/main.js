document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const popup = document.getElementById('popup');
    const loadingBar = document.getElementById('loading-bar');
    const machineListOverlay = document.getElementById('machine-list-overlay');
    const machineList = document.getElementById('machine-list');

    let startY, currentY;
    let isFooterDragging = false;

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('arrow-left');
        menuToggle.classList.toggle('arrow-right');
        if (sidebar.classList.contains('active')) {
            menuToggle.style.left = '200px';
        } else {
            menuToggle.style.left = '0';
        }
    }

    function resetView() {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('arrow-left');
        menuToggle.classList.add('arrow-right');
        menuToggle.style.left = '0';
        resetFooterAndMachineList();
    }

    function handleTouchStart(e) {
        startY = e.touches[0].clientY;
        isFooterDragging = e.target === footer || footer.contains(e.target) || machineList.contains(e.target);
    }

    function handleTouchMove(e) {
        if (!startY || !isFooterDragging) return;
        currentY = e.touches[0].clientY;
        let deltaY = startY - currentY;
        
        e.preventDefault();
        let newTransform = Math.max(-window.innerHeight + 60, Math.min(0, -deltaY));
        footer.style.transform = `translateY(${newTransform}px)`;
        machineList.style.transform = `translateY(${-newTransform}px)`;
        
        // Aggiorna l'opacità dell'overlay in base al progresso del trascinamento
        let progress = Math.abs(newTransform) / (window.innerHeight - 60);
        machineListOverlay.style.opacity = progress.toFixed(2);
        machineListOverlay.style.display = 'block';
    }

    function handleTouchEnd() {
        if (!startY || !currentY || !isFooterDragging) return;
        let deltaY = startY - currentY;
        
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
                openMachineList();
            } else {
                closeMachineList();
            }
        } else {
            resetFooterAndMachineList();
        }
        
        resetDragState();
    }

    function openMachineList() {
        footer.style.transform = 'translateY(calc(-100vh + 60px))';
        machineList.style.transform = 'translateY(0)';
        machineListOverlay.style.display = 'block';
        machineListOverlay.style.opacity = '1';
        machineList.classList.add('active');
    }

    function closeMachineList() {
        resetFooterAndMachineList();
    }

    function resetFooterAndMachineList() {
        footer.style.transform = 'translateY(0)';
        machineList.style.transform = 'translateY(100%)';
        machineListOverlay.style.display = 'none';
        machineListOverlay.style.opacity = '0';
        machineList.classList.remove('active');
    }

    function resetDragState() {
        isFooterDragging = false;
        startY = null;
        currentY = null;
    }

    function handleResize() {
        resetFooterAndMachineList();
        adjustQRScannerSize();
    }

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        showLoadingAnimation();
        
        // Add a delay to show the loading animation before redirecting
        setTimeout(() => {
            // Redirect to index.html
            window.location.href = '../MachinePageLegend/index.html';
        }, 2000); // 2 second delay
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    function showLoadingAnimation() {
        popup.style.display = 'block';
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                loadingBar.style.width = '100%';
                popup.querySelector('p').textContent = 'Redirecting...';
                } else {
                width += 10;
                loadingBar.style.width = width + '%';
            }
        }, 100);
    }

    function initQRScanner() {
        const html5QrCode = new Html5Qrcode("qr-reader");
        const config = {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
                const minEdgePercentage = 70;
                const minDimension = Math.min(viewfinderWidth, viewfinderHeight);
                const qrboxSize = Math.floor(minDimension * minEdgePercentage / 100);
                return { width: qrboxSize, height: qrboxSize };
            },
            aspectRatio: 1.0
        };

        html5QrCode.start(
            { facingMode: "environment" },
            config,
            onScanSuccess,
            onScanFailure
        ).catch((err) => {
            console.error("Error starting QR scanner:", err);
            if (err.name === "NotAllowedError") {
                alert("Camera access was denied. Please enable camera access and reload the page.");
            } else {
                alert("Error starting QR scanner. Please check console for details.");
            }
        });

        adjustQRScannerSize();
    }

    function adjustQRScannerSize() {
        const scannerContainer = document.getElementById('qr-scanner-container');
        scannerContainer.style.width = '100vw';
        scannerContainer.style.height = '100vh';
        scannerContainer.style.position = 'fixed';
        scannerContainer.style.top = '0';
        scannerContainer.style.left = '0';
        scannerContainer.style.zIndex = '1000';
    }

    window.addEventListener('resize', handleResize);
    menuToggle.addEventListener('click', toggleSidebar);
    document.querySelector('.home-link').addEventListener('click', resetView);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    machineListOverlay.addEventListener('click', closeMachineList);
    
    initQRScanner();
});