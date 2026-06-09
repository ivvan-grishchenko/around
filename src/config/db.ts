import { createServerOnlyFn } from '@tanstack/react-start';
import { z } from 'zod';

const dbSchema = z
	.object({
		connectionString: z.string(),
		database: z.string(),
		host: z.string(),
		password: z.string(),
		port: z.number(),
		username: z.string(),
	})
	.refine(
		(data) => {
			const expected = `postgresql://${data.username}:${data.password}@${data.host}:${data.port}/${data.database}`;
			return data.connectionString === expected;
		},
		{
			message: 'Connection string does not match the provided database credentials',
			path: ['connectionString'],
		}
	);
type DbConfig = z.infer<typeof dbSchema>;

const getDbConfig = createServerOnlyFn((): DbConfig => {
	const config: DbConfig = {
		connectionString: process.env.DB_URL,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
	};

	return dbSchema.parse(config);
});

export { getDbConfig };
