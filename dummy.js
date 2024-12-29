// Dummy API Endpoints (replace these later with actual backend URLs)
/* Replace below API endpoints with actual API URLs when backend is ready */
const DUMMY_API = {
    GET_VIDEOS: '/api/videos', // Replace with backend API for fetching videos
    UPLOAD_VIDEO: '/api/upload', // Replace with backend API for uploading videos
    DELETE_VIDEO: '/api/videos', // Replace with backend API for deleting videos
    GET_USAGE_STATS: '/api/usage' // Replace with backend API for usage stats
};

// Dummy Data (for testing)
const dummyVideos = [
    { id: 1, url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'Sample Video 1' },
    { id: 2, url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'Sample Video 2' }
];

const dummyStats = { storageUsed: 10, bandwidthUsed: 20 };

let currentFullscreenVideo = null; // Track the video in fullscreen mode

// Render Videos
function renderVideos(videos) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = ''; // Clear previous content
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'col-md-4 video-item';
        videoItem.innerHTML = `
            <video class="w-100" onclick="handleVideoClick(this)">
                <source src="${video.url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>${video.name}</p>
            <button class="btn btn-danger" onclick="deleteVideo(${video.id})">Delete</button>
        `;
        videoList.appendChild(videoItem);
    });
}

// Handle Video Click for Fullscreen
function handleVideoClick(videoElement) {
    if (currentFullscreenVideo && currentFullscreenVideo !== videoElement) {
        alert('Another video is already in fullscreen mode. Please exit fullscreen before playing another video.');
        return;
    }

    currentFullscreenVideo = videoElement;
    const requestFullscreen = videoElement.requestFullscreen || videoElement.mozRequestFullScreen || videoElement.webkitRequestFullscreen || videoElement.msRequestFullscreen;
    if (requestFullscreen) {
        requestFullscreen.call(videoElement);
        videoElement.play();
    }

    videoElement.onfullscreenchange = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
            videoElement.pause();
            currentFullscreenVideo = null;
        }
    };
}

// Fetch Videos (Dummy Implementation)
function fetchVideos() {
    // Replace this logic with an actual API call later
    renderVideos(dummyVideos);
}

// Delete Video (Dummy Implementation)
function deleteVideo(videoId) {
    // Replace this with an actual API call later
    console.log(`Deleting video with ID: ${videoId}`);
    const updatedVideos = dummyVideos.filter(video => video.id !== videoId);
    renderVideos(updatedVideos);
}

// Upload Video (Dummy Implementation)
document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];
    if (file) {
        console.log('Uploading:', file.name);
        // Replace this with an actual API call later
        dummyVideos.push({ id: Date.now(), url: URL.createObjectURL(file), name: file.name });
        fetchVideos();
        fileInput.value = ''; // Clear the file input
    } else {
        alert('Please select a file to upload.');
    }
});

// Fetch Usage Stats (Dummy Implementation)
function fetchUsageStats() {
    // Replace this logic with an actual API call later
    document.getElementById('storageUsed').innerText = dummyStats.storageUsed;
    document.getElementById('bandwidthUsed').innerText = dummyStats.bandwidthUsed;
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    fetchVideos(); // Load videos on page load
    fetchUsageStats(); // Load usage stats on page load
});
