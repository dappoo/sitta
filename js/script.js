// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
      alert("Semua field wajib diisi!");
      return;
    }

    const user = dataPengguna.find(function (item) {
      return item.email === email && item.password === password;
    });

    if (user) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      showToast("Login berhasil!", "success");
      window.location.href = "dashboard.html";
    } else {
      showToast("email/password yang anda masukkan salah");
    }
  });
}

// MODAL
const forgotBtn = document.getElementById("forgotBtn");
const registerBtn = document.getElementById("registerBtn");

if (forgotBtn) {
  forgotBtn.onclick = function () {
    document.getElementById("forgotModal").style.display = "block";
  };
}

if (registerBtn) {
  registerBtn.onclick = function () {
    document.getElementById("registerModal").style.display = "block";
  };
}

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const modalId = this.getAttribute("data-close");
    document.getElementById(modalId).style.display = "none";
  });
});

// GREETING
const greeting = document.getElementById("greeting");
const userInfo = document.getElementById("userInfo");

if (greeting) {
  const hour = new Date().getHours();

  let text = "";

  if (hour < 12) {
    text = "Selamat Pagi";
  } else if (hour < 17) {
    text = "Selamat Siang";
  } else {
    text = "Selamat Sore";
  }

  const user = JSON.parse(localStorage.getItem("userLogin"));

  if (user) {
    greeting.innerHTML = text + ", " + user.nama;
    userInfo.innerHTML = user.role + " - " + user.lokasi;
  }
}

// TRACKING
function searchTracking() {
  const nomorDO = document.getElementById("nomorDO").value;
  const result = document.getElementById("trackingResult");

  const data = dataTracking[nomorDO];

  if (!data) {
    showToast("Nomor Delivery Order tidak ditemukan!");
    return;
  }

  let timelineHTML = "";

  data.perjalanan.forEach(function (item) {
    timelineHTML +=
      '<div class="timeline-item">' +
      "<h4>" + item.waktu + "</h4>" +
      "<p>" + item.keterangan + "</p>" +
      "</div>";
  });

  result.innerHTML =
    '<div class="result-card">' +
    "<h2>" + data.nama + "</h2>" +
    "<p>Status: <strong>" + data.status + "</strong></p>" +
    "<p>Ekspedisi: " + data.ekspedisi + "</p>" +
    "<p>Tanggal Kirim: " + data.tanggalKirim + "</p>" +
    "<p>Jenis Paket: " + data.paket + "</p>" +
    "<p>Total Pembayaran: " + data.total + "</p>" +
    '<div class="progress">' +
    '<div class="progress-bar"></div>' +
    "</div>" +
    '<div class="timeline">' +
    timelineHTML +
    "</div>" +
    "</div>";
}

// STOK
const stokList = document.getElementById("stokList");

if (stokList) {
  renderStok();
}

function renderStok() {
  stokList.innerHTML = "";

  dataBahanAjar.forEach(function (item) {
    stokList.innerHTML +=
      '<div class="stok-card">' +
      '<img src="' + item.cover + '" alt="' + item.namaBarang + '">' +
      '<div class="stok-content">' +
      "<h3>" + item.namaBarang + "</h3>" +
      "<p>Kode: " + item.kodeBarang + "</p>" +
      "<p>Stok: " + item.stok + "</p>" +
      '<span class="badge">Edisi ' + item.edisi + "</span>" +
      "</div>" +
      "</div>";
  });
}

function tambahStok() {
  const nama = document.getElementById("namaBarang").value;
  const stok = document.getElementById("stokBarang").value;

  if (nama === "" || stok === "") {
    showToast("Data tidak boleh kosong!");
    return;
  }

  const dataBaru = {
    kodeLokasi: "CUSTOM",
    kodeBarang: "NEW001",
    namaBarang: nama,
    jenisBarang: "BMP",
    edisi: "1",
    stok: stok,
    cover: "img/default.jpg",
  };

  dataBahanAjar.push(dataBaru);

  renderStok();

  showToast("Data stok berhasil ditambahkan!");

  document.getElementById("namaBarang").value = "";
  document.getElementById("stokBarang").value = "";
}

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast");

  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  toast.innerText = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
