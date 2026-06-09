import type { QueryClient } from '@tanstack/react-query';

import type { Theme } from './theme';

interface Session {
	user: {
		id: string;
		email: string;
		name: string;
	};
	session: {
		id: string;
	};
}

interface RouterContext {
	queryClient: QueryClient;
	theme: Theme;
	session?: Session;
}

export type { RouterContext, Session };
