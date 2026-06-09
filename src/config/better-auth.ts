import { createServerOnlyFn } from '@tanstack/react-start';
import { z } from 'zod';

const betterAuthDBSchema = z.object({ baseUrl: z.url(), secret: z.string() });
type BetterAuthConfig = z.infer<typeof betterAuthDBSchema>;

const getBetterAuthConfig = createServerOnlyFn((): BetterAuthConfig => {
	const config: BetterAuthConfig = {
		baseUrl: process.env.BETTER_AUTH_URL,
		secret: process.env.BETTER_AUTH_SECRET,
	};

	return betterAuthDBSchema.parse(config);
});

export { getBetterAuthConfig };
