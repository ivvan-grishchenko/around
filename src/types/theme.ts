import { z } from 'zod';

const themeSchema = z.enum(['monolith-dark', 'deep-ocean', 'nebula-gradient']);
type Theme = z.infer<typeof themeSchema>;

export type { Theme };
export { themeSchema };
