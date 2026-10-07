---
title: Fingerprint
description: Fingerprint của một profile gồm những gì, bạn đổi được gì, và cách kiểm tra nó.
sidebar:
  order: 2
---

## Veilus dựng fingerprint như thế nào

Website đọc cùng lúc nhiều thuộc tính của trình duyệt: hệ điều hành, màn hình, GPU, số nhân CPU, bộ nhớ, font, ngôn ngữ, múi giờ và nhiều thứ nữa. Veilus sinh chúng cho mỗi profile **thành một bộ nhất quán** theo hệ điều hành bạn chọn lúc tạo. Ví dụ profile Windows nhận font của Windows và một GPU có thật trên máy Windows.

Khi profile dùng cùng hệ điều hành với máy bạn, phần cứng của nó được khớp theo máy bạn. Profile cho hệ điều hành khác phải giả lập nhiều hơn nên ít khả năng qua được kiểm tra; app cảnh báo bạn về điều này.

Fingerprint được lưu cùng profile và giữ nguyên mỗi lần mở, cho tới khi bạn đổi hoặc sinh lại.

## Tab Fingerprint

Mở panel của profile và sang **Fingerprint**. Tab này có ba phần.

### Cài đặt của bạn

Đổi thoải mái. Hệ điều hành cố định từ lúc tạo profile.

| Cài đặt | Tác dụng |
|---------|----------|
| **Language** | Ngôn ngữ trình duyệt mà website thấy |
| **Timezone** | Múi giờ mà website thấy. Toạ độ của profile đi theo múi giờ và cập nhật khi bạn lưu |
| **WebRTC Mode** | WebRTC để lộ gì về IP của bạn (xem bên dưới) |
| **Add canvas/audio noise** | Cho profile này canvas và âm thanh riêng (mặc định tắt) |

**WebRTC Mode**

| Chế độ | Hiệu ứng |
|------|--------|
| **Disabled** (mặc định) | Trang không nhận ứng viên kết nối nào, nên WebRTC không hiện IP. Gọi video và các kết nối WebRTC khác sẽ không chạy |
| **Proxy Only** | WebRTC chỉ kết nối qua máy chủ relay (TURN) mà trang cung cấp. Trang không nhận ứng viên nào mang IP nội bộ hay IP công khai của bạn |
| **Fake IP** | Trang thấy IP bạn nhập thay cho IP thật. Địa chỉ mạng nội bộ không được liệt kê. Cho tới khi bạn nhập một địa chỉ IPv4 hoặc IPv6 hợp lệ, WebRTC vẫn tắt |

**Canvas/audio noise**

- **Off** (mặc định): canvas và âm thanh giống Chrome thật trên máy này, nên các profile trên cùng máy dùng chung chúng.
- **On**: mỗi profile có canvas và âm thanh riêng, nhưng một số trang kiểm tra đánh dấu giá trị canvas và âm thanh chúng chưa từng thấy là bị can thiệp.

### Phần cứng

Bản tóm tắt chỉ đọc: user agent, độ phân giải màn hình, số nhân CPU, bộ nhớ, WebGL renderer, pin, Bluetooth, chế độ màu và giảm chuyển động. Các giá trị này được sinh cùng nhau. Muốn đổi, bấm **Regenerate** để tạo một bộ hoàn toàn mới, rồi **Save Changes** để giữ.

### Nâng cao: sửa từng trường

Mở rộng phần này để sửa từng trường:

- **User Agent**
- **Display & GPU**: Screen Resolution, CPU Cores, Memory, WebGL Vendor, WebGL Renderer
- **Noise**: Canvas Seed, Audio Seed, hoặc **Random**
- **Privacy**: Color Scheme, Battery Level, Charging, Reduced Motion

:::caution
Giá trị chọn tay có thể cộng lại thành một thiết bị không tồn tại, và trang kiểm tra sẽ đánh dấu điều đó. Với profile cùng hệ điều hành với máy bạn, danh sách chỉ đưa ra giá trị hợp với máy bạn. Ưu tiên **Regenerate** thay vì sửa từng trường.
:::

Mục **Config check** dưới các trường liệt kê mâu thuẫn ngay khi bạn sửa, ví dụ GPU không hợp hệ điều hành hay ngôn ngữ không hợp múi giờ. Nó ghi **No contradictions found** khi bộ giá trị nhất quán. Cùng phép kiểm này xuất hiện ở tab **Overview**.

Nếu bạn mở một profile có fingerprint tự mâu thuẫn, Veilus hiện các trường xung đột trước và cho bạn chọn **Edit profile** hoặc **Open anyway**.

## Kiểm tra profile

Veilus mở được một profile trên nhiều trang kiểm tra fingerprint công khai và ghi lại nó qua được bao nhiêu trang.

- Chạy từ tab **Test** của profile (**Test Again**), từ **Test again** ở tab Overview, hoặc cho nhiều profile bằng **Test** trên thanh thao tác hàng loạt.
- Kết quả hiện ở cột **Score** dạng *đạt/đã đo*, ví dụ `7/8`. Báo cáo liệt kê từng trang là **Passed**, **Failed** hoặc **Not measured**, và tầng mạng có khớp hay không.
- Nếu sau đó bạn đổi fingerprint hoặc proxy, điểm được đánh dấu là đã cũ. Kiểm tra lại.
- Lượt chạy không đo đủ số trang sẽ không thay điểm trước đó.

## Bước tiếp theo

- [Thiết lập proxy →](/vi/profiles/proxy/)
- [Tổng quan tự động hoá →](/vi/automation/overview/)
