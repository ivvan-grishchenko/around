/* oxlint-disable no-magic-numbers, id-length, max-params */
import type { Theme } from '@type/theme';

import { useTheme } from '@hooks/use-theme';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

interface WavyBackgroundClientProps {
	colors?: string[];
	waveWidth?: number;
	backgroundFill?: string;
	blur?: number;
	speed?: 'slow' | 'fast';
	waveOpacity?: number;
}

// TODO: support other themes
const colorsMap = new Map<Theme, string[]>([
	['monolith-dark', ['#a3b3ff', '#615fff', '#4f39f6', '#432dd7', '#372aac']],
]);
// TODO: support other themes
const backgroundFillMap = new Map<Theme, string>([['monolith-dark', '#090b0c']]);

const initCanvas = (ctx: CanvasRenderingContext2D, blur: number) => {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.filter = `blur(${blur}px)`;
};

const drawFrame = (
	ctx: CanvasRenderingContext2D,
	noise: (x: number, y: number, z: number) => number,
	nt: number,
	cfg: { backgroundFill: string; waveOpacity: number; waveWidth: number; waveColors: string[] }
) => {
	const { width: w, height: h } = ctx.canvas;
	ctx.fillStyle = cfg.backgroundFill;
	ctx.globalAlpha = cfg.waveOpacity;
	ctx.fillRect(0, 0, w, h);

	// Multi-wave calculation loop
	for (let i = 0; i < 5; i++) {
		ctx.beginPath();
		ctx.lineWidth = cfg.waveWidth;
		ctx.strokeStyle = cfg.waveColors[i % cfg.waveColors.length];
		for (let x = 0; x < w; x += 5) {
			const y = noise(x / 800, 0.3 * i, nt) * 100;
			ctx.lineTo(x, y + h * 0.5);
		}
		ctx.stroke();
		ctx.closePath();
	}
};

const WavyBackgroundClient = ({
	colors,
	waveWidth = 50,
	backgroundFill,
	blur = 10,
	speed = 'fast',
	waveOpacity = 0.5,
}: WavyBackgroundClientProps) => {
	const { theme } = useTheme();
	const noise = useMemo(() => createNoise3D(), []);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isSafari, setIsSafari] = useState(false);

	const waveColors = useMemo(() => {
		if (colors) return colors;

		return colorsMap.get(theme) ?? ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'];
	}, [colors, theme]);
	const style = useMemo(() => (isSafari ? { filter: `blur(${blur}px)` } : {}), [isSafari, blur]);

	// Track dynamic animation options without resetting the requestAnimationFrame loop
	const animConfig = useRef({
		backgroundFill: backgroundFillMap.get(theme) ?? backgroundFill ?? 'black',
		blur,
		speed,
		waveColors,
		waveOpacity,
		waveWidth,
	});

	useEffect(() => {
		const backgroundFillCalculated = backgroundFillMap.get(theme) ?? backgroundFill ?? 'black';
		animConfig.current = {
			backgroundFill: backgroundFillCalculated,
			blur,
			speed,
			waveColors,
			waveOpacity,
			waveWidth,
		};
	}, [waveWidth, backgroundFill, blur, waveOpacity, waveColors, speed, theme]);

	useEffect(() => {
		setIsSafari(
			typeof window !== 'undefined' &&
				/Safari/.test(navigator.userAgent) &&
				!/Chrome/.test(navigator.userAgent)
		);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		let nt = 0;
		const resize = () => initCanvas(ctx, animConfig.current.blur);
		window.addEventListener('resize', resize);
		resize();

		let animationId = requestAnimationFrame(function render() {
			nt += animConfig.current.speed === 'fast' ? 0.002 : 0.001;
			drawFrame(ctx, noise, nt, animConfig.current);
			animationId = requestAnimationFrame(render);
		});

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
		};
	}, [noise]);

	return <canvas className="absolute inset-0 z-0" ref={canvasRef} id="canvas" style={style} />;
};

export { WavyBackgroundClient };
