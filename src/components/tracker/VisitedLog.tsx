import { VisitedEntry } from '@components/tracker/VisitedEntry';
import { VisitedLogEmpty } from '@components/tracker/VisitedLogEmpty';

interface VisitedCountry {
	countryCode: string;
	countryName: string;
	id: string;
	visitedAt: Date;
}

interface VisitedLogProps {
	countries: VisitedCountry[];
	onRemove?: (id: string) => void;
}

const VisitedLog = ({ countries, onRemove }: VisitedLogProps) => (
	<>
		<div className="flex items-center justify-between">
			<span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
				Visited Log
			</span>
			<span className="text-xs text-muted-foreground">[{countries.length}]</span>
		</div>
		{!countries.length ? (
			<VisitedLogEmpty />
		) : (
			<div className="flex flex-col gap-2">
				{countries.map((country) => (
					<VisitedEntry
						key={country.id}
						countryName={country.countryName}
						visitedAt={country.visitedAt}
						onRemove={onRemove ? () => onRemove(country.id) : undefined}
					/>
				))}
			</div>
		)}
		<div className="flex-1" />
	</>
);

export { VisitedLog };
export type { VisitedCountry };
