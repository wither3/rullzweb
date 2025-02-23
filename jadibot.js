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