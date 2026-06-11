import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { cn } from '@lib/utils';
import { useMemo, useState } from 'react';

interface AddEntryFormProps {
	isEmpty?: boolean;
}

const AddEntryForm = ({ isEmpty }: AddEntryFormProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const className = useMemo(
		() => cn('w-full bg-transparent px-2', !isHovered && isEmpty && 'animate-pulse'),
		[isHovered, isEmpty]
	);

	return (
		<div className="flex p-4">
			<Card
				className={className}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<Input />
				<Button>{isEmpty ? 'Log first entry' : 'Log entry'}</Button>
			</Card>
		</div>
	);
};

export { AddEntryForm };
