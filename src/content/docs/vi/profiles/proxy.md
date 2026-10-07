---
title: Thiết lập proxy
description: Gán cho profile một proxy thủ công hoặc một pool proxy, nhập danh sách proxy, kiểm tra chúng, và giữ múi giờ khớp với proxy.
sidebar:
  order: 3
---

## Hai cách gán proxy cho profile

| | Proxy thủ công | Pool proxy |
|---|---|---|
| Đặt ở | Tab **Network** của profile | **Proxy pools** trong sidebar, rồi gán cho profile |
| Hợp với | Một profile, một proxy | Nhiều profile dùng chung một danh sách proxy hoặc một cổng của nhà cung cấp |

Nếu profile có cả hai, **proxy của pool được ưu tiên** lúc mở. Profile không có cái nào thì kết nối trực tiếp.

Cột **Proxy** trong danh sách profile cho biết mỗi profile đang dùng gì: **No Proxy**, **Manual**, tên pool, hoặc **Dead Proxy** khi proxy ở ô của profile đó rớt kiểm tra sức khoẻ.

## Proxy thủ công

1. Mở panel của profile và sang **Network**.
2. Ở **Manual Proxy**, bật **Enable Proxy**.
3. Chọn **Type**:
   - **HTTP**
   - **SOCKS5**
   - **Residential**: cho proxy dân cư chạy qua HTTP
4. Nhập **Host** và **Port**, và **Username**, **Password** nếu proxy cần.
5. Bấm **Test Proxy**. Thành công thì hiện `Connected • <độ trễ>ms • IP: <IP đi ra>`.
6. Bấm **Save Changes**.

## Pool proxy

Mở **Proxy pools** trong sidebar và bấm **New Pool**. Có hai loại.

### Pool tĩnh

Một danh sách proxy, mỗi dòng một proxy, theo bất kỳ dạng nào sau đây:

```
host:port
host:port:user:pass
user:pass@host:port
```

Mở đầu dòng bằng `socks5://` cho proxy SOCKS5, ví dụ `socks5://user:pass@host:port` hoặc `socks5://host:port:user:pass`. Dòng bắt đầu bằng `http://`, hoặc không có tiền tố, là proxy HTTP. Mỗi proxy giữ loại riêng của nó, nên một pool trộn được HTTP và SOCKS5.

Không hỗ trợ proxy `https://`: Veilus không mở được kết nối mã hoá tới proxy, và dòng bắt đầu bằng `https://` bị từ chối.

Chọn **Assignment Mode**:

- **1:1 Dedicated**: mỗi profile có proxy (ô) riêng.
- **Round Robin**: các profile dùng chung proxy theo lượt.

### Pool xoay

Một URL cổng từ nhà cung cấp proxy của bạn, ví dụ `http://user:pass@gate.example.com:8000`. Dùng `socks5://` ở đầu cho cổng SOCKS5. URL cổng `https://` bị từ chối.

Đặt **Session Type** theo cách cổng của nhà cung cấp hoạt động: **Sticky (same IP per session)** hoặc **Per Request (rotate each call)**. Việc xoay IP do nhà cung cấp làm.

Loại của pool không đổi được sau khi tạo.

### Gán pool

- **Cho các profile đã chọn**: tích profile, bấm **Assign Pool** trên thanh thao tác hàng loạt, chọn pool.
- **Cho mọi profile trong một danh sách đã lọc**: lọc danh sách rồi bấm **Assign Pool** ở đầu trang.
- **Cho một profile**: trong tab **Network** của nó, chọn pool ở **Proxy Pool**.
- **Khi tạo profile**: chọn **Proxy pool** trong **Batch create**.

Nếu pool 1:1 có ít proxy trống hơn số profile bạn đang gán, chọn:

- **Strict 1:1**: chỉ các profile đầu nhận proxy; phần còn lại bị bỏ qua.
- **Round-robin**: mọi profile đều được gán, một số dùng chung proxy.

Profile trong Thùng rác vẫn giữ ô của nó trong pool tĩnh. Xoá hẳn khỏi Thùng rác để trả proxy đó cho profile khác. Xoá pool thì mọi phép gán ô của nó mất theo.

## Nhập và xuất danh sách proxy

Ở trang **Proxy pools**, bấm **Import** và chọn file `.txt` hoặc `.csv`.

