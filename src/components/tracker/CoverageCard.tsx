import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Progress } from '@components/ui/Progress';
import { Menu } from 'lucide-react';

interface CoverageCardProps {
	visited: number;
	total: number;
}

const PERCENTAGE_BASE = 100;

const CoverageCard = ({ visited, total }: CoverageCardProps) => {
	const percentage = total > 0 ? (visited / total) * PERCENTAGE_BASE : 0;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Coverage</CardTitle>
				<CardAction>
					<Menu className="h-[18px] w-[18px] text-muted-foreground" />
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex items-baseline gap-1">
					<span className="text-[48px] leading-none font-bold text-foreground">{visited}</span>
					<span className="text-3xl font-medium text-muted-foreground">/{total}</span>
				</div>
				<Progress value={percentage} />
			</CardContent>
		</Card>
	);
};

export { CoverageCard };
