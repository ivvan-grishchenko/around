import { getDbConfig } from '@config/db';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from './generated/prisma/client';

export class PrismaService {
	private static instance: PrismaClient | null = null;

	// Private constructor prevents using the 'new' keyword outside this class
	private constructor() {}

	public static getInstance(): PrismaClient {
		if (PrismaService.instance) return PrismaService.instance;

		const pool = new Pool({ connectionString: getDbConfig().connectionString });
		const adapter = new PrismaPg(pool);

		PrismaService.instance = new PrismaClient({ adapter });

		return PrismaService.instance;
	}
}
