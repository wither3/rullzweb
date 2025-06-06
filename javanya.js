
function pilihLink() {
var teks =`Pilih versi yang anda inginkan
contoh: ketik 1 untuk versi bedrock

1. Download versi bedrock
2. download versi java
3. join grup Minecraft WhatsApp`;
  const pilihan = prompt(teks);

  if (pilihan === "1") {
    window.location.href = "https://sfile.mobi/7LDVVGP4E8R";
  } else if (pilihan === "2") {
    window.location.href = "https://sfile.mobi/1OhZ4n0Ehiv";
  } else if (pilihan === "3") {
    window.location.href = "https://chat.whatsapp.com/FZtfxpSyYCN9FyCjWekyZN";
    } else if (pilihan !== null) {
    alert("Pilihan tidak valid.");
  }
}

