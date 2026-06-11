import { Download } from 'lucide-react';

const VisitedLogEmpty = () => (
	<div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12 text-center">
		<Download className="h-12 w-12 text-muted-foreground/50" />
		<p className="text-sm font-medium text-foreground">No entries yet.</p>
		<p className="text-xs text-muted-foreground">Your travel history will appear here.</p>
	</div>
);

export { VisitedLogEmpty };
