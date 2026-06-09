import { Button } from '@components/ui/Button';
import { withForm } from '@hooks/use-form';
import { toast } from 'sonner';

import { settingsFormOpts } from './SharedFormOpts';

// TODO: implement real data export
const handlePrepareDownload = () => {
	toast.info('TODO: trigger travel history export');
};

const DataExportFields = withForm({
	...settingsFormOpts,
	render: () => (
		<div className="flex flex-col gap-4 rounded-lg border border-border p-6 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h4 className="text-base font-semibold">Export Travel History</h4>
				<p className="text-sm text-muted-foreground">
					Download your complete log in JSON or CSV format
				</p>
			</div>
			<Button type="button" variant="outline" onClick={handlePrepareDownload}>
				PREPARE DOWNLOAD
			</Button>
		</div>
	),
});

export { DataExportFields };
