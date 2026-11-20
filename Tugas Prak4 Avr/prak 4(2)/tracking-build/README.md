# Tracking Build - MindAR & Three.js (Pertemuan 4)

Proyek ini adalah implementasi praktikum Augmented Reality menggunakan pustaka **MindAR v1.2.5** dan **Three.js v0.160.0**.

## Identitas
- **Nama**: R Gilang Setyo Nugroho
- **NIM**: 2409020019
- **URL GitHub Pages**: https://gilangsetyo.github.io/arvr-prak4-2409020019/

## Fitur
1. **Demo 1: Image Tracking**
   - Melacak target gambar (`target-card.mind`).
   - Menampilkan objek 3D (Torus Knot) dan bingkai di atas target.
   - Menangani event `onTargetFound` dan `onTargetLost`.
2. **Demo 2: Face Tracking**
   - Melacak wajah pengguna menggunakan model neural network (CDN).
   - Menampilkan topi biru dan kacamata bundar virtual pada titik landmark 168 (antara mata).
   - Menampilkan status deteksi wajah secara real-time.

## Cara Menjalankan secara Lokal
1. Buka folder `tracking-build` di VS Code.
2. Gunakan ekstensi **Live Server** atau jalankan perintah berikut di terminal:
   ```bash
   python -m http.server 8080
   ```
3. Buka browser dan akses `http://localhost:8080`.
4. Pilih menu demo yang diinginkan dan tekan tombol **Mulai**.

## Membuka di HP
Kamera browser di HP hanya dapat digunakan melalui HTTPS. Buka tautan GitHub Pages ini, bukan halaman repositori GitHub yang menampilkan README:

**https://gilangsetyo.github.io/arvr-prak4-2409020019/**

Workflow `.github/workflows/deploy-pages.yml` menerbitkan isi folder ini sebagai akar situs. Di GitHub, pilih **Settings > Pages > Source: GitHub Actions**, lalu pastikan workflow berhasil pada tab **Actions**. Setelah itu buka tautan Pages di HP dan izinkan akses kamera.

Untuk Demo 1, arahkan kamera ke `assets/images/target-card.png` yang ditampilkan pada layar lain atau hasil cetak.

## Hasil Pengujian & Dokumentasi
- Laporan pengujian lengkap dapat dilihat di [docs/test-cases.md](./docs/test-cases.md).
- Matriks dukungan perangkat dapat dilihat di [docs/device-matrix.md](./docs/device-matrix.md).

## Masalah dan Investigasi
1. **Kendala**: Objek 3D pada face tracking awalnya tampak gelap gulita.
   - **Investigasi**: Kode menggunakan `MeshStandardMaterial` yang membutuhkan sumber cahaya.
   - **Perbaikan**: Menambahkan `HemisphereLight` dan `DirectionalLight` ke dalam scene.
2. **Kendala**: Face tracking gagal memuat di jaringan tertentu.
   - **Investigasi**: MindAR mengunduh model dari Google Storage dan JSDelivr. Jika diblokir, tracking tidak akan mulai.
   - **Solusi**: Menggunakan koneksi internet yang lebih stabil dan memastikan domain tersebut tidak diblokir.

## Keterbatasan
- Image tracking sangat bergantung pada kontras dan detail gambar target.
- Face tracking membutuhkan koneksi internet untuk mengunduh model saat pertama kali dijalankan.
- Tidak mendukung spatial mapping lingkungan secara luas (hanya berbasis target/wajah).
