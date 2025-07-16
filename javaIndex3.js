// Sidebar menu
document.getElementById('menu-button').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('hidden');
});
document.getElementById('overlay').addEventListener('click', function () {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
});
document.getElementById('close-button').addEventListener('click', function () {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
});

async function search() {
  const query = document.getElementById('searchInput').value.trim();
  const container = document.getElementById('videoContainer');
  container.innerHTML = "Sedang mencari...";

  if (!query) {
    container.innerHTML = "Masukkan kata kunci pencarian.";
    return;
  }

  try {
    const apiUrl = `https://api.ryzumi.vip/api/search/yt?query=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const videos = data.videos.slice(0, 20);

    container.innerHTML = "";
    videos.forEach((video, index) => {
      const embedUrl = `https://www.youtube.com/embed/${video.id}`;

      container.innerHTML += `
        <div class="video-box">
          <div class="relative">
            <iframe class="rounded" style="width: 100%; height: 210px;" src="${embedUrl}" allowfullscreen></iframe>
            <button 
              data-videoid="${video.id}" 
              data-title="${video.title.replace(/"/g, '&quot;')}" 
              class="download-btn absolute bottom-2 right-2 bg-blue-600 text-white text-sm px-3 py-1 rounded shadow hover:bg-blue-700">
              🎵 Download Mp3 🎶
            </button>
          </div>
          <div class="title mt-2 font-semibold text-lg">${video.title}</div>
          <div class="text-sm text-gray-600">Durasi: ${video.duration.timestamp} &bullet; Views: ${video.views.toLocaleString()}</div>
        </div>
      `;
    });

  } catch (error) {
    container.innerHTML = "Gagal mengambil data dari API.";
    console.error(error);
  }
}

// Event listener untuk semua tombol download
document.addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("download-btn")) {
    const videoId = e.target.getAttribute("data-videoid");
    const videoTitle = e.target.getAttribute("data-title");

    if (!videoId) return alert("ID video tidak ditemukan!");

    try {
      const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "44114406bbmshdee24010b885bc0p140418jsn3d9caf51b4b3",
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com"
        }
      });

      const result = await response.json();

      // Buat popup HTML
      const popup = document.createElement("div");
      popup.innerHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button id="closePopup" class="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">✖</button>
            <h2 class="text-lg font-semibold mb-2">${result.title || videoTitle}</h2>
            <p class="mb-4 text-sm text-gray-600">
              Ukuran: ${(result.filesize / 1048576).toFixed(2)} MB &bullet; Durasi: ${Math.floor(result.duration)} detik
            </p>
            <a href="${result.link}" target="_blank" class="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              🔽 Download MP3
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(popup);

      document.getElementById("closePopup").addEventListener("click", () => popup.remove());

    } catch (error) {
      console.error("Gagal ambil MP3:", error);
      alert("Gagal mengunduh file MP3.");
    }
  }
});
