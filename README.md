# FormaTiles Website - Quick Start Guide

Panduan lengkap & mudah cara menjalankan, mengedit, dan membuat website **FormaTiles** online secara **100% GRATIS (Biaya Rp 0)**.

---

## 1. Cara Melihat Website Saat Ini (Lokal di Komputer Anda)

Buka browser Anda (Google Chrome, Edge, Safari, dll.) lalu buka link ini:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 2. Halaman-Halaman Utama yang Bisa Dicoba

| Halaman | Fungsi | Link |
| :--- | :--- | :--- |
| **Beranda (Homepage)** | Galeri showroom arsitektur, katalog unggulan, dan kalkulator cepat | [http://localhost:3000](http://localhost:3000) |
| **Katalog Produk** | Cari & filter keramik, granit, wall panel, dan lantai SPC | [http://localhost:3000/catalog](http://localhost:3000/catalog) |
| **Kalkulator Keramik & SPC** | Hitung kebutuhan luas (m²), jumlah dus pabrik, dan kirim rincian ke WhatsApp | [http://localhost:3000/calculator](http://localhost:3000/calculator) |
| **Admin Portal** | Tambah produk baru, ubah harga, import data Excel/CSV, cek data prospek | [http://localhost:3000/admin](http://localhost:3000/admin) |

> 🌐 **Ganti Bahasa (Indonesia / English)**: Lihat di pojok kanan atas navbar website. Klik tombol **`ID | EN`** untuk beralih bahasa kapan saja!

---

## 3. Cara Masuk ke Halaman Admin (Dashboard)

1. Buka: **[http://localhost:3000/admin](http://localhost:3000/admin)**
2. Masukkan kunci rahasia / password:
   ```text
   formatiles2026
   ```
3. Klik tombol **"Authenticate & Enter Dashboard"**.

Di dalam dashboard admin, Anda bisa:
- **Tambah / Edit Produk**: Ganti foto, nama produk, ukuran (misal 60x120), dan kisaran harga.
- **Bulk Import CSV**: Upload file Excel/CSV ratusan keramik sekaligus (template contoh sudah disediakan di tombol *Download CSV Template*).
- **Inquiries & Leads**: Melihat siapa saja calon pelanggan yang meminta penawaran harga lewat website, dan langsung klik tombol WhatsApp untuk membalas mereka.

---

## 4. Cara Mengganti Nomor WhatsApp Sales

Buka file bernama `.env.local` di folder proyek ini:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=6281318867019
```
Ganti nomor tersebut dengan nomor WhatsApp Anda (diawali kode negara `62` untuk Indonesia, tanpa spasi dan tanda `+`).

---

## 5. CARA MEMBUAT WEBSITE INI ONLINE (LIVE DI INTERNET) 100% GRATIS!

Website ini dirancang khusus menggunakan teknologi modern yang **bebas biaya langganan awal ($0 Free Tier)**. 

Anda bisa meng-online-kan website ini dengan 2 langkah gratis berikut:

---

### LANGKAH A: Hosting Website di Vercel (100% GRATIS)
Vercel adalah layanan hosting resmi dari pembuat Next.js. Sangat cepat, aman, dan gratis selamanya untuk website Anda.

1. **Upload folder proyek ini ke GitHub**:
   - Buka [github.com](https://github.com) dan buat akun gratis jika belum punya.
   - Buat Repository baru (misal: `formatiles-website`).
   - Upload file website Anda ke repository tersebut.
2. **Sambungkan ke Vercel**:
   - Buka [vercel.com](https://vercel.com) dan daftar/login menggunakan akun GitHub Anda (Gratis).
   - Klik tombol **"Add New..."** → pilih **"Project"**.
   - Pilih repository `formatiles-website` Anda lalu klik **"Import"**.
3. **Masukkan Pengaturan Nomor WhatsApp**:
   - Di halaman setup Vercel, buka bagian **Environment Variables**.
   - Tambahkan:
     - Name: `NEXT_PUBLIC_WHATSAPP_NUMBER`
     - Value: `6281318867019` (atau nomor WA Anda)
   - Tambahkan juga:
     - Name: `ADMIN_SECRET_KEY`
     - Value: `formatiles2026`
4. **Klik "Deploy"**:
   - Dalam 1 menit, website Anda sudah **LIVE di internet** dengan alamat resmi gratis, contohnya: `https://formatiles.vercel.app`!
   - Siapa saja di seluruh dunia sekarang bisa membuka website Anda dari HP atau laptop.

---

### LANGKAH B: Database Cloud di Supabase (100% GRATIS)
Website ini sudah punya database lokal bawaan. Tetapi jika Anda ingin datanya tersimpan di Cloud Database profesional secara gratis:

1. Buka [supabase.com](https://supabase.com) dan buat akun gratis.
2. Klik **"New Project"**, beri nama misalnya `formatiles-db`, lalu buat password database.
3. Buka menu **"SQL Editor"** di sebelah kiri layar Supabase Anda:
   - Buka file [supabase/schema.sql](file:///c:/Users/ryanj/OneDrive/Documents/Website%20Keramik/supabase/schema.sql) di komputer Anda.
   - Copy semua isinya, paste ke SQL Editor di Supabase, lalu klik tombol hijau **"Run"**.
   - *Selesai! Tabel produk, kategori, foto, dan data pesan pelanggan sudah otomatis dibuatkan.*
4. **Hubungkan Supabase ke Website Anda**:
   - Di Supabase, buka menu **Project Settings (ikon gerigi) → API**.
   - Copy 2 data ini:
     - **Project URL**
     - **anon / public key**
   - Masukkan 2 data tersebut ke file `.env.local` di komputer Anda atau di **Environment Variables Vercel**:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
     ```
   - Sekarang database cloud Anda sudah aktif 100% gratis!

---

### LANGKAH C: Pasang Domain Sendiri (Opsional)
Jika nanti Anda membeli nama domain sendiri (misalnya `www.formatiles.com` atau `www.formatiles.id`):
- Di dashboard Vercel Anda, masuk ke **Settings → Domains**.
- Ketik nama domain Anda.
- Vercel akan otomatis menyambungkannya dan memberikan sertifikat keamanan SSL (HTTPS) **gratis**.

---

## 6. Cara Menjalankan atau Mematikan Website di Komputer

Jika komputer Anda pernah dimatikan dan ingin menjalankan website lagi di komputer:

1. Buka terminal / command prompt di folder ini.
2. Ketik perintah:
   ```bash
   npm run dev
   ```
3. Buka browser di [http://localhost:3000](http://localhost:3000).
