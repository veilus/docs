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

Ô được suy ra từ kiểu của bộ, nên bảng tài khoản không bao giờ bị "dùng hết" nhầm, và bảng bài đăng không bị gắn cứng vào một profile. Mỗi profile có tối đa một bộ ở mỗi ô. `VEILUS_VAR_ROW_INDEX` là số thứ tự dòng (bắt đầu từ 1) để script in kèm kết quả: dòng danh tính nếu profile có, nếu không thì dòng nội dung đầu tiên của lần chạy.

## Tạo bộ dữ liệu

1. Mở **Datasets** ở thanh bên, bấm **New from file**.
2. Chọn file `.csv` hoặc `.txt`. Các cột ngăn bằng `,`, `|` hoặc `;`: app tự nhận **Delimiter** từ dòng đầu (ưu tiên `|`, rồi `;`, rồi `,`) và bạn đổi tay được. Ô **First line is column names** bật sẵn; tắt đi thì cột tên `COL_1`, `COL_2`… và dòng đầu được đọc như dữ liệu. Giá trị trong ngoặc kép được chứa dấu ngăn cách và xuống dòng. File không có dấu ngăn cách nào là mỗi dòng một giá trị, trong cột tên `VALUE`.
3. Xem bản xem trước 20 dòng đầu. Dòng không đọc được được liệt kê theo số dòng.
4. Nhập **Dataset name** (tên file được điền sẵn).
5. Ở **Kind**, chọn **Fixed** (Cố định) hoặc **Consume** (Rút dần). Với Consume, đặt **Rows per run** (1 đến 50).
6. Tick các **Secret columns** (cột bí mật), như mật khẩu.
7. Bấm **Import**.

Tên cột được viết hoa, ký tự nào ngoài `A-Z`, `0-9` và `_` thành `_` (`First name` thành `FIRST_NAME`). Bản xem trước hiện tên cuối cùng. `ROWS`, `ROW_INDEX`, `PROFILE_ID`, `RUN_ID` và `DEBUG_PORT` là tên dành riêng, không dùng làm tên cột.

**Gán theo tên profile:** nếu bộ Cố định có cột `PROFILE_NAME`, bạn có thể tick **Assign rows to profiles by the PROFILE_NAME column**. Khi đó mỗi dòng về profile mang đúng tên đó. Tên không khớp profile nào, hoặc khớp nhiều hơn một, được liệt kê sau khi nhập.

### Ở trang của bộ

Bấm vào một bộ trong danh sách để xem các dòng, profile sở hữu từng dòng và trạng thái: **Available**, **In use**, **Used** hoặc **Unassigned**. Tại đó:

- **Add rows from file** nối thêm dòng từ một file `.csv` hoặc `.txt` khác.
- **Export** lưu bộ ra `.csv`. Cột bí mật chỉ có mặt nếu bạn tick **Include secret columns**, và khi đó chúng được ghi ở dạng chữ thường.
- **Return used rows** (bộ Rút dần) cho dòng đã dùng thành dùng được lại.

Xoá một bộ trong danh sách **Datasets** sẽ xoá các dòng của nó, và profile đang dùng bộ đó mất dữ liệu này. Không hoàn tác được.

## Gán cho profile

Chọn profile trong danh sách, bấm **Assign dataset** trên thanh thao tác hàng loạt, rồi chọn bộ. Bộ vào ô Danh tính hoặc Nội dung tuỳ kiểu của nó.

- **Thiếu dòng:** bộ cố định cho mỗi profile được chọn một dòng chưa gán kế tiếp. Hết dòng thì profile nào không có dòng được nêu **tên**. Hai profile không bao giờ chung một dòng.
- **Thay thế:** nếu profile đã có bộ khác ở ô đó, việc gán bị từ chối trừ khi bạn tick **Replace a dataset already in this slot**.
- **Trùng cột:** nếu bộ có cột trùng tên với cột của ô còn lại, việc gán bị từ chối và nêu tên cột trùng.

Khi tạo profile bằng **Batch create**, bước Organize có ô chọn **Identity dataset** và **Content dataset**, nên profile mới được gán ngay lúc tạo.

Mở panel của profile, tab **Data**, mục **Dataset**: dòng **Identity** của profile (giá trị bí mật được che) và, với **Content**, số dòng mỗi lần chạy và số dòng còn lại. Mỗi ô có nút **Remove**. Profile được gán bộ Cố định mà không có dòng nào thì hỏng sớm khi chạy.

Tab **Automation** liệt kê, dưới **Variables from datasets**, tên các biến script sẽ nhận từ mỗi ô. Chúng chỉ đọc, và đè lên biến nhập tay cùng tên.

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
