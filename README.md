# Demo

https://purchase-request-test.vercel.app/

# Purchase Request — My Anemone

Implementasi frontend untuk halaman internal pemesanan stok cabang ke Head Office.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Halaman riwayat pesanan ada di `/history`.

Tidak ada koneksi backend — seluruh data produk, cabang, payment method, dan riwayat pesanan menggunakan mock data statis di `src/data/`.

## Teknologi yang digunakan

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui pattern** (Button, Card, Badge, Sheet, Spinner) — komponen di-copy manual ke `src/components/ui` mengikuti konvensi shadcn (bukan dependency npm), sehingga tetap mudah dikustomisasi.
- **Radix UI** (`react-dialog`, `react-slot`) sebagai primitive accessible untuk Sheet/bottom sheet.
- **lucide-react** untuk ikon.

## Struktur komponen

```
src/
├── app/
│   ├── layout.tsx            → root layout dan font global
│   ├── page.tsx              → route "/", merender PurchaseRequestPage
│   └── history/page.tsx      → route "/history", merender OrderHistoryPage
├── components/
│   ├── ui/                   → shared UI primitives: Button, Card, Badge,
│   │                           Input, Pagination, QuantityInput, Select,
│   │                           Sheet, Spinner, EmptyState
│   └── layout/                → Header, PageContainer
├── data/                     → mock data untuk frontend tanpa backend
│   ├── products.ts
│   ├── payment-methods.ts
│   └── orders.ts
├── features/
│   ├── purchase-request/
│   │   ├── components/       → ProductFilters, ProductCatalog, ProductCard,
│   │   │                           CartItem, OrderSummary, CartFab,
│   │   │                           PaymentMethodSelector
│   │   ├── hooks/            → use-cart.ts untuk business logic cart
│   │   ├── types.ts          → tipe `Product`, `CartLine`, `PaymentMethodId`
│   │   └── purchase-request-page.tsx
│   └── order-history/
│       ├── order-history-page.tsx
│       └── components/OrderHistoryList.tsx
├── lib/                      → util dan helper shared
│   ├── utils.ts              → `cn()` helper untuk menggabungkan className
│   ├── format-rupiah.ts      → helper format mata uang IDR
│   └── product.ts            → helper status stok
└── app/globals.css           → global Tailwind CSS dan tema
```

Struktur ini menunjukkan pembagian responsibilitas yang jelas:

- `components/ui/` untuk primitive UI reusable.
- `features/` untuk komponen fungsional, state, dan logika domain.
- `data/` untuk mock data statis.
- `lib/` untuk helper utilities.

`hooks/use-cart.ts` menyimpan seluruh logic (state, validasi, kalkulasi harga)
sehingga komponen presentasi (`ProductCard`, `OrderSummary`, `CartFab`, dst)
murni menerima data lewat props. `OrderSummaryFields` diekstrak sebagai isi
ringkasan pesanan yang dipakai ulang persis sama di card sticky desktop
(`OrderSummary`) maupun bottom sheet mobile (`CartFab`) — tidak ada
duplikasi markup/logic antara dua tampilan tersebut.

## Keputusan UI/UX utama

1. **Layout desktop 2 kolom** — katalog produk (grid 2 kolom agar user melihat produk lebih lega dan tidak terlalu besar atau terlalu kecil, card horizontal:
   gambar kiri, info kanan) dengan cart sticky di kanan, plus pagination di
   bawah katalog.
2. **Cart di mobile jadi floating action button** — panel cart desktop
   di-`hidden` di layar sempit, digantikan tombol bulat mengambang di kanan
   bawah (dengan badge jumlah item) yang membuka ringkasan pesanan sebagai
   bottom sheet. Ini menghindari cart penuh memenuhi layar sempit sekaligus
   tetap membuat total pesanan mudah diakses kapan saja.
3. **Warna diturunkan dari brand** — teal (`--primary`) untuk aksi utama,
   magenta (`--secondary`) untuk nominal harga/diskon yang perlu menonjol,
   kuning dibatasi pemakaiannya.
4. **Validasi qty dua arah** — tombol +/- dan input angka manual sama-sama
   di-clamp ke rentang [0, stok] di `use-cart.ts`.
5. **Tombol submit** memakai komponen `Spinner` (state loading) dan otomatis
   `disabled` selama proses berjalan, mencegah submit ganda.
6. **Halaman Order History dipisah** (`/history`) karena disebutkan eksplisit
   di bagian "Tentang Produk" pada brief .

## Asumsi yang dibuat

- **Discount** dihitung otomatis flat 10% dari subtotal, dipotong
  sebelum pajak dihitung: `total = (subtotal - discount) + tax + ongkir`.
- **Metode pembayaran** memakai label "Cash" mengikuti keputusan final di desain Figma.
- **Expedisi** ditampilkan sebagai nilai mock statis,
  bukan pilihan ekspedisi yang bisa diubah user, karena tidak ada
  requirement backend untuk kalkulasi ongkir real per ekspedisi.
- **Pagination** memakai ukuran halaman kecil (8 produk/halaman) supaya
  perilakunya bisa didemokan dengan mock data yang tersedia
