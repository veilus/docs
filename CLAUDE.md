# docs — tài liệu người dùng Veilus

> Quy trình làm việc chung (Superpowers + Plane): `../CLAUDE.md`.
> Nhãn Plane cho repo này: **`repo:docs`**.

## Repo này là gì

Astro Starlight, chạy ở **docs.veilus.io** (xem `CNAME`). Có `.github/workflows/deploy.yml`.

```
src/content/docs/   nội dung tài liệu
astro.config.mjs    cấu hình Starlight, sidebar
public/
EPICS.md
```

```bash
npm run dev
npm run build
npm run preview
```

## Đây là tài liệu NGƯỜI DÙNG, không phải tài liệu nội bộ

| Loại | Ở đâu |
|---|---|
| Hướng dẫn dùng sản phẩm | repo này |
| Kiến trúc, spec, plan, quyết định | `../project-docs/` — **repo gốc, private** |
| Trạng thái epic | `../project-docs/STATUS.md` — máy sinh |

Đừng chép nội dung `project-docs/` sang đây. Phần lớn trong đó là tài liệu nội bộ, và repo này công khai.

## Repo này CÔNG KHAI — hai hệ quả

**1. Không bao giờ đăng ký self-hosted runner cho repo này.** Runner Windows của Veilus đăng ký riêng cho `veilus/veilus`. Thêm nó vào một repo công khai nghĩa là pull request từ fork bất kỳ chạy được code tuỳ ý trên máy cá nhân.

**2. Không viết ra thứ giúp người khác dò tìm Veilus.** Tài liệu mô tả *tính năng làm được gì*, không mô tả *patch nào chạm API nào*. Chi tiết kỹ thuật fingerprint thuộc submodule `chromium/` private.

## Tài liệu phải khớp sản phẩm đang phát hành

Viết theo phiên bản người dùng tải được, không theo nhánh đang làm dở. Tính năng chưa phát hành thì chưa lên tài liệu.

## Commit

Sửa ở đây phải commit **hai lần**: trong submodule này, rồi con trỏ ở repo gốc.
