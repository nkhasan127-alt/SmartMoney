document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark / Light Mode Toggle dengan localStorage
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️ Light Mode";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }

  // 2. Menu Responsif (Mobile Toggle)
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // 3. Kalkulator Finansial Mini (DOM Manipulation)
  const hitungBtn = document.getElementById("hitungBtn");
  const hasilSimulasi = document.getElementById("hasilSimulasi");

  if (hitungBtn) {
    hitungBtn.addEventListener("click", () => {
      const target = parseFloat(document.getElementById("targetNominal").value);
      const bulanan = parseFloat(document.getElementById("tabunganBulanan").value);

      if (!target || !bulanan || target <= 0 || bulanan <= 0) {
        alert("⚠️ Mohon masukkan angka target dan tabungan bulanan yang valid!");
        return;
      }

      const totalBulan = Math.ceil(target / bulanan);
      const tahun = Math.floor(totalBulan / 12);
      const sisaBulan = totalBulan % 12;

      let durasiTeks = "";
      if (tahun > 0) durasiTeks += `${tahun} tahun `;
      if (sisaBulan > 0 || tahun === 0) durasiTeks += `${sisaBulan} bulan`;

      hasilSimulasi.style.display = "block";
      hasilSimulasi.innerHTML = `
        <strong>💡 Hasil Simulasi SmartMoney:</strong><br>
        Dibutuhkan waktu sekitar <strong>${durasiTeks}</strong> (${totalBulan} bulan) untuk mencapai target dana Rp${target.toLocaleString("id-ID")} dengan menabung Rp${bulanan.toLocaleString("id-ID")}/bulan.
      `;
    });
  }

  // 4. Validasi Form Kontak & LocalStorage
  const contactForm = document.getElementById("contactForm");
  const pesanTersimpan = document.getElementById("pesanTersimpan");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const pesan = document.getElementById("pesan").value.trim();

      if (!nama || !email || !pesan) {
        alert("⚠️ Harap lengkapi semua kolom form pesan!");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        alert("⚠️ Format email tidak valid!");
        return;
      }

      const dataPesan = { nama, email, pesan, waktu: new Date().toLocaleString("id-ID") };
      localStorage.setItem("pesanSmartMoney", JSON.stringify(dataPesan));

      alert(`✅ Terima kasih ${nama}! Pesan Anda telah terkirim.`);

      pesanTersimpan.style.display = "block";
      pesanTersimpan.innerHTML = `
        <strong>Pesan Terakhir Disimpan (${dataPesan.waktu}):</strong><br>
        Dari: ${dataPesan.nama} (${dataPesan.email})<br>
        Pesan: "${dataPesan.pesan}"
      `;

      contactForm.reset();
    });
  }
});
