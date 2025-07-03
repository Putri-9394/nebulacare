const produkContainer = document.getElementById("produk-container");

async function loadProduk() {
  try {
    const res = await fetch("https://crud-api-production-1baf.up.railway.app/api/products");
    const data = await res.json();

    // Debug: cek data di console
    console.log("Data produk:", data);

    produkContainer.innerHTML = "";

    data.forEach((produk) => {
      const name = produk.nama || "Tanpa Nama";
      const harga = produk.harga || "0";
      const gambar = produk.gambar || "https://via.placeholder.com/300x300?text=No+Image";
      const kategori = produk.kategori || "lainnya";

      produkContainer.innerHTML += `
        <div class="produk-item" data-kategori="${kategori}">
          <img src="${gambar}" alt="${nama}" />
          <h3>${nama}</h3>
          <p>Rp ${harga}</p>
          <a href="https://wa.me/6283152903475?text=Saya%20mau%20beli%20${encodeURIComponent(nama)}" target="_blank">
            <button>Beli via WhatsApp</button>
          </a>
        </div>
      `;
    });

  } catch (error) {
    console.error("Gagal memuat produk:", error);
    produkContainer.innerHTML = "<p style='text-align:center'>❌ Gagal memuat produk. Silakan coba lagi nanti.</p>";
  }
}

function filterKategori(kategori) {
  const cards = document.querySelectorAll(".product-list > div");
  cards.forEach((card) => {
    if (kategori === "semua" || card.dataset.kategori === kategori) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

loadProduk();
