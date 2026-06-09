import type { ComponentProps, ComponentPropsWithoutRef } from 'react';

import { cn } from '@lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './InputGroup';

const DEFAULT_CLASS_NAMES = [
	'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
	'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
	'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
];

const Input = ({ className, type, ...props }: ComponentProps<'input'>) => (
	<input
		type={type}
		data-slot="input"
		className={cn(...DEFAULT_CLASS_NAMES, className)}
		{...props}
	/>
);

type PasswordInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
	visible?: boolean;
	onVisibilityChange?: (visible: boolean) => void;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ className, visible, onVisibilityChange, ...props }, ref) => {
		const [internalVisible, setInternalVisible] = useState(false);

		const showPassword = visible ?? internalVisible;
		const handleClick = () => {
			const next = !showPassword;
			onVisibilityChange?.(next);
			setInternalVisible(next);
		};

		return (
			<InputGroup>
				<InputGroupInput
					type={showPassword ? 'text' : 'password'}
					data-slot="input"
					className={cn(...DEFAULT_CLASS_NAMES, className)}
					ref={ref}
					{...props}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton size="icon-sm" className="ml-auto" onClick={handleClick}>
						{showPassword ? <EyeOff /> : <Eye />}
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		);
	}
);

export { Input, PasswordInput };
