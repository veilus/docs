// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.veilus.io',
	integrations: [
		starlight({
			title: 'Veilus Docs',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/veilus' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/veilusbrowser' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/veilusbrowser' },
			],
			customCss: ['./src/styles/custom.css'],
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
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0B0F1A' } },
			],
		}),
	],
});
