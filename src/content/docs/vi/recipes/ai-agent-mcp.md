---
title: Agent AI qua MCP
description: Để Claude điều khiển một profile Veilus qua MCP, điền một form và lưu việc đã làm thành script để bạn duyệt.
sidebar:
  order: 7
---

Recipe này để Claude điều khiển một profile Veilus: xem một trang, điền form, kiểm tra kết quả, rồi lưu việc đã làm thành script để bạn duyệt và đặt lịch. Ví dụ điền một form đặt hàng, mỗi dòng của dataset một lần.

**Prompt, script và dữ liệu mẫu:** [solutions/ai-agent-mcp trên GitHub](https://github.com/veilus/sdk/tree/main/solutions/ai-agent-mcp). `script.ts` chạy hằng ngày trên một profile Veilus thật.

## Hai cách dùng

- **Có Claude:** cần Claude Code có plugin Veilus và app Veilus đang chạy với API cục bộ bật. Dán prompt trong `prompt.md`. Claude làm việc trong profile qua [MCP server của Veilus](/vi/reference/mcp/) và lưu một script. Không gì chạy không giám sát cho đến khi bạn duyệt trong **Veilus Flow → Scripts**. Xem thêm [Để LLM làm tự động hoá giúp bạn](/vi/recipes/llm-scripts/).
- **Không có Claude:** dán `script.ts` vào **Veilus Flow → Scripts** rồi duyệt nó (dataset chỉ đến được script đã duyệt), nhập `dataset.csv` và gán cho một profile. Xem [Scripts](/vi/automation/scripts/) và [Datasets](/vi/profiles/datasets/).

## Một lượt chạy in ra gì

```text
RESULT {"submitted":2,"orders":[{"name":"Alex Doe","size":"medium","accepted":true}, …]}
```

Script báo lỗi nếu site không nhận một đơn, nên lần gửi thất bại sẽ hiện là một lượt chạy lỗi.

## Đổi cho form của bạn

- Biến profile `FORM_URL`: form của bạn. Sau đó đổi các selector của `page.fill` và phần kiểm tra sau khi submit. Ví dụ đọc bản JSON mà httpbin trả lại, còn site thật hiện trang xác nhận. Hoặc nhờ Claude làm lại bước 4 của prompt, áp dụng cho trang của bạn.
- `dataset.csv`: mỗi lần gửi tương ứng một dòng, các cột `NAME`, `PHONE`, `EMAIL`, `SIZE`, `COMMENTS`.

Prompt không được kiểm thử tự động: mỗi lần LLM viết ra code khác nhau, nên hãy đọc script trước khi duyệt.

## Lưu ý pháp lý

:::caution
Hãy kiểm tra Điều khoản dịch vụ và robots.txt của website trước khi tự động hoá. Bạn tự chịu trách nhiệm về cách dùng Veilus.
:::
