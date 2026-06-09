import { getBetterAuthConfig } from '@config/better-auth';
import { getGoogleConfig } from '@config/google';
import { getResendConfig } from '@config/resend';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { twoFactor } from 'better-auth/plugins';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { Resend } from 'resend';

import { PrismaService } from '../prisma.server';

const betterAuthConfig = getBetterAuthConfig();
const googleConfig = getGoogleConfig();
const resendConfig = getResendConfig();

const resend = new Resend(resendConfig.resendApiKey);
const EMAIL_SEND_FROM = 'onboarding@resend.dev';

const auth = betterAuth({
	appName: 'around',
	baseURL: betterAuthConfig.baseUrl,
	database: prismaAdapter(PrismaService.getInstance(), { provider: 'postgresql' }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		revokeSessionsOnPasswordReset: true,
		sendResetPassword: async ({ user, url }) => {
			void resend.emails.send({
				from: EMAIL_SEND_FROM,
				template: {
					id: 'password-reset',
					variables: { first_name: user.name, reset_password_url: url },
				},
				to: user.email,
			});
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			void resend.emails.send({
				from: EMAIL_SEND_FROM,
				template: {
					id: 'confirm-email',
					variables: { first_name: user.name, verification_url: url },
				},
				to: user.email,
			});
		},
	},
	plugins: [twoFactor({ issuer: 'around' }), tanstackStartCookies()],
	socialProviders: {
		google: {
			clientId: googleConfig.clientId,
			clientSecret: googleConfig.secret,
		},
	},
});

export { auth };
