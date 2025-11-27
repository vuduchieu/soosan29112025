# Hướng Dẫn Quản Lý Danh Mục Blog

## Tổng Quan

Hệ thống danh mục blog được thiết kế để tự động đồng bộ khi bạn thay đổi ID hoặc slug trong CMS (trang quản trị).

## Cách Hoạt Động

### 1. Cấu Trúc Files

```
src/content/blog-categories/
├── driver-tips.json          ← Tên file (filename)
│   {
│     "id": "kinh-nghiem-lai-xe",  ← ID bên trong
│     "name": "Kinh Nghiệm Lái Xe",
│     "slug": "kinh-nghiem-lai-xe"
│   }
```

- **Tên file**: Được tạo khi lần đầu tạo category trong CMS
- **ID bên trong**: Có thể thay đổi sau này trong CMS
- **Slug**: URL-friendly version của category

### 2. Tự Động Migration

Khi bạn **thay đổi ID** trong CMS (ví dụ: `driver-tips` → `kinh-nghiem-lai-xe`), hệ thống sẽ:

1. **Phát hiện thay đổi**: So sánh tên file và ID bên trong
2. **Tự động cập nhật**: Tất cả bài viết blog có category cũ
3. **Chạy trước build**: Script migration chạy tự động mỗi lần build

## Các Trường Hợp Sử Dụng

### ✅ Trường Hợp 1: Tạo Category Mới

Khi tạo category mới trong CMS:

1. Nhập ID: `tin-tuc-moi`
2. Nhập Name: `Tin Tức Mới`
3. Nhập Slug: `tin-tuc-moi`
4. Save

→ File tạo: `tin-tuc-moi.json` với ID `tin-tuc-moi`

**Không cần làm gì thêm!**

### ✅ Trường Hợp 2: Đổi ID Category Đã Tồn Tại

Ví dụ bạn muốn đổi `product-review` thành `danh-gia-xe`:

1. Vào CMS, mở category `product-review`
2. Sửa ID thành: `danh-gia-xe`
3. Sửa Slug thành: `danh-gia-xe`
4. Save
5. Commit changes và push lên GitHub

→ **Netlify sẽ tự động:**
   - Chạy migration script
   - Cập nhật tất cả bài viết có `category: "product-review"`
   - Đổi thành `category: "danh-gia-xe"`
   - Build và deploy

**Không cần update thủ công từng bài viết!**

### ✅ Trường Hợp 3: Sửa Name hoặc Description

Nếu chỉ sửa Name, Description, Icon, Color:

1. Vào CMS, chỉnh sửa
2. Save
3. Commit và push

→ **Không cần migration**, chỉ cần rebuild là xong!

### ⚠️ Lưu Ý Quan Trọng

**KHÔNG nên thay đổi ID thường xuyên!**

- ID là "khóa chính" liên kết giữa category và bài viết
- Chỉ đổi khi thực sự cần thiết (ví dụ: chuẩn hóa tiếng Việt)
- Slug có thể đổi thoải mái vì không ảnh hưởng đến dữ liệu

## Chạy Migration Thủ Công

### Tự động phát hiện và migrate tất cả:

```bash
npm run migrate:categories
```

### Migrate một category cụ thể:

```bash
node scripts/migrate-blog-category.mjs old-id new-id
```

Ví dụ:
```bash
node scripts/migrate-blog-category.mjs driver-tips kinh-nghiem-lai-xe
```

## Kiểm Tra Migration

Sau khi chạy migration, script sẽ hiển thị:

```
🚀 Blog Category Migration Tool
==================================================
📋 Migrating: "driver-tips" → "kinh-nghiem-lai-xe"
==================================================

🔍 Searching for markdown files with category "driver-tips"...
  ✓ Updated: kinh-nghiem-lai-xe-tai-an-toan-cho-tai-xe-moi.md
  ✓ Updated: pho-cap-kinh-nghiem-lai-xe-tai-an-toan-cho-tai-xe-moi.md

📝 Updated 2 markdown file(s)

🔍 Searching for TypeScript files with category 'driver-tips'...
  ✓ Updated: driver-tips/kinh-nghiem-lai-xe-tai-an-toan.ts
  ✓ Updated: driver-tips/pho-cap-kinh-nghiem-lai-xe-tai-an-toan.ts

📝 Updated 2 TypeScript file(s)

==================================================
✅ All migrations complete!
   Markdown files: 2
   TypeScript files: 2
   Total: 4
==================================================
```

## Workflow Khuyến Nghị

### Khi tạo category mới:

1. Suy nghĩ kỹ về ID (nên là tiếng Việt không dấu, dấu gạch ngang)
2. Tạo trong CMS với ID, Name, Slug đồng nhất
3. Commit và push

### Khi đổi ID category:

1. Backup database/code (để phòng trường hợp)
2. Sửa ID và Slug trong CMS
3. Commit và push
4. Netlify tự động chạy migration
5. Kiểm tra sau khi deploy xong

## Troubleshooting

### Script không tìm thấy bài viết cần update?

Kiểm tra:
- File có đúng format không? (`category: "old-id"` trong markdown, `category: 'old-id'` trong TS)
- Category ID cũ có chính xác không?

### Muốn revert lại?

Chạy migration ngược:
```bash
node scripts/migrate-blog-category.mjs new-id old-id
```

### Build bị lỗi?

Kiểm tra log của migration script trong Netlify build log để xem có lỗi gì.

## Liên Hệ

Nếu có vấn đề, liên hệ developer hoặc tạo issue trên GitHub repo.
