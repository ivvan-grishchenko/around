import { NoiseBackground } from '@components/layout/NoiseBackground';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

interface AddEntryFormProps {
	isEmpty?: boolean;
}

const AddEntryForm = ({ isEmpty }: AddEntryFormProps) => (
	<NoiseBackground>
		<div className="flex flex-col gap-3 rounded-lg border border-border bg-secondary p-4">
			<span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
				Input new coord
			</span>
			<Input placeholder="Country code..." />
			<Button className="w-full">{isEmpty ? 'Log first entry' : 'Log entry'}</Button>
		</div>
	</NoiseBackground>
);

export { AddEntryForm };
