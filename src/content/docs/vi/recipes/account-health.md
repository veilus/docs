---
title: Sức khỏe tài khoản
description: Kiểm tra từng profile còn đăng nhập vào tài khoản của chính nó và đọc vài con số, bằng script Veilus Flow chạy được ngay.
sidebar:
  order: 8
---

Recipe này kiểm tra từng profile còn đăng nhập vào tài khoản của chính nó hay không và đọc vài con số (người theo dõi, thông báo, đơn hàng). Chạy theo lịch để phát hiện tài khoản bị đăng xuất trước khi bạn cần đến nó.

Script chỉ đọc tài khoản của chính bạn: nó không bao giờ đăng nhập hộ, không bao giờ thấy mật khẩu, và không đăng bài, không like, không follow, không gửi tin nhắn. Bạn tự đăng nhập một lần trong cửa sổ của profile; profile giữ phiên đó.

**Script và prompt:** [solutions/account-health trên GitHub](https://github.com/veilus/sdk/tree/main/solutions/account-health).

## Thiết lập

Thử trước, chưa cần tài khoản (mục `demo` có sẵn):

1. Dán `script.ts` vào **Veilus Flow → Scripts** rồi duyệt nó. Xem [Scripts](/vi/automation/scripts/).
2. Trên một profile, thêm biến profile `PLATFORM` = `demo`.
3. Chạy. Profile đang đăng xuất nên lượt chạy in `"status":"logged_out"`.
4. Mở liên kết này trong profile đó để "đăng nhập" (nó đặt một cookie sống 30 ngày, giống một lần đăng nhập thật, nên còn nguyên khi profile khởi động lại), rồi chạy lại: `"status":"logged_in"` kèm một số đo `session`.

   ```text
   https://httpbin.org/response-headers?Set-Cookie=veilus_demo_session%3D1%3B+Max-Age%3D2592000%3B+Path%3D%2F
   ```

   Liên kết này đăng xuất trở lại:

   ```text
   https://httpbin.org/cookies/delete?veilus_demo_session
   ```

Với tài khoản của bạn:

1. Đăng nhập tài khoản trong cửa sổ của profile, một lần.
2. Đặt biến profile `PLATFORM` thành một khóa của `PLATFORMS` trong `script.ts`. Đặt `URL` nếu trang khác mặc định (trang quản trị cửa hàng, trang cá nhân của bạn).
3. Duyệt script và đưa nó vào [lịch chạy](/vi/automation/schedules/) trên tất cả profile.

Hiện chỉ có mục `demo`. Bạn thêm nền tảng khác bằng cách tự đo selector rồi thêm một mục vào `PLATFORMS` (xem README trong repo), hoặc nhờ Claude làm với `prompt.md`.

## Một lượt chạy in ra gì

```text
RESULT {"platform":"demo","status":"logged_out","metrics":{}}
```

Khi đã đăng nhập:

```text
RESULT {"platform":"demo","status":"logged_in","metrics":{"session":{"value":1,"raw":"{\n  \"cookies\": {\n    \"veilus_demo_sessio"}}}
```

`value` là số đầu tiên trong chữ của phần tử; `raw` giữ tối đa 40 ký tự của chữ đó nguyên dạng (nên `1.2K` vẫn đọc được).

- Mã thoát 0: trang đã được đọc, dù đã đăng nhập hay chưa, và mọi cảnh báo đã được gửi đi.
- Mã thoát 1: trang không tải được, `PLATFORM` sai, hoặc trang đã đăng nhập không hiện một số đo. Mã 1 cũng nghĩa là webhook không nhận cảnh báo (dòng `RESULT` vẫn được in).

Lượt chạy thoát mã 1 kèm `metric … not found` nghĩa là website đã đổi trang: hãy sửa mục đó trong `PLATFORMS`.

## Đổi cho phù hợp

- Biến profile `PLATFORM` (bắt buộc): kiểm mục nào của `PLATFORMS`.
- Biến profile `URL` (tùy chọn): trang cần đọc, khi khác trang mặc định của mục.
- Biến profile `WEBHOOK_URL` (tùy chọn): một webhook nhận JSON. Nó nhận tin nhắn khi trạng thái là `logged_out`. Nội dung gửi đi có trường `text` (Slack đọc) và `content` (Discord đọc).
- Website khác: thêm một mục vào `PLATFORMS` gồm trang, một selector chỉ có khi đã đăng nhập, và một selector cho mỗi con số.
- Số khác: thêm một khóa vào `metrics` của nền tảng đó.

## Lưu ý pháp lý

:::caution
Hãy đọc Điều khoản dịch vụ của từng nền tảng. Script này chỉ đọc tài khoản của chính bạn; bạn tự chịu trách nhiệm về cách dùng Veilus.
:::