- **TXT**: mỗi dòng một proxy, theo các dạng ở trên, kể cả tiền tố `http://` hay `socks5://` tuỳ chọn.
- **CSV**: dòng tiêu đề có `host` và `port`, tuỳ chọn thêm `username`, `password`, `country`, `timezone`, `city`. Cột khác bị bỏ qua. Proxy SOCKS5 thì đặt `socks5://` trước host, ví dụ `socks5://1.2.3.4`.

Bản xem trước đếm số proxy hợp lệ và liệt kê các dòng bị bỏ kèm lý do. Nhập vào **New pool** hoặc **Add to existing pool** (pool tĩnh). Proxy đã có trong pool, trùng host, port, username và loại, bị bỏ qua.

Để xuất, dùng **Export all** ở trang Proxy pools, hoặc **Export** ở trang của một pool. Chọn **TXT** (mỗi dòng một proxy; pool xoay được ghi bằng URL cổng của nó) hoặc **CSV** (có cột vị trí; pool xoay bị bỏ ra). Proxy SOCKS5 giữ tiền tố `socks5://`, nên file nhập lại được đúng loại.

:::caution
File xuất chứa mật khẩu proxy ở dạng văn bản thuần, không mã hoá. Username hay password có `:` `@` `,` `"` hoặc dấu xuống dòng sẽ không đọc lại đúng từ các file này; app cảnh báo khi gặp trường hợp đó.
:::

## Kiểm tra proxy

- **Test Proxy** trong tab Network của profile kiểm tra proxy thủ công.
- **Test** trên một pool chạy **Health Check** cho mọi proxy: sống hay chết, độ trễ, IP ngoài và vị trí.
- **Geo** trên một pool tra quốc gia, thành phố và múi giờ của từng proxy.

## Kiểm tra múi giờ

Profile đi ra bằng IP Mỹ nhưng khai múi giờ Việt Nam là tự mâu thuẫn. Trước mỗi lần mở, Veilus so múi giờ của profile với nơi proxy của nó (hoặc mạng của chính bạn, khi không có proxy) đi ra.

Chọn cách xử lý ở **Settings → Timezone check**:

| Cài đặt | Hành vi |
|---------|----------|
| **Block** (mặc định) | Không mở; hiện hai múi giờ đang mâu thuẫn |
| **Warn** | Hiện mâu thuẫn, nhưng vẫn cho mở profile |
| **Off** | Không kiểm tra. Mở nhanh hơn, vì phép kiểm phải gọi qua proxy rồi tra vị trí của IP |

Khi phép kiểm chặn một lần mở, bạn chọn được **Edit profile** hoặc **Change proxy**.

Veilus không tự đổi múi giờ của profile khi bạn gán proxy. Để đưa chúng về khớp nhau:

- Trong tab **Network**, khi đã chọn pool, bấm **Match to proxy**. Veilus đo IP đi ra thật của proxy và đề xuất múi giờ khớp; toạ độ đi theo khi bạn lưu.
- Nếu các proxy của một pool tĩnh có vị trí đã dò (từ **Geo** hoặc kiểm tra sức khoẻ) khác với múi giờ của profile, tab Network hiện **Proxy location mismatch** kèm nút **Fix**.
- Hoặc tự đặt **Timezone** ở tab Fingerprint.

:::tip
Ghim một bang hay thành phố ở nhà cung cấp proxy, không chỉ quốc gia, để mọi proxy trong pool cùng một múi giờ. Khi các proxy của pool đi ra ở nhiều múi giờ khác nhau, app cảnh báo, vì profile có thể bị chặn lúc mở nếu proxy của nó chuyển sang thành phố khác.
:::

## Xử lý sự cố

| Vấn đề | Cách xử lý |
|---------|------------|
| **Test Proxy** thất bại | Kiểm tra host, port, loại và thông tin đăng nhập |
| Mở bị chặn bởi kiểm tra múi giờ | Dùng **Match to proxy** hoặc đổi múi giờ của profile, hoặc chọn proxy trong vùng của profile |
| Mở thất bại với *proxy pool '…' has no usable proxy* hoặc nhắc tới `https://` | Pool của profile trống hoặc URL cổng không dùng được (ví dụ `https://`). Sửa pool hoặc gán pool khác. Veilus không mở profile khi thiếu proxy của nó |
| **Dead Proxy** trong danh sách | Chạy kiểm tra sức khoẻ của pool, thay proxy chết |
| WebRTC lộ IP thật | Đặt **WebRTC Mode** ở tab Fingerprint (xem [Fingerprint](/vi/profiles/fingerprinting/)) |
