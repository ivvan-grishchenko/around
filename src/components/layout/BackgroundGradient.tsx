import type { ComponentProps } from 'react';

import { cn } from '@lib/utils';

const BackgroundGradient = ({ className, children, ...props }: ComponentProps<'div'>) => (
	<div
		data-slot="background-gradient"
		className={cn('relative overflow-hidden bg-gradient', className)}
		{...props}>
		<div className="relative z-10 flex min-h-svh w-full flex-col items-center justify-center">
			{children}
		</div>
	</div>
);

export { BackgroundGradient };
