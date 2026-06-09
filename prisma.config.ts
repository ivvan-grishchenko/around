import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
	datasource: {
		url: env('DB_URL'),
	},
	migrations: {
		path: 'prisma/migrations',
	},
	schema: 'prisma',
});
