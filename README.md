# Fika Family's — Sakinah Mawaddah Warohmah

Aplikasi web Islami interaktif (PWA / *Progressive Web App*) untuk keluarga. Aplikasi ini dapat dipasang langsung ke **Layar Utama (Home Screen)** smartphone Android maupun iPhone dan tetap berjalan saat offline.

## Fitur Utama

- **Beranda Keluarga & Hitung Mundur**: Tanggal Masehi & Hijriah, hitung mundur waktu sholat berikutnya, hitung mundur buka puasa (Maghrib) / Imsak, hitung mundur Ramadhan, serta **Tracker Ibadah Keluarga** (Ayah, Ibu, Anak) yang tersimpan otomatis di perangkat.
- **Jadwal Sholat & Arah Kiblat**: Pilihan kota di Indonesia (Jakarta, Bandung, Tegal, Yogyakarta, Semarang, Medan, Makassar, dll.) menggunakan API Aladhan (metode Kemenag RI) dengan cadangan jadwal lokal, pengingat waktu adzan, dan kompas arah kiblat.
- **Dzikir & Doa Keluarga**: Dzikir setelah sholat berurutan dengan tasbih klik-hitung 33x, doa harian keluarga, transliterasi Latin, terjemahan Indonesia, tombol salin doa, dan pengatur ukuran huruf Arab.
- **Al-Qur'an Digital**: 114 Surah lengkap dengan pencarian, filter Makkiyah/Madaniyah, terjemahan Kemenag RI, audio murottal, dan penanda *Terakhir Dibaca*.
- **Belajar Tajwid Interaktif**: Materi hukum Nun Sukun & Tanwin, Mim Sukun, Qalqalah, dan Mad Thabi'i dengan sorotan warna huruf serta kuis 5 soal acak.
- **PWA & Mode Gelap**: Mendukung Mode Gelap untuk kenyamanan membaca malam dan dapat diinstal ke layar muka smartphone.

---

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Untuk memeriksa tipe TypeScript dan membuat build produksi:

```bash
npm run lint
npm run build
```

---

## Deploy ke GitHub Pages (GitHub Actions)

Repo: **Alamudin-Family** (GitHub mengubah spasi pada nama "Alamudin Family" menjadi tanda hubung).
Alamat situs: `https://USERNAME.github.io/Alamudin-Family/`

1. Upload semua file sumber ke branch `main` (**Add file → Upload files**; sertakan folder `.github`, `public`, `src`, dan `package-lock.json`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Buka tab **Actions**; workflow "Deploy ke GitHub Pages" akan berjalan otomatis setiap ada push ke `main`.

Jika nama repo diganti, ubah `BASE` di `vite.config.ts`.
