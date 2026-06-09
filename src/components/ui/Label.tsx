import type { ComponentProps } from 'react';

import { cn } from '@lib/utils';

const Label = ({ className, ...props }: ComponentProps<'label'>) => (
	<label
		data-slot="label"
		className={cn('text-xs font-medium tracking-wide text-muted-foreground uppercase', className)}
		{...props}
	/>
);

export { Label };
