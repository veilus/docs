---
title: Theo dõi giá
description: Theo dõi giá trên các trang sản phẩm bằng script Veilus Flow chạy được ngay, và được báo khi giá đổi.
sidebar:
  order: 5
---

Recipe này theo dõi giá trên một danh sách trang sản phẩm. Mỗi lượt chạy mở từng trang trong một profile thật, đọc giá, so với lượt trước và in ra những gì đã đổi.

**Script và dữ liệu mẫu:** [solutions/price-monitor trên GitHub](https://github.com/veilus/sdk/tree/main/solutions/price-monitor). Script chạy hằng ngày trên một profile Veilus thật.

## Thiết lập

1. Tạo script trong **Veilus Flow → Scripts** rồi dán `script.ts`, sau đó duyệt nó: dataset chỉ đến được script đã duyệt. Xem [Scripts](/vi/automation/scripts/).
2. Nhập `dataset.csv` làm dataset và gán cho profile. Xem [Datasets](/vi/profiles/datasets/).
3. Chạy thử một lần, rồi thêm [lịch chạy](/vi/automation/schedules/), ví dụ mỗi 6 giờ.

## Một lượt chạy in ra gì

```text
RESULT {"checked":2,"changed":[{"url":"https://…","from":51.77,"to":49.99}]}
```

Lượt đầu chỉ ghi lại giá nên `changed` rỗng. Các lượt sau liệt kê những trang có giá thay đổi.

## Đổi cho trang của bạn

- Cột `URL`: các trang sản phẩm của bạn. Cột `SELECTOR`: CSS selector của giá (để trống thì dùng `.price`).
- Biến profile `WEBHOOK_URL`: webhook Slack hoặc Discord để nhận tin nhắn mỗi khi giá đổi.
- Biến profile `OUT_DIR`: nơi lưu giá của lượt trước (mặc định `~/veilus-solutions`).

## Lưu ý pháp lý

:::caution
Hãy kiểm tra Điều khoản dịch vụ và robots.txt của website trước khi theo dõi. Bạn tự chịu trách nhiệm về cách dùng Veilus.
:::
