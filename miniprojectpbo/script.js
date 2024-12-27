const kapalListUl = document.getElementById("kapal-list-ul");
const kapalForm = document.getElementById("kapal-form");
const namaKapalInput = document.getElementById("nama-kapal");
const jenisKapalInput = document.getElementById("jenis-kapal");
const kapasitasMuatanInput = document.getElementById("kapasitas-muatan");

// Fungsi untuk mendapatkan daftar kapal dari API
async function getKapal() {
  try {
    const response = await fetch("http://localhost:3000/kapal");
    const data = await response.json();
    displayKapal(data);
  } catch (error) {
    console.error("Error fetching kapal:", error);
  }
}

// Fungsi untuk menampilkan kapal dalam daftar
function displayKapal(kapal) {
  kapalListUl.innerHTML = "";
  kapal.forEach(k => {
    const li = document.createElement("li");
    li.textContent = `${k.nama_kapal} (${k.jenis_kapal}) - Kapasitas: ${k.kapasitas_muatan}`;
    kapalListUl.appendChild(li);
  });
}

// Menangani form submission untuk menambah kapal
kapalForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const kapalData = {
    nama_kapal: namaKapalInput.value,
    jenis_kapal: jenisKapalInput.value,
    kapasitas_muatan: kapasitasMuatanInput.value
  };

  try {
    const response = await fetch("http://localhost:3000/kapal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(kapalData)
    });
    if (response.ok) {
      getKapal(); // Update daftar kapal setelah menambah kapal baru
      kapalForm.reset(); // Reset form input
    }
  } catch (error) {
    console.error("Error adding kapal:", error);
  }
});

// Ambil daftar kapal saat halaman dimuat
window.onload = getKapal;
