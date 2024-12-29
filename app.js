// API Endpoints (replace these with actual backend API URLs when ready)
const API = {
    GET_VIDEOS: 'YOUR_BACKEND_API/videos', // Replace with the backend API endpoint to fetch videos
    UPLOAD_VIDEO: 'YOUR_BACKEND_API/upload', // Replace with the backend API endpoint to upload videos
    DELETE_VIDEO: 'YOUR_BACKEND_API/videos', // Replace with the backend API endpoint to delete videos
    GET_USAGE_STATS: 'YOUR_BACKEND_API/usage' // Replace with the backend API endpoint to fetch usage stats
};

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

// Fetch Videos
async function fetchVideos() {
    try {
        const response = await fetch(API.GET_VIDEOS); // Replace with actual API call
        if (!response.ok) throw new Error('Failed to fetch videos');
        const videos = await response.json();
        renderVideos(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        alert('Failed to load videos. Please try again later.');
    }
}

// Delete Video
async function deleteVideo(videoId) {
    try {
        const response = await fetch(`${API.DELETE_VIDEO}/${videoId}`, { // Replace with actual API call
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete video');
        alert('Video deleted successfully.');
        fetchVideos();
    } catch (error) {
        console.error('Error deleting video:', error);
        alert('Failed to delete video. Please try again later.');
    }
}

// Upload Video
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];
    if (file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(API.UPLOAD_VIDEO, { // Replace with actual API call
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Failed to upload video');

            alert('Video uploaded successfully.');
            fetchVideos();
            fileInput.value = ''; // Clear the file input
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Failed to upload video. Please try again later.');
        }
    } else {
        alert('Please select a file to upload.');
    }
});

// Fetch Usage Stats
async function fetchUsageStats() {
    try {
        const response = await fetch(API.GET_USAGE_STATS); // Replace with actual API call
        if (!response.ok) throw new Error('Failed to fetch usage stats');
        const stats = await response.json();
        document.getElementById('storageUsed').innerText = stats.storageUsed;
        document.getElementById('bandwidthUsed').innerText = stats.bandwidthUsed;
    } catch (error) {
        console.error('Error fetching usage stats:', error);
        alert('Failed to load usage stats. Please try again later.');
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    fetchVideos(); // Load videos on page load
    fetchUsageStats(); // Load usage stats on page load
});
