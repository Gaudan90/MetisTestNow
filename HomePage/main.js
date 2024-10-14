document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    const machineListOverlay = document.getElementById('machine-list-overlay');
    const machineList = document.getElementById('machine-list');

    let startY, currentY;
    let isFooterDragging = false;

    function handleTouchStart(e) {
        startY = e.touches[0].clientY;
        isFooterDragging = e.target === footer || footer.contains(e.target);
    }

    function handleTouchMove(e) {
        if (!startY || !isFooterDragging) return;
        currentY = e.touches[0].clientY;
        let deltaY = startY - currentY;
        
        e.preventDefault();
        let newTransform = Math.max(-window.innerHeight + 60, Math.min(0, -deltaY));
        footer.style.transform = `translateY(${newTransform}px)`;
        machineList.style.transform = `translateY(${-newTransform}px)`;
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
        footer.style.transform = 'translateY(calc(-100% + 60px))';
        machineList.style.transform = 'translateY(0)';
        machineListOverlay.style.display = 'block';
        machineList.classList.add('active');
    }

    function closeMachineList() {
        resetFooterAndMachineList();
    }

    function resetFooterAndMachineList() {
        footer.style.transform = 'translateY(0)';
        machineList.style.transform = 'translateY(100%)';
        machineListOverlay.style.display = 'none';
        machineList.classList.remove('active');
    }

    function resetDragState() {
        isFooterDragging = false;
        startY = null;
        currentY = null;
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
    }

    footer.addEventListener('touchstart', handleTouchStart);
    footer.addEventListener('touchmove', handleTouchMove);
    footer.addEventListener('touchend', handleTouchEnd);
    machineListOverlay.addEventListener('click', closeMachineList);

    initQRScanner();
});