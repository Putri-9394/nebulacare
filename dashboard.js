const token = localStorage.getItem("token");
if (!token) location.href = "login.html";

fetch("https://crud-api-production-1baf.up.railway.app/api/products", {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("admin-container");
    data.data.forEach(p => {
      const el = document.createElement("div");
      el.innerHTML = `
        <h3>${p.nama}</h3>
        <img src="${p.foto}" width="100%">
        <p>Rp${p.harga}</p>
        <button onclick="hapusProduk('${p._id}')">Hapus</button>
      `;
      container.appendChild(el);
    });
  });

function hapusProduk(id) {
  fetch(`https://crud-api-production-1baf.up.railway.app/api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  }).then(() => location.reload());
}

function logout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}