import { Skeleton } from '@components/ui/Skeleton';

const LoginFormSkeleton = () => (
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
			<div className="flex items-center justify-between">
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-32" />
			</div>
			<Skeleton className="h-10 w-full" />
		</div>
		<div className="relative flex items-center">
			<div className="grow border-t border-border" />
			<span className="mx-4 text-xs text-muted-foreground">Or</span>
			<div className="grow border-t border-border" />
		</div>
		<Skeleton className="h-10 w-full" />
		<Skeleton className="h-10 w-full" />
	</div>
);

export { LoginFormSkeleton };
