import { Card, CardContent, CardHeader } from '@components/ui/Card';
import { Progress } from '@components/ui/Progress';
import { H1 } from '@components/ui/Typography';

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
				<H1 className="text-start">Total Coverage</H1>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 p-6">
				<div className="flex items-baseline gap-1">
					<span className="text-5xl font-bold text-foreground">{visited}</span>
					<span className="text-3xl font-medium text-muted-foreground">/{total}</span>
				</div>
				<Progress value={percentage} />
			</CardContent>
		</Card>
	);
};

export { CoverageCard };
