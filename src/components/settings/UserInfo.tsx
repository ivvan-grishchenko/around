import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar';
import { CameraIcon } from 'lucide-react';

interface UserInfoProps {
	createdAt: Date | null;
	email: string;
	name: string;
}

const getInitials = (name: string) =>
	name
		.split(' ')
		.map((part) => part.charAt(0))
		.join('')
		.toUpperCase()
		// oxlint-disable-next-line no-magic-numbers
		.slice(0, 2);

const formatMemberSince = (date: Date | null) => {
	if (!date) return '';

	return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
};

const UserInfo = ({ createdAt, email, name }: UserInfoProps) => {
	const memberSince = formatMemberSince(createdAt);

	return (
		<div className="flex items-center gap-6">
			<Avatar className="relative size-32 overflow-visible ring ring-ring">
				<AvatarImage src="" alt={name} />
				<AvatarFallback className="bg-linear-to-r from-pink-500 to-orange-600 text-4xl text-foreground">
					{getInitials(name)}
				</AvatarFallback>
				<div className="absolute right-0 bottom-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
					<CameraIcon />
				</div>
			</Avatar>
			<div className="flex flex-col gap-1">
				<h2 className="text-3xl font-bold">{name}</h2>
				<p className="text-sm text-muted-foreground">
					{memberSince && `Member since ${memberSince} · `}
					{email}
				</p>
			</div>
		</div>
	);
};

export { UserInfo };
