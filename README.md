# DOKUMENTASI API

**Auth API**

Base path: `/auth`

**Endpoints**

| Method | Path             | Auth                | Deskripsi                               |
| ------ | ---------------- | ------------------- | --------------------------------------- |
| POST   | `/auth/register` | Public              | Daftarkan akun.                         |
| POST   | `/auth/login`    | Public              | Masuk dengan akun yang telah terdaftar. |
| GET    | `/auth/me`       | `user` `super_user` | Mendapatkan informasi akun.             |

**Body (POST /auth/register)**
Semua field wajib diisi.

- `email`: string, email
- `password`: string, min 8, max 12
- `firstname`: string, min 1, max 50
- `lastname`: string, min 1, max 50

**Body (POST /auth/login)**
Semua field wajib diisi.

- `email`: string, email
- `password`: string, min 8, max 12

**Contoh Request Dan Response (POST /auth/register)**

```bash
curl --location 'https://api.v2.mugni.my.id/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "asepam@gmail.com",
    "password" : "rajajaya",
    "firstname": "Asep",
    "lastname": "Mugni"
}'
```

```json
{
  "status": 201,
  "message": "Pendaftaran berhasil.",
  "data": {
    "id": "cmmsi8maw000004jjuk14uo80",
    "email": "asepam@gmail.com",
    "firstname": "Asep",
    "avatar": null,
    "lastname": "Mugni",
    "fullname": "Asep Mugni",
    "provider": "default",
    "role": "user",
    "created_at": "2026-03-16T01:28:29.672Z",
    "updated_at": "2026-03-16T01:28:29.672Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (POST /auth/login)**

```bash
curl --location 'https://api.v2.mugni.my.id/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "abankr342@gmail.com",
    "password" : "mafiabeas"
}'
```

```json
{
  "status": 200,
  "message": "Masuk berhasil, Selamat datang kembali.",
  "data": {
    "token": "<token>",
    "user": {
      "id": "cmm05007r000204i3gsbt89th",
      "email": "abankr342@gmail.com",
      "firstname": "Asep",
      "avatar": null,
      "password": null,
      "lastname": "Abdul Mugni",
      "fullname": "Asep Abdul Mugni",
      "provider": "default",
      "role": "super_user",
      "created_at": "2026-02-24T05:00:19.863Z",
      "updated_at": "2026-02-24T05:00:19.863Z"
    }
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (GET /auth/me)**

```bash
curl --location 'https://api.v2.mugni.my.id/auth/me' \
--header 'Authorization: Bearer <token>'
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data pengguna.",
  "data": {
    "id": "cmm05007r000204i3gsbt89th",
    "email": "abankr342@gmail.com",
    "firstname": "Asep",
    "avatar": null,
    "lastname": "Abdul Mugni",
    "fullname": "Asep Abdul Mugni",
    "provider": "default",
    "role": "super_user",
    "created_at": "2026-02-24T05:00:19.863Z",
    "updated_at": "2026-02-24T05:00:19.863Z"
  },
  "meta": null,
  "errors": null
}
```

**News API**

Base path: `/news`

**Endpoints**

| Method | Path        | Auth         | Deskripsi                                     |
| ------ | ----------- | ------------ | --------------------------------------------- |
| GET    | `/news`     | Public       | Ambil daftar berita (pagination + pencarian). |
| GET    | `/news/:id` | Public       | Ambil detail berita.                          |
| POST   | `/news`     | `super_user` | Buat berita baru.                             |
| PUT    | `/news/:id` | `super_user` | Perbarui berita.                              |
| DELETE | `/news/:id` | `super_user` | Hapus berita.                                 |

**Query Params (GET /news)**

- `search`: string, opsional. Pencarian teks bebas.
- `limit`: number, opsional. Default `10`.
- `page`: number, opsional. Default `1`.
- `order_by`: string, opsional. Default `created_at`.
- `sort_by`: asc dan desc, opsional. Default `desc`.

**Body (POST /news)**
Semua field wajib diisi.

- `image_url`: string, min 5, max 500
- `title`: string, min 3, max 150
- `summary`: string, min 10, max 5000
- `content`: string, min 10, max 100000

**Body (PUT /news/:id)**
Semua field opsional, tapi jika dikirim harus sesuai validasi.

- `image_url`: string, min 5, max 500
- `title`: string, min 3, max 150
- `summary`: string, min 10, max 5000
- `content`: string, min 10, max 100000

**Contoh Request Dan Response (GET /news)**

```bash
curl --location 'https://api.v2.mugni.my.id/news'
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data berita.",
  "data": [
    {
      "id": "ckxyz...",
      "image_url": "https://cdn.example.com/news/1.jpg",
      "title": "Promo Akhir Pekan",
      "summary": "Ringkasan berita...",
      "content": "Konten lengkap berita...",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "search": "promo",
    "page": 1,
    "limit": 10,
    "offset": 0,
    "total": 1,
    "order_by": "created_at",
    "sort_by": "desc"
  },
  "errors": null
}
```

**Contoh Request Dan Response (GET /news/:id)**

```bash
curl --location 'https://api.v2.mugni.my.id/news/ckxyz...'
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil detail berita.",
  "data": {
    "id": "ckxyz...",
    "image_url": "https://cdn.example.com/news/1.jpg",
    "title": "Promo Akhir Pekan",
    "summary": "Ringkasan berita...",
    "content": "Konten lengkap berita...",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (POST /news)**

```bash
curl --location 'https://api.v2.mugni.my.id/news' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "image_url": "https://testasd.com",
    "title" : "Naik Harga",
    "summary": "asdasasdasdasdd",
    "content" : "Kini bla bla bla bla"
}'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat berita.",
  "data": {
    "id": "cmmsin86x000104jjvsa9ousd",
    "image_url": "https://testasd.com",
    "title": "Naik Harga",
    "summary": "asdasasdasdasdd",
    "content": "Kini bla bla bla bla",
    "created_at": "2026-03-16T01:39:51.225Z",
    "updated_at": "2026-03-16T01:39:51.225Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (PUT /news/:id)**

```bash
curl --location --request PUT 'https://api.v2.mugni.my.id/news/cmmsin86x000104jjvsa9ousd' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "image_url": "https://testasdupdate.com",
    "title" : "Naik Harga (update)",
    "summary": "asdasasdasdasdd (update)",
    "content" : "Kini bla bla bla bla (update)"
}'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui berita.",
  "data": {
    "id": "cmmsin86x000104jjvsa9ousd",
    "image_url": "https://testasdupdate.com",
    "title": "Naik Harga (update)",
    "summary": "asdasasdasdasdd (update)",
    "content": "Kini bla bla bla bla (update)",
    "created_at": "2026-03-16T01:39:51.225Z",
    "updated_at": "2026-03-16T01:43:16.917Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (DELETE /news/:id)**

```bash
curl --location --request DELETE 'https://api.v2.mugni.my.id/news/cmmsin86x000104jjvsa9ousd' \
--header 'Authorization: Bearer <token>'
```

```json
{
  "status": 200,
  "message": "Berhasil menghapus berita.",
  "data": {
    "id": "cmmsin86x000104jjvsa9ousd",
    "image_url": "https://testasdupdate.com",
    "title": "Naik Harga (update)",
    "summary": "asdasasdasdasdd (update)",
    "content": "Kini bla bla bla bla (update)",
    "created_at": "2026-03-16T01:39:51.225Z",
    "updated_at": "2026-03-16T01:43:16.917Z"
  },
  "meta": null,
  "errors": null
}
```

**Category API**

Base path: `/category`

**Endpoints**

| Method | Path            | Auth         | Deskripsi                                       |
| ------ | --------------- | ------------ | ----------------------------------------------- |
| GET    | `/category`     | Public       | Ambil daftar kategori (pagination + pencarian). |
| GET    | `/category/:id` | Public       | Ambil detail kategori.                          |
| POST   | `/category`     | `super_user` | Buat kategori baru.                             |
| PUT    | `/category/:id` | `super_user` | Perbarui kategori.                              |
| DELETE | `/category/:id` | `super_user` | Hapus kategori.                                 |

**Query Params (GET /category)**

- `search`: string, opsional. Pencarian teks bebas.
- `limit`: number, opsional. Default `10`.
- `page`: number, opsional. Default `1`.
- `order_by`: string, opsional. Default `created_at`.
- `sort_by`: asc dan desc, opsional. Default `desc`.
- `type`: credit | quota | games | bill | credit_quota, opsional.

**Body (POST /category)**
Semua field wajib diisi.

- `title`: string, min 3, max 150
- `studio`: string, min 3, max 50
- `image_url`: string, min 5, max 500
- `cover_url`: string, min 5, max 500
- `type`: credit | quota | games | bill | credit_quota
- `column_1`: boolean
- `column_2`: boolean
- `column_1_title`: string, min 1, max 100
- `column_2_title`: string, min 1, max 100

**Body (PUT /category/:id)**
Semua field opsional, tapi jika dikirim harus sesuai validasi.

- `title`: string, min 3, max 150
- `studio`: string, min 3, max 50
- `image_url`: string, min 5, max 500
- `cover_url`: string, min 5, max 500
- `type`: credit | quota | games | bill | credit_quota
- `column_1`: boolean
- `column_2`: boolean
- `column_1_title`: string, min 1, max 100
- `column_2_title`: string, min 1, max 100

**Contoh Request Dan Response (GET /category)**

```bash
curl --location 'https://api.v2.mugni.my.id/category?limit=1&page=1&order_by=id&sort_by=asc&type=credit_quota'
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data kategori.",
  "data": [
    {
      "id": "cmlp3jpk60001vq0ipw0s7grj",
      "title": "AXIS",
      "studio": "AXIS Provider",
      "image_url": "https://ik.imagekit.io/8fifwnm7r/uploads/axis_9Ku9KJfoWd.webp",
      "cover_url": "https://ik.imagekit.io/8fifwnm7r/uploads/axis-banner__wLYgXIEe.webp",
      "column_1": true,
      "column_2": false,
      "column_1_title": "Nomer Telepon",
      "column_2_title": "No Title",
      "type": "credit_quota",
      "created_at": "2026-02-16T11:34:12.006Z",
      "updated_at": "2026-03-15T14:56:48.985Z"
    }
  ],
  "meta": {
    "search": "",
    "limit": 1,
    "page": 1,
    "offset": 0,
    "order_by": "id",
    "sort_by": "asc",
    "total": 7
  },
  "errors": null
}
```

**Contoh Request Dan Response (GET /category/:id)**

```bash
curl --location 'https://api.v2.mugni.my.id/category/cmlp3jpk60001vq0ipw0s7grj'
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil detail kategori.",
  "data": {
    "id": "cmlp3jpk60001vq0ipw0s7grj",
    "title": "AXIS",
    "studio": "AXIS Provider",
    "image_url": "https://ik.imagekit.io/8fifwnm7r/uploads/axis_9Ku9KJfoWd.webp",
    "cover_url": "https://ik.imagekit.io/8fifwnm7r/uploads/axis-banner__wLYgXIEe.webp",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Nomer Telepon",
    "column_2_title": "No Title",
    "type": "credit_quota",
    "created_at": "2026-02-16T11:34:12.006Z",
    "updated_at": "2026-03-15T14:56:48.985Z",
    "items": [
      {
        "id": "coyuuca...",
        "title": "Diamond 12",
        "image_url": "https://cdn.example.com/item/1.jpg",
        "price": 1000,
        "stock": 0,
        "unlimited_stock": true,
        "seller_name": "MUGNI STORE",
        "sku_code": "BYD130",
        "created_at": "2026-03-05T05:20:41.648Z",
        "updated_at": "2026-03-05T07:00:39.053Z",
        "category_id": "cmlp3jpk60001vq0ipw0s7grj"
      }
    ]
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (POST /category)**

```bash
curl --location 'https://api.v2.mugni.my.id/category' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "title": "BYU",
    "studio": "BYU Provider",
    "image_url": "https://topup.ebelanja.id/_next/image?url=https%3A%2F%2Fs3.belanjapasti.com%2Fmedia%2Fimage%2Fbyu-339017.png&w=384&q=75",
    "cover_url": "https://thelazy.media/wp-content/uploads/2025/05/Cover-Artikel-G2G.png",
    "type": "credit",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Nomer Telepon",
    "column_2_title": "No Title"
}'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat kategori.",
  "data": {
    "id": "cmmsj6kq8000004jv0tgrpuba",
    "title": "BYU",
    "studio": "BYU Provider",
    "image_url": "https://topup.ebelanja.id/_next/image?url=https%3A%2F%2Fs3.belanjapasti.com%2Fmedia%2Fimage%2Fbyu-339017.png&w=384&q=75",
    "cover_url": "https://thelazy.media/wp-content/uploads/2025/05/Cover-Artikel-G2G.png",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Nomer Telepon",
    "column_2_title": "No Title",
    "type": "credit",
    "created_at": "2026-03-16T01:54:53.936Z",
    "updated_at": "2026-03-16T01:54:53.936Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (PUT /category/:id)**

```bash
curl --location --request PUT 'https://api.v2.mugni.my.id/category/cmmsj6kq8000004jv0tgrpuba' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "title": "BYU (update)",
    "studio": "BYU Provider (update)",
    "image_url": "https://topup.ebelanja.id/_next/image?url=https%3A%2F%2Fs3.belanjapasti.com%2Fmedia%2Fimage%2Fbyu-339017.png&w=384&q=75update",
    "cover_url": "https://thelazy.media/wp-content/uploads/2025/05/Cover-Artikel-G2G.png",
    "type": "credit_quota",
    "column_1": true,
    "column_2": true,
    "column_1_title": "Nomer Telepon (update)",
    "column_2_title": "Nomer togel"
}'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui kategori.",
  "data": {
    "id": "cmmsj6kq8000004jv0tgrpuba",
    "title": "BYU (update)",
    "studio": "BYU Provider (update)",
    "image_url": "https://topup.ebelanja.id/_next/image?url=https%3A%2F%2Fs3.belanjapasti.com%2Fmedia%2Fimage%2Fbyu-339017.png&w=384&q=75update",
    "cover_url": "https://thelazy.media/wp-content/uploads/2025/05/Cover-Artikel-G2G.png",
    "column_1": true,
    "column_2": true,
    "column_1_title": "Nomer Telepon (update)",
    "column_2_title": "Nomer togel",
    "type": "credit_quota",
    "created_at": "2026-03-16T01:54:53.936Z",
    "updated_at": "2026-03-16T01:58:55.569Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (DELETE /category/:id)**

```bash
curl --location --request DELETE 'https://api.v2.mugni.my.id/category/cmmsj6kq8000004jv0tgrpuba' \
--header 'Authorization: Bearer <token>'
```

```json
{
  "status": 200,
  "message": "Berhasil menghapus kategori.",
  "data": {
    "id": "cmmsj6kq8000004jv0tgrpuba",
    "title": "BYU (update)",
    "studio": "BYU Provider (update)",
    "image_url": "https://topup.ebelanja.id/_next/image?url=https%3A%2F%2Fs3.belanjapasti.com%2Fmedia%2Fimage%2Fbyu-339017.png&w=384&q=75update",
    "cover_url": "https://thelazy.media/wp-content/uploads/2025/05/Cover-Artikel-G2G.png",
    "column_1": true,
    "column_2": true,
    "column_1_title": "Nomer Telepon (update)",
    "column_2_title": "Nomer togel",
    "type": "credit_quota",
    "created_at": "2026-03-16T01:54:53.936Z",
    "updated_at": "2026-03-16T01:58:55.569Z"
  },
  "meta": null,
  "errors": null
}
```

**Item API**

Base path: `/item`

**Endpoints**

| Method | Path        | Auth         | Deskripsi                                   |
| ------ | ----------- | ------------ | ------------------------------------------- |
| GET    | `/item`     | Public       | Ambil daftar item (pagination + pencarian). |
| POST   | `/item`     | `super_user` | Buat item baru.                             |
| PUT    | `/item/:id` | `super_user` | Perbarui item.                              |
| DELETE | `/item/:id` | `super_user` | Hapus item.                                 |

**Query Params (GET /item)**

- `search`: string, opsional. Pencarian teks bebas.
- `limit`: number, opsional. Default `10`.
- `page`: number, opsional. Default `1`.
- `order_by`: string, opsional. Default `sku_code`.
- `sort_by`: asc dan desc, opsional. Default `desc`.

**Body (POST /item)**
Semua field wajib diisi.

- `title`: string, max 50
- `image_url`: string, min 5, max 500
- `price`: number, min 0
- `stock`: number, min 0
- `unlimited_stock`: boolean
- `seller_name`: string, max 50
- `sku_code`: string, max 10
- `category_id`: string

**Body (PUT /item/:id)**
Semua field opsional, tapi jika dikirim harus sesuai validasi.

- `title`: string, max 50
- `image_url`: string, min 5, max 500
- `price`: number, min 0
- `stock`: number, min 0
- `unlimited_stock`: boolean
- `seller_name`: string, max 50
- `sku_code`: string, max 10
- `category_id`: string

**Contoh Request Dan Response (GET /item)**

```bash
curl -X GET "http://localhost:5055/item?search=sku&limit=10&page=1"   -H "Content-Type: application/json"
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data item.",
  "data": [
    {
      "id": "ckxyz...",
      "title": "Item A",
      "image_url": "https://cdn.example.com/item/1.jpg",
      "price": 10000,
      "stock": 50,
      "unlimited_stock": false,
      "seller_name": "Seller A",
      "sku_code": "SKU001",
      "category_id": "cat123...",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "search": "sku",
    "page": 1,
    "limit": 10,
    "offset": 0,
    "total": 1,
    "order_by": "sku_code",
    "sort_by": "desc"
  },
  "errors": null
}
```

**Contoh Request Dan Response (POST /item)**

```bash
curl -X POST "http://localhost:5055/item"   -H "Content-Type: application/json"   -H "Authorization: Bearer <token>"   -d '{
    "title": "Item A",
    "image_url": "https://cdn.example.com/item/1.jpg",
    "price": 10000,
    "stock": 50,
    "unlimited_stock": false,
    "seller_name": "Seller A",
    "sku_code": "SKU001",
    "category_id": "cat123..."
  }'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat item.",
  "data": {
    "id": "ckxyz...",
    "title": "Item A",
    "image_url": "https://cdn.example.com/item/1.jpg",
    "price": 10000,
    "stock": 50,
    "unlimited_stock": false,
    "seller_name": "Seller A",
    "sku_code": "SKU001",
    "category_id": "cat123...",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (PUT /item/:id)**

```bash
curl -X PUT "http://localhost:5055/item/ckxyz..."   -H "Content-Type: application/json"   -H "Authorization: Bearer <token>"   -d '{
    "title": "Item A (Update)",
    "stock": 40
  }'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui item.",
  "data": {
    "id": "ckxyz...",
    "title": "Item A (Update)",
    "image_url": "https://cdn.example.com/item/1.jpg",
    "price": 10000,
    "stock": 40,
    "unlimited_stock": false,
    "seller_name": "Seller A",
    "sku_code": "SKU001",
    "category_id": "cat123...",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-02T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (DELETE /item/:id)**

```bash
curl -X DELETE "http://localhost:5055/item/ckxyz..."   -H "Content-Type: application/json"   -H "Authorization: Bearer <token>"
```

```json
{
  "status": 200,
  "message": "Berhasil menghapus item.",
  "data": {
    "id": "ckxyz...",
    "title": "Item A",
    "image_url": "https://cdn.example.com/item/1.jpg",
    "price": 10000,
    "stock": 50,
    "unlimited_stock": false,
    "seller_name": "Seller A",
    "sku_code": "SKU001",
    "category_id": "cat123...",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Carousel API**

Base path: `/carousel`

**Endpoints**

| Method | Path            | Auth         | Deskripsi                                       |
| ------ | --------------- | ------------ | ----------------------------------------------- |
| GET    | `/carousel`     | Public       | Ambil daftar carousel (pagination + pencarian). |
| POST   | `/carousel`     | `super_user` | Buat carousel baru.                             |
| PUT    | `/carousel/:id` | `super_user` | Perbarui carousel.                              |
| DELETE | `/carousel/:id` | `super_user` | Hapus carousel.                                 |

**Query Params (GET /carousel)**

- `search`: string, opsional. Pencarian teks bebas.
- `limit`: number, opsional. Default `10`.
- `page`: number, opsional. Default `1`.
- `order_by`: string, opsional. Default `created_at`.
- `sort_by`: asc dan desc, opsional. Default `desc`.

**Body (POST /carousel)**

Semua field wajib diisi.

- `title`: string, min 1, max 150
- `description`: string, min 10, max 150
- `image_url`: string, min 1, max 500
- `link`: string, min 1, max 500
- `is_active`: boolean

**Body (PUT /carousel/:id)**

Semua field opsional, tapi jika dikirim harus sesuai validasi.

- `title`: string, min 1, max 150
- `description`: string, min 10, max 150
- `image_url`: string, min 1, max 500
- `link`: string, min 1, max 500
- `is_active`: boolean

**Contoh Response (GET /carousel)**

```bash
curl -X GET "http://localhost:5055/carousel?search=promo&limit=10&page=1" \
  -H "Content-Type: application/json"
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data carousel.",
  "data": [
    {
      "id": "ckxyz...",
      "title": "Promo Akhir Pekan",
      "description": "Deskripsi singkat carousel...",
      "image_url": "https://cdn.example.com/carousel/1.jpg",
      "link": "https://example.com/promo",
      "is_active": true,
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "search": "promo",
    "page": 1,
    "limit": 10,
    "offset": 0,
    "total": 1,
    "order_by": "created_at",
    "sort_by": "desc"
  },
  "errors": null
}
```

**Contoh Response (POST /carousel)**

```bash
curl -X POST "http://localhost:5055/carousel" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Promo Akhir Pekan",
    "description": "Deskripsi singkat carousel...",
    "image_url": "https://cdn.example.com/carousel/1.jpg",
    "link": "https://example.com/promo",
    "is_active": true
  }'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat carousel.",
  "data": {
    "id": "ckxyz...",
    "title": "Promo Akhir Pekan",
    "description": "Deskripsi singkat carousel...",
    "image_url": "https://cdn.example.com/carousel/1.jpg",
    "link": "https://example.com/promo",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Response (PUT /carousel/:id)**

```bash
curl -X PUT "http://localhost:5055/carousel/ckxyz..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Promo Akhir Pekan (Update)",
    "is_active": false
  }'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui carousel.",
  "data": {
    "id": "ckxyz...",
    "title": "Promo Akhir Pekan (Update)",
    "description": "Deskripsi singkat carousel...",
    "image_url": "https://cdn.example.com/carousel/1.jpg",
    "link": "https://example.com/promo",
    "is_active": false,
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-02T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Response (DELETE /carousel/:id)**

```bash
curl -X DELETE "http://localhost:5055/carousel/ckxyz..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>"
```

```json
{
  "status": 200,
  "message": "Berhasil menghapus carousel.",
  "data": {
    "id": "ckxyz...",
    "title": "Promo Akhir Pekan",
    "description": "Deskripsi singkat carousel...",
    "image_url": "https://cdn.example.com/carousel/1.jpg",
    "link": "https://example.com/promo",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Order API**

Base path: `/order`

**Endpoints**

| Method | Path         | Auth                | Deskripsi                                    |     |     |
| ------ | ------------ | ------------------- | -------------------------------------------- | --- | --- |
| GET    | `/order`     | `user` `super_user` | Ambil daftar order (pagination + pencarian). |     |     |
| GET    | `/order/:id` | `user` `super_user` | Ambil detail order.                          |     |     |
| POST   | `/order`     | `user` `super_user` | Buat order baru.                             |     |     |
| PUT    | `/order/:id` | `user` `super_user` | Perbarui order.                              |     |     |

**Query Params (GET /order)**

- `search`: string, opsional. Pencarian teks bebas.
- `limit`: number, opsional. Default `10`.
- `page`: number, opsional. Default `1`.
- `order_by`: string, opsional. Default `created_at`.
- `sort_by`: asc dan desc, opsional. Default `desc`.

**Body (POST /order)**

Semua field wajib diisi.

- `destination`: string, min 6, max 100
- `destination_second`: string, min 4, max 100
- `item_id`: string, cuid

**Contoh Request Dan Response (GET /order)**

```bash
curl --location 'https://api.v2.mugni.my.id/order?search=AA1C405A&page=2&order_by=expires_at&sort_by=desc&limit=1' \
--header 'Authorization: <token>' \
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data transaksi.",
  "data": [
    {
      "id": "cmmr66hix0001m70ik3ncbqss",
      "transaction_id": "MUGN-260315-84D66F55",
      "transaction_invoice": null,
      "amount": 1000,
      "destination": "90912123123",
      "destination_second": null,
      "status": "expired",
      "expires_at": "2026-03-15T03:13:08.592Z",
      "paid_at": null,
      "created_at": "2026-03-15T03:03:08.601Z",
      "item_id": "cmmd0ouy8000004l4yittfozy",
      "item": {
        "id": "cmmd0ouy8000004l4yittfozy",
        "title": "By.U Data 1GB / 30 Hr",
        "category_id": "cmmbewtrf000004l2h49e8cvz",
        "category": {
          "image_url": "https://ik.imagekit.io/8fifwnm7r/uploads/byu_o9jTn3Czc.webp",
          "title": "BYU"
        }
      }
    }
  ],
  "meta": {
    "limit": 1,
    "offset": 1,
    "page": 2,
    "search": "",
    "order_by": "expires_at",
    "sort_by": "desc",
    "total": 5
  },
  "errors": null
}
```

**Contoh Request Dan Response (GET /order/:id)**

```bash
curl --location 'https://api.v2.mugni.my.id/order/MUGN-260315-15DC088A' \
--header 'Authorization: Bearer <token>'
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil detail transaksi.",
  "data": {
    "id": "cmmromee10000n30ihboq7ok5",
    "transaction_id": "MUGN-260315-15DC088A",
    "transaction_invoice": null,
    "amount": 1001,
    "destination": "085683737564",
    "destination_second": null,
    "status": "expired",
    "qris_url": "https://qris.pw/public/qr/qr_1773571373_1001.png",
    "qris_string": "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214251114147015990303UMI51440014ID.CO.QRIS.WWW0215ID20254541657830303UMI520454115303360540410015802ID5920Toko Yudha Ok26937136005MEDAN61052002862070703A0163047FF8",
    "expires_at": "2026-03-15T11:49:24.032Z",
    "paid_at": null,
    "created_at": "2026-03-15T11:39:24.117Z",
    "updated_at": "2026-03-15T12:59:01.097Z",
    "user_id": "cmm05007r000204i3gsbt89th",
    "item_id": "cmmd0ouy8000004l4yittfozy",
    "user": {
      "id": "cmm05007r000204i3gsbt89th",
      "email": "abankr342@gmail.com",
      "firstname": "Asep",
      "avatar": null,
      "lastname": "Abdul Mugni",
      "fullname": "Asep Abdul Mugni"
    },
    "item": {
      "id": "cmmd0ouy8000004l4yittfozy",
      "title": "By.U Data 1GB / 30 Hr",
      "image_url": "https://ik.imagekit.io/8fifwnm7r/uploads/smartphone_YEiCu0ltCI.svg",
      "price": 1000,
      "stock": 0,
      "unlimited_stock": true,
      "seller_name": "MUGNI STORE",
      "sku_code": "BYD130",
      "category_id": "cmmbewtrf000004l2h49e8cvz",
      "category": {
        "type": "credit_quota",
        "column_1_title": "Nomer Telepon",
        "image_url": "https://ik.imagekit.io/8fifwnm7r/uploads/byu_o9jTn3Czc.webp",
        "title": "BYU",
        "studio": "BYU Provider"
      }
    },
    "server_time": 1773622695504,
    "expired_time": 1773575364032
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (POST /order)**

```bash
curl --location 'https://api.v2.mugni.my.id/order' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "destination" : "122232423",
    "destination_second" : "23423",
    "item_id": "cmmrw5znp000004k154fw1f1m"
}'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat transaksi, silakan lakukan pembayaran.",
  "data": {
    "id": "cmmsheas9000004johfwebtw9",
    "transaction_id": "MUGN-260316-891C65EA",
    "transaction_invoice": null,
    "amount": 4500,
    "destination": "122232423",
    "destination_second": "23423",
    "status": "pending",
    "qris_url": "https://qris.pw/public/qr/qr_1773623093_4500.png",
    "qris_string": "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214251114147015990303UMI51440014ID.CO.QRIS.WWW0215ID20254541657830303UMI520454115303360540445005802ID5920Toko Yudha Ok26937136005MEDAN61052002862070703A0163048000",
    "expires_at": "2026-03-16T01:14:55.058Z",
    "paid_at": null,
    "created_at": "2026-03-16T01:04:55.065Z",
    "updated_at": "2026-03-16T01:04:55.065Z",
    "user_id": "cmm05007r000204i3gsbt89th",
    "item_id": "cmmrw5znp000004k154fw1f1m"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (POST /order)**

```bash
curl --location --request PUT 'https://api.v2.mugni.my.id/order/MUGN-260316-891C65EA' \
--header 'Authorization: Bearer <token>'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui transaksi.",
  "data": {
    "id": "cmmsheas9000004johfwebtw9",
    "transaction_id": "MUGN-260316-891C65EA",
    "transaction_invoice": null,
    "amount": 4500,
    "destination": "122232423",
    "destination_second": "23423",
    "status": "pending",
    "qris_url": "https://qris.pw/public/qr/qr_1773623093_4500.png",
    "qris_string": "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214251114147015990303UMI51440014ID.CO.QRIS.WWW0215ID20254541657830303UMI520454115303360540445005802ID5920Toko Yudha Ok26937136005MEDAN61052002862070703A0163048000",
    "expires_at": "2026-03-16T01:14:55.058Z",
    "paid_at": null,
    "created_at": "2026-03-16T01:04:55.065Z",
    "updated_at": "2026-03-16T01:08:05.193Z",
    "user_id": "cmm05007r000204i3gsbt89th",
    "item_id": "cmmrw5znp000004k154fw1f1m"
  },
  "meta": null,
  "errors": null
}
```
