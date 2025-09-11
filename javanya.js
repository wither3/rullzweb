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
    
function pilihLink() {
var teks =`Pilih versi yang anda inginkan
contoh: ketik 1 untuk versi bedrock

1. Download versi bedrock
2. download versi java
3. join grup Minecraft WhatsApp`;
  const pilihan = prompt(teks);

  if (pilihan === "1") {
    window.location.href = "https://sfile.mobi/9UFTeWXAeAU";
  } else if (pilihan === "2") {
    window.location.href = "https://sfile.mobi/6srRl2cRlSX";
  } else if (pilihan === "3") {
    window.location.href = "https://chat.whatsapp.com/FZtfxpSyYCN9FyCjWekyZN";
    } else if (pilihan !== null) {
    alert("Pilihan tidak valid.");
  }
}

