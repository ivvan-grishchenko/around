import { Skeleton } from '@components/ui/Skeleton';

const RegisterFormSkeleton = () => (
	<div className="flex flex-col gap-6">
		<div className="flex flex-col items-center gap-2 text-center">
			<Skeleton className="size-8 rounded-md" />
			<Skeleton className="h-6 w-48" />
			<Skeleton className="h-4 w-56" />
		</div>
		<div className="flex flex-col gap-2">
			<Skeleton className="h-4 w-12" />
			<Skeleton className="h-10 w-full" />
		</div>
		<div className="flex flex-col gap-2">
			<Skeleton className="h-4 w-12" />
			<Skeleton className="h-10 w-full" />
		</div>
		<div className="flex flex-col gap-2">
			<Skeleton className="h-4 w-16" />
			<Skeleton className="h-10 w-full" />
		</div>
		<div className="flex flex-col gap-2">
			<Skeleton className="h-4 w-32" />
			<Skeleton className="h-10 w-full" />
		</div>
		<Skeleton className="h-10 w-full" />
	</div>
);

export { RegisterFormSkeleton };
