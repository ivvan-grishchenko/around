import { clerkMiddleware } from '@clerk/tanstack-react-start/server';
import { createStart } from '@tanstack/react-start';

const startInstance = createStart(() => ({
	requestMiddleware: [clerkMiddleware()],
}));

export { startInstance };
