import { GradientText } from '@components/ui/Typography';
import { X } from 'lucide-react';

interface VisitedEntryProps {
	countryName: string;
	visitedAt: Date;
	onRemove?: () => void;
}

const DATE_STRING_LENGTH = 2;
const ZERO_PAD = '0';

const VisitedEntry = ({ countryName, visitedAt, onRemove }: VisitedEntryProps) => {
	const formattedDate = `${visitedAt.getFullYear()}.${String(visitedAt.getMonth() + 1).padStart(DATE_STRING_LENGTH, ZERO_PAD)}`;

	return (
		<div className="group flex items-center justify-between rounded-lg border border-border/50 bg-card/50 px-4 py-3 transition-colors hover:bg-card">
			<GradientText content={countryName.toUpperCase()} />
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">{formattedDate}</span>
				{onRemove && (
					<button
						className="ml-2 rounded p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
						onClick={onRemove}
						type="button">
						<X className="h-3 w-3" />
					</button>
				)}
			</div>
		</div>
	);
};

export { VisitedEntry };
