document.getElementById("downloadBtn").addEventListener("click", function() {
  const link = document.createElement("a");
  link.href = "https://sfile.mobi/9UFTeWXAeAU"
 
  link.click();
});

document.getElementById("downloadBtn1").addEventListener("click", function() {
  const link = document.createElement("a");
  link.href = "https://sfile.mobi/6srRl2cRlSX"
 
  link.click();
});



const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');

menuIcon.addEventListener('click', () => {
  menu.classList.toggle('show');
});