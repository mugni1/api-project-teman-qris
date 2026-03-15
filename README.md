# DOKUMENTASI API

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
curl -X GET "http://localhost:5055/news?search=promo&limit=10&page=1" \
  -H "Content-Type: application/json"
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
curl -X GET "http://localhost:5055/news/ckxyz..." \
  -H "Content-Type: application/json"
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
curl -X POST "http://localhost:5055/news" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "image_url": "https://cdn.example.com/news/1.jpg",
    "title": "Promo Akhir Pekan",
    "summary": "Ringkasan berita...",
    "content": "Konten lengkap berita..."
  }'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat berita.",
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

**Contoh Request Dan Response (PUT /news/:id)**

```bash
curl -X PUT "http://localhost:5055/news/ckxyz..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Promo Akhir Pekan (Update)"
  }'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui berita.",
  "data": {
    "id": "ckxyz...",
    "image_url": "https://cdn.example.com/news/1.jpg",
    "title": "Promo Akhir Pekan (Update)",
    "summary": "Ringkasan berita...",
    "content": "Konten lengkap berita...",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-02T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (DELETE /news/:id)**

```bash
curl -X DELETE "http://localhost:5055/news/ckxyz..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>"
```

```json
{
  "status": 200,
  "message": "Berhasil menghapus berita.",
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


**Category API**

Base path: `/category`

**Endpoints**

| Method | Path           | Auth         | Deskripsi                                      |
| ------ | -------------- | ------------ | ---------------------------------------------- |
| GET    | `/category`    | Public       | Ambil daftar kategori (pagination + pencarian). |
| GET    | `/category/:id`| Public       | Ambil detail kategori.                         |
| POST   | `/category`    | `super_user` | Buat kategori baru.                            |
| PUT    | `/category/:id`| `super_user` | Perbarui kategori.                             |
| DELETE | `/category/:id`| `super_user` | Hapus kategori.                                |

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
curl -X GET "http://localhost:5055/category?search=game&limit=10&page=1&type=games" \
  -H "Content-Type: application/json"
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil data kategori.",
  "data": [
    {
      "id": "ckxyz...",
      "title": "Top Up Game",
      "studio": "Game Studio",
      "image_url": "https://cdn.example.com/category/1.jpg",
      "cover_url": "https://cdn.example.com/category/cover-1.jpg",
      "type": "games",
      "column_1": true,
      "column_2": false,
      "column_1_title": "Keterangan 1",
      "column_2_title": "Keterangan 2",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "search": "game",
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

**Contoh Request Dan Response (GET /category/:id)**

```bash
curl -X GET "http://localhost:5055/category/ckxyz..." \
  -H "Content-Type: application/json"
```

```json
{
  "status": 200,
  "message": "Berhasil mengambil detail kategori.",
  "data": {
    "id": "ckxyz...",
    "title": "Top Up Game",
    "studio": "Game Studio",
    "image_url": "https://cdn.example.com/category/1.jpg",
    "cover_url": "https://cdn.example.com/category/cover-1.jpg",
    "type": "games",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Keterangan 1",
    "column_2_title": "Keterangan 2",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (POST /category)**

```bash
curl -X POST "http://localhost:5055/category" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Top Up Game",
    "studio": "Game Studio",
    "image_url": "https://cdn.example.com/category/1.jpg",
    "cover_url": "https://cdn.example.com/category/cover-1.jpg",
    "type": "games",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Keterangan 1",
    "column_2_title": "Keterangan 2"
  }'
```

```json
{
  "status": 201,
  "message": "Berhasil membuat kategori.",
  "data": {
    "id": "ckxyz...",
    "title": "Top Up Game",
    "studio": "Game Studio",
    "image_url": "https://cdn.example.com/category/1.jpg",
    "cover_url": "https://cdn.example.com/category/cover-1.jpg",
    "type": "games",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Keterangan 1",
    "column_2_title": "Keterangan 2",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (PUT /category/:id)**

```bash
curl -X PUT "http://localhost:5055/category/ckxyz..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Top Up Game (Update)",
    "column_2": true
  }'
```

```json
{
  "status": 200,
  "message": "Berhasil memperbarui kategori.",
  "data": {
    "id": "ckxyz...",
    "title": "Top Up Game (Update)",
    "studio": "Game Studio",
    "image_url": "https://cdn.example.com/category/1.jpg",
    "cover_url": "https://cdn.example.com/category/cover-1.jpg",
    "type": "games",
    "column_1": true,
    "column_2": true,
    "column_1_title": "Keterangan 1",
    "column_2_title": "Keterangan 2",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-02T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Contoh Request Dan Response (DELETE /category/:id)**

```bash
curl -X DELETE "http://localhost:5055/category/ckxyz..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>"
```

```json
{
  "status": 200,
  "message": "Berhasil menghapus kategori.",
  "data": {
    "id": "ckxyz...",
    "title": "Top Up Game",
    "studio": "Game Studio",
    "image_url": "https://cdn.example.com/category/1.jpg",
    "cover_url": "https://cdn.example.com/category/cover-1.jpg",
    "type": "games",
    "column_1": true,
    "column_2": false,
    "column_1_title": "Keterangan 1",
    "column_2_title": "Keterangan 2",
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
