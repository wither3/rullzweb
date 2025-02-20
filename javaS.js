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

    async function fetchEarthquakeData() {
      try {
        const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        const data = await response.json();
        const earthquake = data.Infogempa.gempa;
        const earthquakeInfo = `
        <div class="flex items-center">
          <img src="https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.Shakemap}" alt="Shakemap of the earthquake showing the intensity of shaking in different areas" class="mt-4" height="160px" width="160px">
          <div class="ml-4 text-xs">
            <p><strong>Location:</strong> ${earthquake.Wilayah}</p>
            <p><strong>Magnitude:</strong> ${earthquake.Magnitude}</p>
            <p><strong>Time:</strong> ${earthquake.Jam}</p>
            <p><strong>Date:</strong> ${earthquake.Tanggal}</p>
            <p><a href="#" id="read-more" class="text-blue-600 hover:text-blue-800">Baca selengkapnya...</a></p>
            <div id="hidden-text" class="hidden-text">
              <p><strong>Depth:</strong> ${earthquake.Kedalaman}</p>
              <p><strong>Dirasakan:</strong> ${earthquake.Dirasakan}</p>
              <p><a href="#" id="read-less" class="text-blue-600 hover:text-blue-800">Tutup</a></p>
            </div>
          </div>
        </div>`;
        document.getElementById('earthquake-info').innerHTML = earthquakeInfo;

        document.getElementById('read-more').addEventListener('click', function(event) {
          event.preventDefault();
          document.getElementById('hidden-text').classList.remove('hidden-text');
          this.style.display = 'none';
        });

        document.getElementById('read-less').addEventListener('click', function(event) {
          event.preventDefault();
          document.getElementById('hidden-text').classList.add('hidden-text');
          document.getElementById('read-more').style.display = 'inline';
        });
      } catch (error) {
        document.getElementById('earthquake-info').innerHTML = 'Failed to load earthquake data.';
      }
    }

    async function fetchTikTokData() {
      try {
        const response = await fetch('https://api.tiklydown.eu.org/api/stalk?user=qhairulpratama');
        const data = await response.json();
        const user = data.data.user;
        const stats = data.data.stats;
        const tiktokInfo = `
    <center>  
        <p>${user.nickname}</p>
          <img src="${user.avatarLarger}" alt="Profile picture of TikTok user ${user.nickname}" class="rounded-full" height="80px" width="80px"></center>
          <div class="ml-4 text-xs">
            <center>
         <p class="mr-3"><strong>@${user.uniqueId}</strong></p></center>
  <div class="biru">
    
<div class="kotak">
    <center>
     
    <font color="#9d9d9d">mengikuti</font>
      <font size="3">
 <p><strong>${stats.followingCount}</strong></p>  </font></center> 
    </div>
   <div class="kotak">
       <center>
   <font color="#9d9d9d">pengikut</font>
      <font size="3">
       <p><strong>${stats.followerCount}</strong></p>
          </font> 
          </center>
       </div>
       <div class="kotak">
            <center>
   <font color="#9d9d9d">like</font>
      <font size="3">
       <p><strong>${stats.heartCount}</strong></p>
          </font> 
          </center>     
           
           </div>
    </div>         
    <center>
    <div class="hijau">
       
       <p>${user.signature}</p>
       <a href="${user.bioLink.link}" style="text-decoration:underline;">${user.bioLink.link}</a>
            
       
        </div>
        </center>
        `;
        document.getElementById('tiktok-info').innerHTML = tiktokInfo;
      } catch (error) {
        document.getElementById('tiktok-info').innerHTML = 'Failed to load TikTok user data.';
      }
    }

    fetchEarthquakeData();
    fetchTikTokData();
    
    
    
    
     // Fungsi untuk menyimpan data
        async function simpanData() {
            const nomor = document.getElementById('nomor').value;
            if (!nomor) {
                document.getElementById('status').innerText = 'Nomor tidak boleh kosong!';
                return;
            }

            const waktu = new Date();
            const id = `${waktu.getHours()}${waktu.getMinutes()}${waktu.getSeconds()}`;
            const data = {
                id: id,
                nomor: parseInt(nomor, 10),
                pairing: "",
                status: "TidakDiKetahui",
                pengguna: "none",
                reset: "none",
                feature: {
                    tiktokDL: "false",
                    play: "false",
                    sticker: "false",
                    qc: "false",
                    brat: "false",
                    menu: "true"
                },
                console: {
                    hasil: "",
                    chat: "",
                    jid: "",
                    jam: "",
                    nama: ""
                }
            };

            try {
                const response = await fetch('https://tempatrahasia-201bd-default-rtdb.asia-southeast1.firebasedatabase.app/bacanyaa.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                document.getElementById('status').innerText = 'Data berhasil disimpan!';
            } catch (error) {
                document.getElementById('status').innerText = 'Gagal menyimpan data!';
                console.error(error);
            }
        }

        // Fungsi untuk mengubah status menjadi "ok"
        async function startData() {
            try {
                const response = await fetch('https://tempatrahasia-201bd-default-rtdb.asia-southeast1.firebasedatabase.app/bacanyaa.json', {
                    method: 'PATCH', // Gunakan PATCH untuk memperbarui hanya bagian tertentu
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: "ok" }) // Update status menjadi "ok"
                });

                if (response.ok) {
                    document.getElementById('status').innerText = 'Status berhasil diubah menjadi "ok"!';
                } else {
                    document.getElementById('status').innerText = 'Gagal mengubah status!';
                }
            } catch (error) {
                document.getElementById('status').innerText = 'Gagal mengubah status!';
                console.error(error);
            }
        }
        
  async function resetStatus() {
            try {
                const response = await fetch('https://tempatrahasia-201bd-default-rtdb.asia-southeast1.firebasedatabase.app/bacanyaa.json', {
                    method: 'PATCH', // Gunakan PATCH untuk memperbarui hanya bagian tertentu
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: "TidakDiKetahui" }) // Update status menjadi "TidakDiKetahui"
                });

                if (response.ok) {
                    document.getElementById('status').innerText = 'Status berhasil diubah menjadi "TidakDiKetahui"!';
                } else {
                    document.getElementById('status').innerText = 'Gagal mengubah status!';
                }
            } catch (error) {
                document.getElementById('status').innerText = 'Gagal mengubah status!';
                console.error(error);
            }
        }
        
        
const resultElement = document.getElementById('result');

        async function fetchData() {
            try {
                const response = await fetch('https://tempatrahasia-201bd-default-rtdb.asia-southeast1.firebasedatabase.app/bacanyaa.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                resultElement.textContent = data.pairing || 'Data not available';
            } catch (error) {
                resultElement.textContent = 'Error fetching data';
                console.error('Error:', error);
            }
        }

        // Fetch data every 800ms
        setInterval(fetchData, 800);

        // Initial fetch
        fetchData();        