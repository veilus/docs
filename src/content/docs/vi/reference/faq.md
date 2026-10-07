---
title: Câu hỏi thường gặp
description: Những câu hỏi thường gặp về Veilus.
---

## Chung

### Veilus có miễn phí không?
Gói Free cho bạn 5 profile trên 1 máy, không giới hạn thời gian, không cần thẻ. Veilus Flow, lịch chạy, chạy hàng loạt, Veilus Sync, nhập/xuất, mẫu script và API/MCP cục bộ cần gói trả phí. Bạn dùng thử được tất cả với bản Pro 7 ngày. Xem [Gói và license](/vi/reference/plans-and-license/).

### Chạy trên hệ điều hành nào?
Windows 10/11 (x64) và macOS 13 trở lên trên Apple Silicon. Không có bản nào khác.

### Vì sao phải tải engine riêng?
Bộ cài chỉ chứa app. Engine trình duyệt là bản tải riêng để bạn chọn và đổi phiên bản engine trong **Settings → Engine & updates**. Xem [Cài đặt](/vi/getting-started/installation/#tải-engine-trình-duyệt).

### Veilus có tự cập nhật không?
Không. Tải bộ cài mới nhất từ [veilus.io/download](https://veilus.io/vi/download/) và cài đè lên bản hiện tại. Phiên bản engine cập nhật riêng trong **Settings → Engine & updates**.

## Profile và fingerprint

### Website có phát hiện profile của tôi không?
Không công cụ nào hứa được điều đó, và Veilus cũng không. Mỗi profile chạy trên bản Chromium do Veilus tự vá, với fingerprint và proxy riêng. Bạn tự kiểm tra một profile bằng **Test**, nó mở profile trên một bộ trang kiểm tra fingerprint. Tài khoản của bạn được đối xử ra sao còn tuỳ cách bạn dùng chúng.

### Profile có nên cùng hệ điều hành với máy tôi không?
Nên. Profile cho hệ điều hành khác phải giả lập nhiều hơn (font, kiến trúc CPU) nên ít khả năng qua được kiểm tra. Veilus cảnh báo khi bạn chọn hệ điều hành khác.

### Chạy được bao nhiêu profile cùng lúc?
Tối đa 16 trình duyệt cùng lúc, tính mọi cách mở: bằng tay, từ lịch, từ lượt chạy hàng loạt, hay qua API. Trong lúc chạy hàng loạt và theo lịch, Veilus còn chờ trước khi mở trình duyệt kế tiếp khi CPU hoặc bộ nhớ đang cao.

### Profile của tôi ra sao khi bản dùng thử hay license hết hạn?
Không có gì bị xoá. Gói Free mở 5 profile; phần còn lại bị khoá cho tới khi bạn nâng cấp hoặc xoá bớt profile khác.

## Proxy

### Tôi dùng proxy của mình được không?
Được. Mỗi profile có thể có proxy HTTP hoặc SOCKS5 riêng, hoặc lấy một proxy từ **Proxy pool**. Xem [Thiết lập proxy](/vi/profiles/proxy/).

### Vì sao profile không mở được khi có proxy?
Mặc định, trước mỗi lần mở Veilus kiểm tra múi giờ của profile có khớp với nơi proxy đi ra không, và chặn nếu không khớp. Mở tab **Network** của profile rồi bấm **Match to proxy**, hoặc đổi hành vi ở **Settings → Timezone check** (**Block**, **Warn** hoặc **Off**).

## Dữ liệu và đồng bộ

### Dữ liệu của tôi lưu ở đâu?
Dữ liệu profile nằm trên máy bạn, trong thư mục `.veilus` ở thư mục người dùng. Veilus không chép profile đi đâu khác trừ khi bạn bật Veilus Sync.

Veilus Sync chép profile lên một kho Git bạn chọn hoặc vào thư mục **Veilus Sync** trong Google Drive của bạn. Veilus không mã hoá dữ liệu profile được đồng bộ, chỉ mã hoá token truy cập của kho đó, nên hãy dùng kho riêng tư và tài khoản bạn kiểm soát. Xem [Veilus Sync](/vi/sync/overview/).

### Tôi sao lưu hay chuyển profile được không?
Được. Xuất ra file `.veiluspack` rồi nhập ở nơi khác. Bạn đặt được mật khẩu để mã hoá file; không có mật khẩu thì ai cầm file đều dùng được các phiên đăng nhập của profile. Xem [Nhập và xuất](/vi/profiles/import-export/).

## Tự động hoá

### Veilus Flow là gì?
Phần tự động hoá của Veilus. Bạn dựng script trong trình soạn sơ đồ, bắt đầu từ mẫu, hoặc kết nối một trợ lý AI hỗ trợ MCP (như Claude Code hay Cursor) để nó viết script Playwright, chạy và sửa. Script chạy trên một profile, hàng loạt, hoặc theo lịch. Xem [Tự động hoá](/vi/automation/overview/).

### Vì sao script của trợ lý chỉ chạy trên 3 profile?
Script thêm qua MCP hoặc REST API chạy tối đa 3 profile mỗi lượt cho tới khi bạn duyệt. Mở script trong **Veilus Flow** và bấm **Approve this script**. Chạy hàng loạt và theo lịch cũng cần duyệt, và script đã sửa phải duyệt lại.

## License

### Key của tôi báo đã kích hoạt trên quá nhiều máy
Mỗi key dùng được cho một số máy cố định. Liên hệ hỗ trợ để gỡ một máy, rồi kích hoạt lại.

### Tôi nhận hỗ trợ ở đâu?
Hỏi trong [cộng đồng Telegram](https://t.me/veilusbrowser) hoặc xem [Lỗi thường gặp](/vi/troubleshooting/common-issues/).
