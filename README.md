# 🌿 FloraPedia Nusantara

**FloraPedia** adalah aplikasi ensiklopedia interaktif modern berbasis web yang menampung artikel komprehensif mengenai berbagai macam tanaman & tumbuhan, khasiat herbal bagi kesehatan manusia, resep pengolahan tradisional, serta panduan lengkap perawatan tanaman (sunlight, watering, soil, pests, tips panen).

Aplikasi ini dilengkapi dengan integrasi **Live REST API** dan **Google Gemini AI**.

---

## ✨ Fitur Utama

1. **Ensiklopedia & Artikel Tanaman Lengkap**
   - **Morfologi & Taksonomi**: Nama lokal, nama ilmiah (latin), famili botani, dan asal usul persebaran.
   - **Senyawa Fitokimia Aktif**: Kandungan kurkumin, gingerol, flavonoid, saponin, tanin, dsb.
   - **Khasiat Bagi Kesehatan Manusia**: Rincian manfaat klinis/empiris (organ target: lambung, paru/batuk, imunitas, ginjal, gula darah, jantung, kulit, dsb).
   - **Resep & Cara Olah Tradisional**: Takaran bahan, langkah pembuatan jamu/rebusan/teh/tapal, serta anjuran dosis harian.
   - **Panduan Perawatan Tumbuhan**: Kebutuhan sinar matahari, frekuensi penyiraman, jenis tanah/media tanam, pemupukan, suhu, hama & penyakit, cara perbanyakan (stek/tunas), dan tips pemanenan.
   - **Peringatan & Keamanan**: Peringatan medis, kontraindikasi (misal: ibu hamil, pasien ginjal/empedu), dan batas maksimal konsumsi.

2. **Koneksi Live API**:
   - 🌐 **Wikipedia Botanical REST API**: Terhubung langsung tanpa perlu API Key ke Wikipedia Foundation API. Pengguna dapat mencari nama spesies tanaman apa saja di dunia dan mengimpornya ke ensiklopedia pribadi dengan 1 klik.
   - 🤖 **Google Gemini 3.8 Flash AI**: 
     - **Tanya Pakar Botani (Dr. Botanika)**: Chatbot interaktif untuk konsultasi keluhan kesehatan manusia dan diagnosis masalah tanaman (daun kuning, busuk akar, hama).
     - **AI Article Generator**: Menghasilkan artikel ensiklopedia tanaman baru secara otomatis hanya dengan memasukkan nama tanaman.

3. **Jadwal & Pengingat Perawatan Tumbuhan (Plant Care Tracker)**
   - Mengelola jadwal siram air, pupuk organik, jemur matahari, atau pemangkasan.
   - Indikator status pintar: *Harus Hari Ini*, *Terlambat X Hari*, atau *X Hari Lagi*.
   - Tombol *Tandai Selesai* dengan rekalkulasi otomatis.

4. **Koleksi Favorit (Bookmarks)**
   - Simpan artikel tanaman favorit ke daftar koleksi lokal browser untuk akses cepat.

5. **Tulis Artikel Manual (CRUD)**
   - Formulir untuk menambahkan artikel tanaman kustom hasil kebun atau resep keluarga sendiri.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi berjalan pada server lokal:
```bash
npm run dev
```
Buka browser di: **http://localhost:5173/**

Untuk melakukan build produksi:
```bash
npm run build
```

---

## 🔑 Konfigurasi API Key (Opsional)

- **Wikipedia Botanical API**: Langsung aktif secara otomatis (gratis, tanpa kunci API).
- **Google Gemini AI**: Masuk ke menu **Pengaturan (ikon ⚙️)** di pojok kanan atas, lalu masukkan Google Gemini API Key Anda (dapat dibuat gratis di [Google AI Studio](https://aistudio.google.com/app/apikey)). Jika API Key belum diisi, Dr. Botanika tetap dapat menjawab menggunakan basis pengetahuan cerdas lokal bawaan aplikasi.
