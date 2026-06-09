import { createServerOnlyFn } from '@tanstack/react-start';
import { z } from 'zod';

const resendSchema = z.object({ resendApiKey: z.string() });
type ResendConfig = z.infer<typeof resendSchema>;

const getResendConfig = createServerOnlyFn((): ResendConfig => {
	const config: ResendConfig = {
		resendApiKey: process.env.RESEND_API_KEY,
	};

	return resendSchema.parse(config);
});

export { getResendConfig };
