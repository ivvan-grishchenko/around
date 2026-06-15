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
		<div className="flex items-center justify-between rounded-lg bg-card px-3 py-3">
			<span className="text-sm font-semibold text-foreground">{countryName.toUpperCase()}</span>
			<div className="flex items-center gap-3">
				<span className="text-xs text-muted-foreground">{formattedDate}</span>
				{onRemove && (
					<button
						className="rounded p-0.5 text-muted-foreground hover:text-destructive"
						onClick={onRemove}
						type="button">
						<X className="h-3.5 w-3.5" />
					</button>
				)}
			</div>
		</div>
	);
};

export { VisitedEntry };
