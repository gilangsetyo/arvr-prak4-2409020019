# Tracking Build - MindAR & Three.js

Proyek praktikum Augmented Reality untuk image tracking dan face tracking.

## Buka di HP

Gunakan tautan **GitHub Pages** ini di browser HP:

**https://gilangsetyo.github.io/arvr-prak4-2409020019/**

Pilih demo lalu tekan **Mulai** dan izinkan akses kamera. Kamera memerlukan HTTPS, jadi buka tautan Pages di atas, bukan tautan repositori `github.com` atau alamat lokal `localhost`.

Jika tautan belum menampilkan aplikasi, pastikan deployment sudah berhasil:

1. Di GitHub, buka **Settings > Pages** dan pilih **GitHub Actions** sebagai sumber.
2. Pastikan workflow **Deploy AR tracking demos** berhasil pada tab **Actions**.
3. Buka kembali tautan GitHub Pages di atas. Perubahan baru muncul setelah deployment selesai.

## Jalankan secara lokal

Di terminal, pindah ke folder `prak 4(2)\tracking-build`, lalu jalankan:

```bash
python -m http.server 8080
```

Buka `http://localhost:8080` di komputer. Untuk mengakses kamera HP, gunakan tautan HTTPS GitHub Pages di atas.

## Susunan file

```text
.
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── README.md
└── prak 4(2)/
    └── tracking-build/
        ├── index.html
        ├── image-tracking.html
        ├── face-tracking.html
        ├── assets/
        ├── src/
        ├── targets/
        └── vendor/
```

Workflow GitHub Pages menerbitkan **isi** folder `prak 4(2)/tracking-build` sebagai akar situs, sehingga halaman utama yang terbuka adalah `index.html`, bukan README. File `index.html` di akar repositori juga mengarahkan ke aplikasi jika Pages masih memakai sumber branch.

## Fitur

- **Image Tracking**: melacak gambar target dan menampilkan objek 3D.
- **Face Tracking**: menampilkan topi biru dan kacamata bundar virtual pada wajah.

Untuk Image Tracking, tampilkan atau cetak `prak 4(2)/tracking-build/assets/images/target-card.png` di depan kamera.
