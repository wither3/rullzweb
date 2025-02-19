const menuButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('close-button');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const downloadButton = document.getElementById('download-button');
    const videoUrlInput = document.getElementById('video-url');
    const pasteIcon = document.getElementById('paste-icon');
    const resultSection = document.getElementById('result-section');
    const videoPlayer = document.getElementById('video-player');
    const videoAuthor = document.getElementById('video-author');
    const videoName = document.getElementById('video-name');
    const downloadVideoButton = document.getElementById('download-video');
    const downloadHdVideoButton = document.getElementById('download-hd-video');
    const downloadWmVideoButton = document.getElementById('download-wm-video');
    const downloadMp3Button = document.getElementById('download-mp3');
    const authorAvatar = document.getElementById('author-avatar');
    const videoViews = document.getElementById('video-views');
    const videoLikes = document.getElementById('video-likes');
    const videoComments = document.getElementById('video-comments');
    const videoFavorites = document.getElementById('video-favorites');
    const videoShares = document.getElementById('video-shares');
    const musicTitle = document.getElementById('music-title');
    const musicAuthor = document.getElementById('music-author');
    const musicPlayer = document.getElementById('music-player');
    const loadingOverlay = document.getElementById('loading-overlay');
    const progressBarInner = document.getElementById('progress-bar-inner');
    const deskripsi = document.getElementById('desc-title');
    const kapandipost = document.getElementById('tanggalnya');
   const negaranya = document.getElementById('negara');
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('menu-open');
        overlay.classList.toggle('hidden');
    });

    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('menu-open');
        overlay.classList.add('hidden');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('menu-open');
        overlay.classList.add('hidden');
    });

    pasteIcon.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            videoUrlInput.value = text;
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    });





   const downloadFile = async (url, fileName) => {
    const speedDisplay = document.getElementById('speed-display'); // Ambil elemen untuk menampilkan kecepatan
    loadingOverlay.classList.add('active');
    const response = await fetch(url);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');

    let receivedLength = 0;
    const chunks = [];
    const startTime = Date.now(); // Catat waktu awal

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const elapsedTime = (Date.now() - startTime) / 1000; // Waktu berlalu dalam detik
        receivedLength += value.length;
        const speed = (receivedLength / elapsedTime) / (1024 * 1024); // Kecepatan dalam MB/s

        // Update teks kecepatan di HTML
        speedDisplay.textContent = `Kecepatan: ${speed.toFixed(2)} MB/s`;

        // Update progress bar
        progressBarInner.style.width = `${(receivedLength / contentLength) * 100}%`;
        chunks.push(value);
    }

    const blob = new Blob(chunks);
    const objectURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectURL);
    loadingOverlay.classList.remove('active');

    // Reset kecepatan ke default setelah download selesai
    speedDisplay.textContent = `Kecepatan: 0 MB/s`;
};








    downloadButton.addEventListener('click', async () => {
        const videoUrl = videoUrlInput.value;
        if (!videoUrl) {
            alert('Please enter a TikTok video URL');
            return;
        }

        try {
            const response = await fetch(`https://aabbcc.vercel.app/tikwm/download?url=${encodeURIComponent(videoUrl)}`);
            const data = await response.json();

            if (data.success) {
                videoPlayer.src = data.data.video.noWatermark;
                videoPlayer.style.width = '100%';
                videoPlayer.style.height = 'auto';
                videoAuthor.textContent = data.data.author;
                videoName.textContent = data.data.name || 'No name';
                authorAvatar.src = data.data.avatar;
                videoViews.textContent = data.data.videoInfo.view;
                videoLikes.textContent = data.data.videoInfo.like;
                videoComments.textContent = data.data.videoInfo.comment;
                videoFavorites.textContent = data.data.videoInfo.collect;
                videoShares.textContent = data.data.videoInfo.share;
                musicTitle.textContent = data.data.musicInfo.title;
                musicAuthor.textContent = data.data.musicInfo.author;
                musicPlayer.src = data.data.musicInfo.play;
                deskripsi.textContent = data.data.title;
                kapandipost.textContent = data.data.videoInfo.createTime;
                negaranya.textContent = data.data.region;
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
                const formattedTime = `${String(currentDate.getHours()).padStart(2, '0')}-${String(currentDate.getMinutes()).padStart(2, '0')}-${String(currentDate.getSeconds()).padStart(2, '0')}`;

                downloadVideoButton.onclick = () => downloadFile(data.data.video.noWatermark, `TikDL_${formattedDate}_${formattedTime}.mp4`);
                downloadHdVideoButton.onclick = () => downloadFile(data.data.video.videoHd, `TikDL_HD_${formattedDate}_${formattedTime}.mp4`);
                downloadWmVideoButton.onclick = () => downloadFile(data.data.video.watermark, `TikDL_WM_${formattedDate}_${formattedTime}.mp4`);
                downloadMp3Button.onclick = () => downloadFile(data.data.musicInfo.play, `TikDL_${formattedDate}_${formattedTime}.mp3`);

                resultSection.classList.remove('hidden');
            } else {
                alert('Failed to download video');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while downloading the video');
        }
    });