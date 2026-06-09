import { Skeleton } from '@components/ui/Skeleton';

const PasswordResetFormSkeleton = () => (
	<div className="flex flex-col gap-6">
		<div className="flex flex-col gap-2">
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-10 w-full" />
		</div>
		<Skeleton className="h-10 w-full" />
	</div>
);

export { PasswordResetFormSkeleton };
