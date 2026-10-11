---
title: veilus-human-input (crate Rust)
description: Crate Rust mã nguồn mở đứng sau thao tác bấm, gõ và cuộn giống người của Veilus — các hàm, các tham số, và những gì đã đo.
---

[`veilus-human-input`](https://crates.io/crates/veilus-human-input) là một crate Rust mã nguồn mở (MIT hoặc Apache-2.0), sinh đường đi chuột, cú cuộn con lăn và nhịp gõ phím giống người cho tự động hoá trình duyệt. Mã nguồn ở [GitHub](https://github.com/veilus/human-input). Bạn không cần crate này để dùng Veilus; trang này dành cho lập trình viên muốn dùng cùng các mô hình đó trong tự động hoá của mình.

Mọi hàm đều thuần: nhận tham số và một bộ sinh số ngẫu nhiên, trả về các điểm, các bước cuộn và các khoảng thời gian. Gửi chúng tới trình duyệt bằng CDP, WebDriver hay sự kiện hệ điều hành là việc của bạn. Cùng một hạt giống RNG thì luôn ra cùng một kết quả.

## Cài đặt

```bash
cargo add veilus-human-input rand@0.8
```

[README](https://github.com/veilus/human-input#readme) có ví dụ đầy đủ cho một lần bấm, một lần cuộn và một từ được gõ.

## Các hàm

| Module | Hàm | Trả về |
|---|---|---|
| `mouse` | `bounds(quad)` | Hộp bao của một quad từ CDP `DOM.getContentQuads`, hoặc `None` nếu quad sai dạng hay hẹp hơn 1 px |
| `mouse` | `pick_point(box, params, rng)` | Một điểm ngẫu nhiên ở phần giữa của hộp — không bao giờ đúng tâm, không bao giờ sát mép |
| `mouse` | `first_start(target, params, rng)` | Điểm xuất phát cho lần di chuyển đầu, khi chưa biết vị trí con trỏ |
| `mouse` | `path(from, to, width, params, rng)` | Các điểm của một lần di chuyển, mỗi điểm kèm thời gian chờ trước nó; có thể đi qua vài điểm trung gian trước |
| `mouse` | `direct_path(…)` | Như trên nhưng không có điểm trung gian: một đường cong, hoặc, với lần di chuyển dài, đi lố qua đích rồi chỉnh lại một đoạn ngắn |
| `mouse` | `hover_pause` · `press_hold` · `press_wiggle` | Thời gian dừng trên mục tiêu trước khi nhấn; thời gian giữ nút; các lần xê dịch 1 px trong lúc giữ nút (thường không có) |
| `wheel` | `wheel_events(style, amount, params, rng)` | Các bước cuộn và khoảng nghỉ sau mỗi bước; tổng các bước đúng bằng `amount` |
| `wheel` | `scroll_distance(style, amount, params, rng)` | Quãng đường thực sự cuộn: đúng bằng yêu cầu với `Notched`, xê dịch một chút với `MacAccelerated` |
| `keyboard` | `timings(text, params, rng)` | Thời gian giữ phím và khoảng nghỉ sau đó cho từng ký tự (tính theo ký tự, không theo byte) |
| `keyboard` | `us_key(ch)` | `KeyboardEvent.code`, `keyCode` của Windows và trạng thái Shift trên bàn phím US; `None` với ký tự cần bộ gõ |

## Tham số

Mọi con số là một trường của một trong ba struct, truyền vào bằng tham chiếu. Struct nào cũng có `Default`.

- **`MouseParams`** — `tick` (khoảng thời gian giữa hai sự kiện con trỏ, mặc định 8 ms, tức chuột USB 125 Hz), các hệ số định luật Fitts cho thời gian di chuyển, độ cong của đường đi, khi nào và đi lố bao xa với những lần di chuyển dài, xác suất đi qua điểm trung gian, điểm bấm cách mép bao xa, thời gian dừng và giữ nút, và xác suất xê dịch trong lúc giữ nút.
- **`WheelParams`** — với `Notched`: kích thước bước (mặc định 100 px), độ dao động của nó và khoảng nghỉ giữa các bước. Với `MacAccelerated`: các bước đầu của một cú vuốt, kích thước và độ phân tán của dải bước lớn, khoảng cách giữa các sự kiện, và quãng đường cuộn xê dịch bao nhiêu.
- **`TypingParams`** — trung vị và độ phân tán của khoảng nghỉ log-chuẩn giữa hai phím, giá trị nhỏ nhất và lớn nhất của nó, khoảng nghỉ dài thêm bao nhiêu sau dấu cách hay dấu câu, xác suất và độ dài của một lần ngập ngừng, thời gian giữ phím, và `total_budget` tuỳ chọn để giới hạn tổng thời gian khi gõ văn bản dài.

Tên trường và đơn vị có trong [tài liệu API trên docs.rs](https://docs.rs/veilus-human-input).

## Những gì đã đo

Bộ mặc định của crate được so với một người trên một trang — 20 lần bấm, gõ ba câu, một lần cuộn dài — bằng một bộ phân loại có kiểm chéo (độ chính xác 0,5 nghĩa là nó không phân biệt được hai bên):

| Tham số | Chuột | Bàn phím |
|---|---:|---:|
| `Default`, giữ nguyên | 1,00 | 0,63 ± 0,08 |
| `Default`, đặt `tick` bằng chu kỳ báo vị trí của chuột đã ghi | 0,38 ± 0,14 | 0,59 ± 0,05 |

Với bộ mặc định, chỉ một đặc trưng — khoảng thời gian trung vị giữa hai sự kiện con trỏ — đã tách hai bên mọi lần: chuột được ghi báo vị trí mỗi 11 ms, còn mặc định là 8 ms. **Hãy đặt `tick` khớp thiết bị bạn đang mô phỏng trước tiên.**

Giới hạn: một phiên của một người, trên macOS, với chuột có con lăn; 20 đoạn di chuyển chuột và 142 cặp phím. Như vậy là "gần với người này", không phải "gần với con người nói chung". Crate không hứa rằng tự động hoá sẽ không bị nhận ra; nó gỡ đi những dấu hiệu máy móc lộ nhất trong nhịp và hình học của thao tác nhập.

## Veilus dùng crate này thế nào

Các mô hình trong crate đến từ phần mã đứng sau các công cụ MCP `click`, `type` và `scroll` của Veilus và các endpoint tương ứng của [REST API](/vi/reference/rest-api/); app sẽ chuyển sang dùng crate trong một bản phát hành sắp tới. Veilus truyền vào bộ tham số riêng và không công khai bộ đó: `Default` của crate là một bộ khác, chọn từ hiểu biết công khai, và các số đo ở trên là của bộ mặc định này. Công khai đúng các giá trị Veilus dùng sẽ cho phép bất kỳ ai huấn luyện bộ dò tìm trên vô hạn mẫu của chúng.

Script bạn viết bằng Playwright tự điều khiển chuột và bàn phím; crate này không thay đổi chúng.
