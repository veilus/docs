// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// Trang /vi/ có file nguồn thật. Starlight dựng mọi trang tiếng Anh dưới /vi/ dù chưa dịch (Head.astro đã
// noindex chúng, VEIL-1303); sitemap chỉ được kể trang dịch thật, nếu không Search Console báo "đã gửi nhưng
// noindex" và trang tiếng Anh mang alternate vi trỏ vào bản dự phòng (VEIL-1312).
const viPages = new Set(
	readdirSync('src/content/docs/vi', { recursive: true })
		.filter((f) => /\.mdx?$/.test(String(f)))
		.map((f) => '/vi/' + String(f).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '$1'))
		.map((p) => (p.endsWith('/') ? p : `${p}/`)),
);
const isRealPage = (page) => {
	const { pathname } = new URL(page);
	return !pathname.startsWith('/vi/') || viPages.has(pathname);
};

export default defineConfig({
	site: 'https://docs.veilus.io',
	integrations: [
		starlight({
			title: 'Veilus Docs',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/veilus' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/veilusbrowser' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/veilusbrowser' },
			],
			components: { Banner: './src/components/VersionBanner.astro', Head: './src/components/Head.astro' },
			customCss: ['./src/styles/fonts.css', './src/styles/custom.css'],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				vi: { label: 'Tiếng Việt', lang: 'vi' },
			},
			sidebar: [
				{
					label: 'Getting Started',
					translations: { vi: 'Bắt đầu' },
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Browser Profiles',
					translations: { vi: 'Browser Profiles' },
					autogenerate: { directory: 'profiles' },
				},
				{
					label: 'Automation',
					translations: { vi: 'Tự động hóa' },
					autogenerate: { directory: 'automation' },
				},
				{
					label: 'Veilus Sync',
					translations: { vi: 'Veilus Sync' },
					autogenerate: { directory: 'sync' },
				},
				{
					label: 'Chromium Engine',
					translations: { vi: 'Chromium Engine' },
					autogenerate: { directory: 'engine' },
				},
				{
					label: 'Recipes',
					translations: { vi: 'Hướng dẫn thực tế' },
					autogenerate: { directory: 'recipes' },
				},
				{
					label: 'Troubleshooting',
					translations: { vi: 'Xử lý sự cố' },
					autogenerate: { directory: 'troubleshooting' },
				},
				{
					label: 'Reference',
					translations: { vi: 'Tham khảo' },
					autogenerate: { directory: 'reference' },
				},
			],
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#F2EFE7' } },
			],
		}),
		// Khai riêng thì Starlight không tự thêm sitemap của nó; i18n chép đúng cấu hình Starlight đang dùng.
		sitemap({
			filter: isRealPage,
			i18n: { defaultLocale: 'root', locales: { root: 'en', vi: 'vi' } },
		}),
	],
});
