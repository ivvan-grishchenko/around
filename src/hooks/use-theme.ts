import { useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { type Theme, themeSchema } from '@type/theme';
import ms from 'ms';

const COOKIE_NAME = 'app-theme';

const getThemeServerFn = createServerFn({ method: 'GET' }).handler(async (): Promise<Theme> => {
	const cookie = getCookie(COOKIE_NAME);
	const parsed = themeSchema.safeParse(cookie);
	return parsed.success ? parsed.data : 'monolith-dark';
});

const setThemeServerFn = createServerFn({ method: 'POST' })
	.inputValidator(themeSchema)
	.handler(async ({ data: theme }) => {
		const milliseconds = ms('1y');
		// oxlint-disable-next-line no-magic-numbers
		const maxAge = Math.round(milliseconds / 1000);
		setCookie(COOKIE_NAME, theme, {
			httpOnly: false,
			maxAge,
			path: '/',
			sameSite: 'lax',
		});
		return { success: true, theme };
	});

const useTheme = () => {
	const router = useRouter();
	const { theme } = router.options.context;

	const setTheme = async (newTheme: Theme) => {
		// 1. Optimistically change DOM so there's zero UI latency
		document.documentElement.setAttribute('data-theme', newTheme);

		// 2. Persist to cookie via server function
		await setThemeServerFn({ data: newTheme });

		// 3. Invalidate/reload router context so state updates everywhere
		void router.invalidate();
	};

	return { setTheme, theme };
};

export { useTheme, getThemeServerFn };
