import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@components/ui/Empty';
import { Download } from 'lucide-react';

const VisitedLogEmpty = () => (
	<Empty>
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<Download className="h-8 w-8 text-muted-foreground" />
			</EmptyMedia>
			<EmptyTitle>No entries yet.</EmptyTitle>
			<EmptyDescription>Your travel history will appear here.</EmptyDescription>
		</EmptyHeader>
	</Empty>
);

export { VisitedLogEmpty };
