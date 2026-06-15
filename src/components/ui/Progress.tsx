import type { ComponentProps } from 'react';

import { cn } from '@lib/utils';
// oxlint-disable-next-line import/no-namespace
import * as ProgressPrimitive from '@radix-ui/react-progress';

// oxlint-disable-next-line no-magic-numbers
const getStyle = (value?: number | null) => ({ transform: `translateX(-${100 - (value || 0)}%)` });

const Progress = ({
	className,
	value,
	...props
}: ComponentProps<typeof ProgressPrimitive.Root>) => (
	<ProgressPrimitive.Root
		data-slot="progress"
		className={cn(
			'relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted',
			className
		)}
		{...props}>
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			className="size-full flex-1 bg-linear-to-r from-blue-500 via-pink-500 to-orange-500 transition-all"
			style={getStyle(value)}
		/>
	</ProgressPrimitive.Root>
);

export { Progress };
