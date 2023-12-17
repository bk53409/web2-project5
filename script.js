let videoStream;
let videoElement;

document.getElementById('startButton').addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoStream = stream;
                videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.autoplay = true;
                document.getElementById('videoContainer').appendChild(videoElement);
            });
    }
});

document.getElementById('captureButton').addEventListener('click', () => {
    if (videoStream) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const capturedImage = canvas.toDataURL('image/png');

        const capturedImageElement = document.getElementById('capturedImage');
        capturedImageElement.src = capturedImage;
        capturedImageElement.style.display = 'block';

        videoStream.getTracks().forEach(track => track.stop());

        videoElement.srcObject = null;
        videoElement.parentNode.removeChild(videoElement);
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}