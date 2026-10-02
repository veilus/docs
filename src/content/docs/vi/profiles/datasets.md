---
title: Bộ dữ liệu
description: Nạp dữ liệu một lần, mỗi profile lấy phần của mình khi script chạy.
sidebar:
  order: 5
---

## Tổng quan

Bộ dữ liệu là một bảng lưu trong Veilus: tài khoản, bài đăng, từ khoá, link. Bạn nạp một lần, gán cho profile, và mỗi lần chạy script **đã duyệt** trên các profile đó, profile nhận phần của mình dưới dạng biến môi trường. Lịch và chạy hàng loạt không cần thêm cài đặt nào.

Mỗi profile có hai ô dữ liệu:

| Ô | Kiểu bộ | Lần chạy nhận gì |
|---|---------|------------------|
| **Danh tính** | **Cố định**: mỗi profile một dòng, giữ mãi | Mỗi cột thành `VEILUS_VAR_<CỘT>` |
| **Nội dung** | **Rút dần**: mỗi lần chạy lấy dòng mới | `VEILUS_VAR_ROWS`, mảng JSON các dòng (kèm từng cột, khi bộ lấy 1 dòng mỗi lần) |

Ô được suy ra từ kiểu của bộ, nên bảng tài khoản không bao giờ bị "dùng hết" nhầm, và bảng bài đăng không bị gắn cứng vào một profile. Mỗi profile có tối đa một bộ ở mỗi ô. `VEILUS_VAR_ROW_INDEX` là số thứ tự dòng (bắt đầu từ 1) để script in kèm kết quả.

## Tạo bộ dữ liệu

1. Mở **Data** ở thanh bên, vào **Datasets**, bấm **New from file**.
2. Chọn file `.csv` (dòng đầu là tên cột) hoặc `.txt` (mỗi dòng một giá trị, trong cột tên `VALUE`).
3. Xem trước. Dòng không đọc được được liệt kê theo số dòng.
4. Chọn **Cố định** hoặc **Rút dần**. Với Rút dần, đặt số dòng mỗi lần chạy lấy (1 đến 50).
5. Đánh dấu các cột **bí mật**, như mật khẩu.

Tên cột được đổi sang `UPPER_SNAKE_CASE` (`First name` thành `FIRST_NAME`). `ROWS` và `ROW_INDEX` là tên dành riêng, không dùng làm tên cột.

Khi xuất ra `.csv`, cột bí mật chỉ có mặt nếu bạn tick **include secret columns**.

## Gán cho profile

Chọn profile trong danh sách, bấm **Assign dataset** trên thanh thao tác hàng loạt, rồi chọn bộ. Bộ vào ô Danh tính hoặc Nội dung tuỳ kiểu của nó.

- **Thiếu dòng:** bộ cố định cho mỗi profile được chọn một dòng chưa gán kế tiếp. Hết dòng thì profile nào không có dòng được nêu **tên**. Hai profile không bao giờ chung một dòng.
- **Thay thế:** nếu profile đã có bộ khác ở ô đó, việc gán bị từ chối trừ khi bạn tick **Replace**.
- **Trùng cột:** nếu bộ có cột trùng tên với cột của ô còn lại, việc gán bị từ chối và nêu tên cột trùng.

Khi tạo profile hàng loạt, form có ô chọn bộ danh tính và bộ nội dung, nên profile mới được gán ngay lúc tạo.

Mở panel của profile, tab **Data**, mục **Datasets**: dòng của profile (giá trị bí mật được che) và số dòng nội dung còn lại. Mỗi ô có nút gỡ bộ.

## Cách dùng dòng của bộ rút dần

Trước khi chạy, profile giữ chỗ tối đa *số dòng mỗi lần* dòng chưa dùng, số thứ tự nhỏ nhất trước. Còn ít hơn thì lấy phần còn lại; script đọc độ dài của `ROWS`.

- Lần chạy **thành công** đánh dấu các dòng là đã dùng.
- Lần chạy **hỏng** trả lại mọi dòng của nó, không mất gì.
- Các profile chạy cùng lúc không bao giờ lấy trùng một dòng.
- Hết dòng chưa dùng thì profile hỏng trước khi mở trình duyệt, kèm lỗi nói bộ đã hết dòng chưa dùng. Hãy thêm dòng, hoặc bấm **Return used rows** ở trang của bộ để dòng đã dùng thành dùng được lại.

## Đọc dữ liệu trong script

Giá trị tới script dưới dạng biến môi trường. Cột của bộ cố định (danh tính) và, khi bộ nội dung lấy 1 dòng mỗi lần, cả cột của nó:

```ts
const user = process.env.VEILUS_VAR_USERNAME;
const password = process.env.VEILUS_VAR_PASSWORD;
```

Khi lấy nhiều hơn một dòng mỗi lần, đọc `ROWS`:

```ts
const rows: Array<Record<string, string>> = JSON.parse(
  process.env.VEILUS_VAR_ROWS ?? '[]',
);
for (const row of rows) {
  console.log(row.KEYWORD);
}
console.log('row', process.env.VEILUS_VAR_ROW_INDEX);
```

Cùng một tên đặt ở nhiều nơi thì biến của lần chạy thắng dòng dữ liệu, và dòng dữ liệu thắng biến đã lưu trên profile.

## Chỉ script đã duyệt

Giá trị của bộ chỉ tới script **đã duyệt**. Chạy thử script chưa duyệt không nhận giá trị nào và không giữ dòng nào; hãy truyền giá trị cần thiết bằng biến của lần chạy.

## Bảo mật

- Cột bí mật được che trong app và không bao giờ trả về qua API cục bộ hay MCP. Chúng vẫn tới script đã duyệt, vì script cần dùng.
- Giá trị của bộ **không được mã hoá khi lưu**. Chúng nằm trên máy bạn ở dạng chữ thường, giống biến của profile.
- Script đã duyệt vẫn có thể in ra giá trị nó nhận được. Hãy xem lại script trước khi duyệt.

## Dùng bộ dữ liệu qua Claude (MCP)

Agent kết nối qua [MCP](/vi/reference/mcp/) quản lý bộ dữ liệu bằng `create_dataset`, `append_dataset_rows`, `list_datasets`, `get_dataset_rows`, `assign_dataset`, `unassign_dataset` và `reset_dataset_rows`. `create_profiles` cũng nhận một bộ danh tính và một bộ nội dung. Liệt kê và đọc dòng không bao giờ trả giá trị cột bí mật. Ví dụ: đưa Claude bảng tài khoản, nhờ nó tạo bộ cố định rồi gán cho các profile.
