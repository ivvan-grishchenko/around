import type { ComponentProps } from 'react';

import { cn } from '@lib/utils';

const H1 = ({ className, children, ...props }: ComponentProps<'h1'>) => (
	<h1
		className={cn(
			'cursor-default scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
			className
		)}
		{...props}>
		{children}
	</h1>
);

const GradientText = ({ className, content, ...props }: ComponentProps<'p'>) => (
	<p
		className={cn(
			'leading-7',
			'inline-block bg-linear-to-r from-pink-500 to-orange-600 bg-clip-text text-transparent',
			className
		)}
		{...props}>
		{content}
	</p>
);

export { H1, GradientText };
