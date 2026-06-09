/// <reference types="vite/client" />

declare global {
	// Server-side environment variables
	namespace NodeJS {
		interface ProcessEnv {
			readonly DB_USERNAME: string;
			readonly DB_PASSWORD: string;
			readonly DB_HOST: string;
			readonly DB_PORT: number;
			readonly DB_DATABASE: string;
			readonly DB_URL: string;

			readonly BETTER_AUTH_URL: string;
			readonly BETTER_AUTH_SECRET: string;

			readonly GOOGLE_CLIENT_ID: string;
			readonly GOOGLE_CLIENT_SECRET: string;

			readonly RESEND_API_KEY: string;
		}
	}
}

export {};
