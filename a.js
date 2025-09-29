const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const bar = document.getElementById("bar");
    const progress = document.getElementById("progress");

    // play / pause toggle
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    // ubah ikon tombol
    audio.addEventListener("play", () => {
      playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    });
    audio.addEventListener("pause", () => {
      playBtn.innerHTML = '<i class="fa fa-play"></i>';
    });

    // update progress bar
    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      bar.style.width = percent + "%";
    });

    // klik progress untuk seek
    progress.addEventListener("click", (e) => {
      const rect = progress.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = offsetX / rect.width;
      audio.currentTime = percent * audio.duration;
    });

document.getElementById('menu-button').addEventListener('click', function() {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('hidden');
    });

    document.getElementById('overlay').addEventListener('click', function() {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.add('hidden');
    });

    document.getElementById('close-button').addEventListener('click', function() {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.add('hidden');
    });


