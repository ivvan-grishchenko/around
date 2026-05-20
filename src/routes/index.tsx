import { Show, SignIn, UserButton } from '@clerk/tanstack-react-start';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => (
	<div>
		<h1>Index Route</h1>
		<Show when="signed-in">
			<UserButton />
		</Show>
		<Show when="signed-out">
			<SignIn />
		</Show>
	</div>
);

const Route = createFileRoute('/')({
	component: Home,
});

export { Route };
