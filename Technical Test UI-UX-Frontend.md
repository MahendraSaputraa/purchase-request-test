# Technical Test UI/UX & Frontend — Purchase Requests 

Batas Waktu: 1^2 hari 

Output: Desain Figma dan implementasi frontend 

Acuan Mockup Desain: Desain <u>Figma</u> 

Tugas Anda: 

### ��> Figma — UI/UX Design 

Analisis wireframe low-fidelity Purchase Requests yang diberikan. 

- Kembangkan wireframe menjadi desain high-fidelity dengan memperbaiki: 

   - Layout dan hierarki visual. 

   - Pemilihan warna. 

   - Tipografi. 

Spacing dan konsistensi antar komponen. 

Kejelasan alur pemesanan. 

Buat desain untuk: 

Desktop. 

Mobile atau responsive view. 

Sertakan kondisi dasar seperti: 

- Produk tersedia. 

- Produk habis. 

- Keranjang kosong. 

Produk sudah ditambahkan ke keranjang. 

Tombol dalam kondisi loading atau disabled. 

### ��> Front-end Slicing: 

Technical Test UI/UX & Frontend — Purchase Requests 

1 

Implementasikan desain Figma menggunakan salah satu teknologi berikut: 

- React. 

- Vue. 

- Next.js. 

HTML dengan Tailwind CSS. 

Implementasi tidak harus terhubung ke backend. Data produk dapat menggunakan mock data atau data statis. 

## Ketentuan Implementasi Frontend 

Gunakan pendekatan component-based. Jangan menulis seluruh halaman dalam satu file atau satu komponen besar. 

Pisahkan komponen berdasarkan fungsi dan tanggung jawabnya, misalnya: 

```
src/
├── components/
│   ├── ui/
│   │   ├── Button
│   │   ├── Input
│   │   ├── QuantityInput
│   │   ├── Badge
│   │   └── EmptyState
│   └── layout/
│       ├── Header
│       └── PageContainer
├── features/
-
│   └── purchaserequest/
│       ├── components/
│       │   ├── ProductCard
│       │   ├── ProductCatalog
│       │   ├── CartItem
│       │   ├── OrderSummary
│       │   └── PaymentMethod
│       ├── data/
```

Technical Test UI/UX & Frontend — Purchase Requests 

2 

```
│       │   └── products
│       └── PurchaseRequestPage
```

Struktur di atas hanya contoh. Kandidat boleh menggunakan struktur lain selama pembagian tanggung jawab komponennya jelas. 

## Best Practice yang Diharapkan 

- Komponen kecil, reusable, dan memiliki tanggung jawab yang jelas. 

- Tidak menduplikasi markup atau logic yang sama. 

- Daftar produk dirender dari data menggunakan proses mapping, bukan ditulis berulang secara manual. 

- State keranjang, jumlah produk, dan metode pembayaran dikelola dengan rapi. 

- Data, presentation component, dan business logic tidak seluruhnya dicampur dalam satu file. 

- Nama file, komponen, variabel, dan function mudah dipahami. 

- Tidak menggunakan terlalu banyak hardcoded value yang seharusnya dapat dijadikan data atau props. 

- Komponen menerima data melalui props dengan struktur yang jelas. 

- Memiliki validasi jumlah produk agar: 

   - Tidak kurang dari nol. 

   - Tidak melebihi stok. 

- Tombol submit memiliki state loading dan disabled untuk mencegah pengiriman berulang. 

- Tampilan responsif pada desktop dan mobile. 

- Menggunakan elemen HTML yang semantik dan memperhatikan aksesibilitas dasar. 

- Kode konsisten, bersih, dan mudah dikembangkan kembali. 

## Interaksi Minimum 

Technical Test UI/UX & Frontend — Purchase Requests 

3 

Frontend setidaknya harus mendukung: 

- Menambah dan mengurangi jumlah produk. 

- Menambahkan produk ke keranjang. 

- Menghapus produk dari keranjang. 

- Memperbarui subtotal dan total secara otomatis. 

- Memilih metode pembayaran. 

- Menampilkan keadaan keranjang kosong. 

- Menampilkan validasi ketika jumlah melebihi stok. 

- Menampilkan simulasi proses submit. 

- Accordion atau expand/collapse hanya perlu dibuat apabila memang digunakan dalam desain. 

## Tentang Produk 

Produk ini merupakan halaman internal yang digunakan outlet cabang untuk memesan kebutuhan operasional langsung ke Head Office, seperti modul, perlengkapan, dan produk pendukung lainnya. 

Pengguna utamanya adalah koordinator atau owner outlet dengan tingkat pemahaman teknologi yang beragam. Karena itu, desain harus sederhana, jelas, dan mudah digunakan untuk memilih produk, mengatur jumlah pesanan, melihat total biaya, memilih metode pembayaran, serta memantau riwayat pesanan. 

## Submission 

Cantumkan: 

Link Figma dengan akses view. 

- Link repository GitHub atau GitLab publik. 

- Petunjuk menjalankan project pada `README.md` . 

- Penjelasan singkat mengenai: 

   - Teknologi yang digunakan. 

   - Struktur komponen. 

Technical Test UI/UX & Frontend — Purchase Requests 

4 

- Keputusan UI/UX utama. 

Asumsi yang dibuat selama pengerjaan. 

Technical Test UI/UX & Frontend — Purchase Requests 

5 

