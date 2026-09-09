
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
if(menuToggle){
  menuToggle.addEventListener("click",()=>navMenu.classList.toggle("open"));
}
document.querySelectorAll(".nav-menu a").forEach(a=>{
  a.addEventListener("click",()=>navMenu.classList.remove("open"));
});
const tahun=document.getElementById("tahun");
if(tahun) tahun.textContent=new Date().getFullYear();

/* DATA CONTOH - ganti dengan data kader resmi */
const dataKader=[
 {nama:"Nama Kader 1",angkatan:"2024",status:"Aktif"},
 {nama:"Nama Kader 2",angkatan:"2024",status:"Aktif"},
 {nama:"Nama Kader 3",angkatan:"2025",status:"Aktif"},
 {nama:"Nama Kader 4",angkatan:"2025",status:"Alumni"},
 {nama:"Nama Kader 5",angkatan:"2023",status:"Alumni"},
 {nama:"Nama Kader 6",angkatan:"2026",status:"Aktif"}
];

const daftarKader=document.getElementById("daftarKader");
if(daftarKader){
  const cari=document.getElementById("cariKader");
  const fa=document.getElementById("filterAngkatan");
  const fs=document.getElementById("filterStatus");

  [...new Set(dataKader.map(k=>k.angkatan))].sort().forEach(a=>{
    const opt=document.createElement("option");
    opt.value=a; opt.textContent="Angkatan "+a; fa.appendChild(opt);
  });

  function tampil(){
    const q=(cari.value||"").toLowerCase();
    const a=fa.value, s=fs.value;
    const hasil=dataKader.filter(k=>
      k.nama.toLowerCase().includes(q) &&
      (a==="semua" || k.angkatan===a) &&
      (s==="semua" || k.status===s)
    );
    daftarKader.innerHTML=hasil.length ? hasil.map(k=>`
      <div class="kader-card">
        <img src="assets/kader.jpg" alt="Foto kader">
        <div>
          <h3>${k.nama}</h3>
          <p>Angkatan ${k.angkatan}</p>
          <span class="status">${k.status}</span>
        </div>
      </div>`).join("") : "<p>Data kader tidak ditemukan.</p>";
  }
  cari.addEventListener("input",tampil);
  fa.addEventListener("change",tampil);
  fs.addEventListener("change",tampil);
  document.getElementById("totalKader").textContent=dataKader.length;
  document.getElementById("aktifKader").textContent=dataKader.filter(k=>k.status==="Aktif").length;
  document.getElementById("jumlahAngkatan").textContent=new Set(dataKader.map(k=>k.angkatan)).size;
  tampil();
}

/* Form pendaftaran: sementara demo lokal */
const form=document.getElementById("formDaftar");
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    document.getElementById("pesanForm").textContent=
      "Form berhasil diisi. Tahap berikutnya bisa kita sambungkan ke WhatsApp atau database online.";
    form.reset();
  });
}
