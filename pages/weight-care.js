import React from 'react';
import {
	Box,
	Button,
	DataTable,
	ResponsiveContext,
	Text,
	Layer,
} from 'grommet';
import * as Icons from 'grommet-icons';
import AppWrapper from '../components/AppWrapper';
import OptionModal from '../components/OptionsModal';

const DATA = [
	{ date: '4/20', weight: '78.8', bfp: '24.5', activeFat: '10', bmi: '25.9' },
	{ date: '4/21', weight: '78.5', bfp: '24.5', activeFat: '10', bmi: '25.9' },
	{ date: '4/22', weight: '77.2', bfp: '24.5', activeFat: '10', bmi: '25.9' },
	{ date: '4/23', weight: '76.8', bfp: '24.5', activeFat: '10', bmi: '25.9' },
	{ date: '4/24', weight: '77.1', bfp: '24.5', activeFat: '10', bmi: '25.9' },
];

export default () => {
	const [addModalOpen, setAddModalOpen] = React.useState(false);
	const [optionsModalOpen, setOptionsModalOpen] = React.useState(false);
	const openAddModal = () => setAddModalOpen(true);

	const handleOpenOptionModal = () => setOptionsModalOpen(true);
	const handleCloseOptionModal = () => setOptionsModalOpen(false);

	const renderColumn = size => {
		return [
			{
				property: 'date',
				header: <Text size={size}>Date</Text>,
				primary: true,
				align: 'center',
				render: data => (
					<Button plain onClick={handleOpenOptionModal}>
						<Text size={size}>{data.date}</Text>
					</Button>
				),
			},
			{
				property: 'weight',
				header: <Text size={size}>Weight</Text>,
				align: 'end',
				render: data => <Text weight="bold">{data.weight}</Text>,
			},
			{
				property: 'bfp',
				header: <Text size={size}>BFP</Text>,
				align: 'end',
				render: data => <Text weight="bold">{data.bfp}</Text>,
			},
			{
				property: 'activeFat',
				header: <Text size={size}>Vis.</Text>,
				align: 'end',
				render: data => <Text weight="bold">{data.activeFat}</Text>,
			},
			{
				property: 'bmi',
				header: <Text size={size}>BMI</Text>,
				align: 'end',
				render: data => <Text weight="bold">{data.bmi}</Text>,
			},
		];
	};

	return (
		<AppWrapper>
			<ResponsiveContext.Consumer>
				{size => (
					<>
						<OptionModal
							open={optionsModalOpen}
							onClose={handleCloseOptionModal}
							actions={[
								{
									id: 'add',
									label: 'Add',
									icon: 'Edit',
									action: () => {},
								},
								{
									id: 'remove',
									label: 'Remove',
									icon: 'Trash',
									action: () => {},
								},
								{
									id: 'cancel',
									label: 'Cancel',
									icon: 'Close',
									action: handleCloseOptionModal,
								},
							]}
						/>
						<Box direction="row">
							<Button
								primary
								icon={<Icons.AddCircle />}
								label="Add"
								onClick={openAddModal}
							/>
						</Box>
							<br />
						<Box direction="row" flex justify="center" fill={size === 'small'}>
							<DataTable columns={renderColumn(size)} data={DATA} />
						</Box>
					</>
				)}
			</ResponsiveContext.Consumer>
		</AppWrapper>
	);
};
