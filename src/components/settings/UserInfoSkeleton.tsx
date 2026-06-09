import { Skeleton } from '@components/ui/Skeleton';

const UserInfoSkeleton = () => (
	<div className="flex items-center gap-6">
		<Skeleton className="size-32 rounded-full" />
		<div className="flex flex-col gap-2">
			<Skeleton className="h-9 w-48" />
			<Skeleton className="h-4 w-72" />
		</div>
	</div>
);

export { UserInfoSkeleton };
