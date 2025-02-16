
   document.getElementById('menu-button').addEventListener('click', function() {
     document.getElementById('sidebar').classList.toggle('open');
     document.getElementById('overlay').classList.toggle('hidden');
   });
   document.getElementById('overlay').addEventListener('click', function() {
     document.getElementById('sidebar').classList.remove('open');
     document.getElementById('overlay').classList.add('hidden');
   });

   async function fetchEarthquakeData() {
     try {
       const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
       const data = await response.json();
       const earthquake = data.Infogempa.gempa;
       const earthquakeInfo = `
       <div class="baruu">
       <img src="https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.Shakemap}" alt="Shakemap of the earthquake showing the intensity of shaking in different areas" class="mt-4" height="160px" width="160px">

Location: ${earthquake.Wilayah}
Magnitude: ${earthquake.Magnitude}
Depth: ${earthquake.Kedalaman}
Time: ${earthquake.Jam}
Date: ${earthquake.Tanggal}</div>`;
       document.getElementById('earthquake-info').innerHTML = earthquakeInfo;
     } catch (error) {
       document.getElementById('earthquake-info').innerHTML = 'Failed to load earthquake data.';
     }
   }

   fetchEarthquakeData();