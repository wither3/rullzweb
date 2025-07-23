const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');

function openMenu() {
  sideMenu.classList.add('open');
  overlay.classList.add('active');
  sideMenu.setAttribute('aria-hidden', 'false');
  sideMenu.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '0'));
  menuButton.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  sideMenu.classList.remove('open');
  overlay.classList.remove('active');
  sideMenu.setAttribute('aria-hidden', 'true');
  sideMenu.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  if (sideMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', () => {
  closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sideMenu.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

closeMenu();

function stalk() {
  disableButtonWithCountdown(); 

  const username = document.getElementById('usernameInput').value.trim();
  const profile = document.getElementById('profile');
  const bionya = document.getElementById('bionya');
  const datanya = document.getElementById('datanya');
  const nama = document.getElementById('nama');
  const postsContainer = document.getElementById('posts');

  if (!username) {
    profile.innerHTML = "<p>Username tidak boleh kosong.</p>";
    datanya.innerHTML = "";
    bionya.innerHTML = "";
    nama.innerHTML = "";
    postsContainer.innerHTML = "";
    return;
  }

  datanya.innerHTML = "<p>Memuat data...</p>";
  profile.innerHTML = "<p>Memuat data...</p>";
  nama.innerHTML = "Memuat data...";
  bionya.innerHTML = "Memuat data...";
  postsContainer.innerHTML = "<p style='text-align:center;'>Memuat postingan...</p>";

  fetch(`https://tik-downloaders.vercel.app/igstalk?username=${encodeURIComponent(username)}`)
    .then(res => res.json())
    .then(json => {
      const user = json?.data?.data;
      if (!user) throw new Error("Data tidak ditemukan");

      profile.innerHTML = `
        <img src="${user.hd_profile_pic_url_info?.url || user.profile_pic_url}" alt="Profile Picture" class="w-30 h-30 mx-auto">
        <div class="info">
          <center>
            <h3>@${user.username}</h3>
          </center>
        </div>
      `;

      datanya.innerHTML = `
        <center>
          <div class="diFlex">
            <div class="following"><p>Follower</p><br>${user.follower_count}</div>
            <div class="following"><p>Following</p><br>${user.following_count}</div>
            <div class="following"><p>Post</p><br>${user.media_count}</div>
          </div>
        </center>
      `;

      bionya.innerHTML = `
        <div class="biotext">
          <center>
            <p>${user.biography || 'Tidak ada bio'}</p>
            <p><a href="${user.external_url}" target="_blank">${user.external_url}</a></p>
          </center>
        </div>
      `;

      nama.innerHTML = `<p><font size="2">${user.full_name}</font></p>`;

      // lanjut fetch postingan
      return fetch(`https://tik-downloaders.vercel.app/igpost?username=${encodeURIComponent(username)}`);
    })
    .then(res => res.json())
    .then(postJson => {
      const posts = postJson?.data?.items;
      if (!posts || posts.length === 0) {
        postsContainer.innerHTML = "<p style='text-align:center;'>Tidak ada postingan ditemukan.</p>";
        return;
      }

      let postHTML = "<h3 style='text-align:center;'><font color='white'>Postingan Terbaru</font></h3><div class='post-grid' style='display:flex; flex-wrap:wrap; gap:10px; justify-content:center;'>";

      posts.forEach(post => {
  const img = post.thumbnail_url;
  const video = post.video_versions?.[0]?.url;
  const isVideo = !!video;
  const displayUrl = isVideo ? video : img;

  if (displayUrl) {
    postHTML += `
  <div class="minecraft-box">
    <img src="${img}" alt="Post" onclick="showPopup('${displayUrl}', '${isVideo ? 'video' : 'image'}')" />
  </div>
`;

  }
});



      postHTML += "</div>";
      postsContainer.innerHTML = postHTML;
    })
    .catch(err => {
      profile.innerHTML = `<p>Gagal mengambil data: ${err.message}</p>`;
      datanya.innerHTML = `Terjadi error`;
      nama.innerHTML = `Terjadi kesalahan`;
      bionya.innerHTML = `Terjadi kesalahan`;
      postsContainer.innerHTML = `<p style="color:red; text-align:center;">Gagal memuat postingan.</p>`;
    });
}

function showPopup(url, type = "image") {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');
  
  popupContent.innerHTML = ''; // kosongkan

  if (type === 'video') {
    popupContent.innerHTML = `
      <video src="${url}" controls autoplay style="max-width: 100%; max-height: 90vh;"></video>
    `;
  } else {
    popupContent.innerHTML = `
      <img src="${url}" alt="Post" style="max-width: 100%; max-height: 90vh;" />
    `;
  }

  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById('popup').style.display = "none";
}




function disableButtonWithCountdown(duration = 10) {
  const btn = document.getElementById("tombolStalk");
  btn.disabled = true;

  let countdown = duration;
  const originalText = "Mendapatkan data";

  const interval = setInterval(() => {
    btn.innerText = `Menunggu ${countdown} detik...`;
    countdown--;

    if (countdown < 0) {
      clearInterval(interval);
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }, 1000);
}
