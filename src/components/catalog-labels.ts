// Tiêu đề bảng tham số của trang REST và MCP, theo ngôn ngữ trang.
export const LABELS = {
	en: { parameter: 'Parameter', field: 'Field', type: 'Type', required: 'Required', description: 'Description', yes: 'yes', no: 'no' },
	vi: { parameter: 'Tham số', field: 'Trường', type: 'Kiểu', required: 'Bắt buộc', description: 'Mô tả', yes: 'có', no: 'không' },
} as const;
export type Lang = keyof typeof LABELS;
