// @ts-check
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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

// lastmod của sitemap = ngày commit cuối của file nguồn (cùng nguồn với lastUpdated mà Starlight in dưới trang).
// deploy.yml phải checkout với fetch-depth: 0, clone nông thì git log chỉ thấy commit mới nhất và mọi trang mang ngày deploy.
// Trang không tìm được file nguồn (ví dụ trang 404) thì không có lastmod — thiếu còn hơn sai.
const sourceByPath = new Map(
	readdirSync('src/content/docs', { recursive: true })
		.filter((f) => /\.mdx?$/.test(String(f)))
		.map((f) => {
			const p = '/' + String(f).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '$1');
			return [p.endsWith('/') ? p : `${p}/`, `src/content/docs/${f}`];
		}),
);
const lastCommitDate = (file) => {
	try {
		return execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim() || undefined;
	} catch {
		return undefined;
	}
};
const withLastmod = (item) => {
	const lastmod = lastCommitDate(sourceByPath.get(new URL(item.url).pathname));
	return lastmod ? { ...item, lastmod } : item;
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
			lastUpdated: true,
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
			serialize: withLastmod,
			i18n: { defaultLocale: 'root', locales: { root: 'en', vi: 'vi' } },
		}),
	],
});
