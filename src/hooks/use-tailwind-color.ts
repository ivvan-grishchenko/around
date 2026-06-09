import { formatRgb, parse } from 'culori';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const colorVariableSchema = z.literal([
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'primary',
	'primary-foreground',
	'secondary',
	'secondary-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'destructive',
	'border',
	'input',
	'ring',
	'radius',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5',
	'sidebar',
	'sidebar-foreground',
	'sidebar-primary',
	'sidebar-primary-foreground',
	'sidebar-accent',
	'sidebar-accent-foreground',
	'sidebar-border',
	'sidebar-ring',
]);
type ColorVariableType = z.infer<typeof colorVariableSchema>;

const fallbackColorSchema = z.hex();
type FallbackColorType = z.infer<typeof fallbackColorSchema>;

const useTailwindColor = (
	colorVariable: ColorVariableType,
	fallbackColor: FallbackColorType = '#ffffff'
) => {
	const [tailwindColor, setTailwindColor] = useState(fallbackColor);

	useEffect(() => {
		const rawColor = getComputedStyle(document.documentElement)
			.getPropertyValue(`--${colorVariable}`)
			.trim();

		if (rawColor) setTailwindColor(formatRgb(parse(rawColor)) || fallbackColor);
	}, [colorVariable, fallbackColor]);

	return tailwindColor;
};

export { useTailwindColor };
