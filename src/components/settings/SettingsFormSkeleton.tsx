import { Skeleton } from '@components/ui/Skeleton';

import { UserInfoSkeleton } from './UserInfoSkeleton';

const FieldRowSkeleton = () => (
	<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div className="flex flex-col gap-2">
			<Skeleton className="h-3 w-32" />
			<Skeleton className="h-10 w-full" />
		</div>
		<div className="flex flex-col gap-2">
			<Skeleton className="h-3 w-32" />
			<Skeleton className="h-10 w-full" />
		</div>
	</div>
);

const SettingsFormSkeleton = () => (
	<div className="flex flex-col gap-12">
		<section className="flex flex-col gap-8">
			<UserInfoSkeleton />
			<div className="flex flex-col gap-3">
				<Skeleton className="h-6 w-40" />
				<FieldRowSkeleton />
			</div>
		</section>
		<section className="flex flex-col gap-3">
			<Skeleton className="h-6 w-48" />
			<FieldRowSkeleton />
		</section>
		<section className="flex flex-col gap-3">
			<Skeleton className="h-6 w-48" />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<Skeleton className="h-32 rounded-lg" />
				<Skeleton className="h-32 rounded-lg" />
				<Skeleton className="h-32 rounded-lg" />
			</div>
		</section>
		<section className="flex flex-col gap-3">
			<Skeleton className="h-6 w-48" />
			<Skeleton className="h-24 w-full rounded-lg" />
		</section>
		<div className="flex gap-3 border-t border-border pt-6">
			<Skeleton className="h-10 w-1/2" />
			<Skeleton className="h-10 w-1/2" />
		</div>
		<section className="flex flex-col gap-3">
			<Skeleton className="h-6 w-32" />
			<Skeleton className="h-40 w-full rounded-lg" />
		</section>
	</div>
);

export { SettingsFormSkeleton };
