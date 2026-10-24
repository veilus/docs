---
title: Kiểm tra trang đích theo quốc gia
description: Xem trang đích của bạn đúng như khách ở từng quốc gia thấy, bằng script Veilus Flow chạy được ngay.
sidebar:
  order: 6
---

Recipe này mở các trang đích của bạn như khách ở từng quốc gia thấy: lượt truy cập thực sự đến từ nước nào, chuyển hướng kết thúc ở đâu, ngôn ngữ của trang, và một ảnh chụp màn hình. Dùng nó để kiểm tra quảng cáo, link affiliate và cửa hàng bản địa hoá trước khi bạn chi tiền chạy traffic.

**Script và dữ liệu mẫu:** [solutions/geo-landing-check trên GitHub](https://github.com/veilus/sdk/tree/main/solutions/geo-landing-check). Script chạy hằng ngày trên một profile Veilus thật.

## Thiết lập

1. Tạo một profile cho mỗi quốc gia, mỗi profile có proxy ở nước đó. Xem [Thiết lập proxy](/vi/profiles/proxy/). Trên mỗi profile, thêm biến profile `COUNTRY` với mã hai chữ cái (`DE`, `JP`, …).
2. Dán `script.ts` vào **Veilus Flow → Scripts** rồi duyệt nó (dataset chỉ đến được script đã duyệt), nhập `dataset.csv` chứa các trang đích của bạn và gán cho tất cả profile. Xem [Scripts](/vi/automation/scripts/) và [Datasets](/vi/profiles/datasets/).
3. Chạy script trên tất cả profile cùng lúc rồi đọc dòng `RESULT` của từng profile trong **Run History**. Xem [Runs](/vi/automation/runs/).

Nếu proxy của một profile thoát ra từ sai quốc gia, profile đó báo lỗi `this profile exits from US, not DE: check its proxy`, nên bạn sẽ không phải so sánh các trang được tải từ sai quốc gia.

## Một lượt chạy in ra gì

```text
RESULT {"country":"DE","timezone":"Europe/Berlin","outDir":"…","pages":[{"url":"…","finalUrl":"…","status":200,"lang":"de","title":"…","screenshot":"DE-<run>-1.png"}]}
```

Ảnh chụp được lưu trong `OUT_DIR/geo-landing-check/`. Dòng `RESULT` cho biết thư mục đó một lần ở `outDir` và tên file của từng trang. Veilus chỉ giữ 4096 ký tự cuối của output mỗi lượt chạy, do đó mỗi profile chỉ nên giữ danh sách khoảng 20 trang.

## Đổi cho trang của bạn

- Cột `URL`: các trang đích của bạn.
- Biến profile `OUT_DIR`: nơi lưu ảnh chụp (mặc định `~/veilus-solutions`).
- Bỏ trống `COUNTRY` để bỏ qua bước kiểm tra quốc gia; nước thoát ra vẫn được ghi lại.

## Lưu ý pháp lý

:::caution
Hãy kiểm tra Điều khoản dịch vụ và robots.txt của website trước khi truy cập tự động. Bạn tự chịu trách nhiệm về cách dùng Veilus.
:::
