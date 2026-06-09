import { createServerOnlyFn } from '@tanstack/react-start';
import { z } from 'zod';

const googleSchema = z.object({ clientId: z.string(), secret: z.string() });
type GoogleConfig = z.infer<typeof googleSchema>;

export const getGoogleConfig = createServerOnlyFn((): GoogleConfig => {
	const config: GoogleConfig = {
		clientId: process.env.GOOGLE_CLIENT_ID,
		secret: process.env.GOOGLE_CLIENT_SECRET,
	};

	return googleSchema.parse(config);
});
