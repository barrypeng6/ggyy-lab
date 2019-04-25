import React from 'react';
import { Text, Box, Button, Grommet, Layer } from 'grommet';
import { Menu, Close } from 'grommet-icons';
import Link from 'next/link';

const MENU_ITEMS = [
	{
		id: 'home',
		label: 'Home',
		url: '/',
	},
	{
		id: 'random-number',
		label: 'Random Number',
		url: '/random-number',
	},
];

const theme = {
	global: {
		colors: {
			doc: '#ff99cc',
		},
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		},
	},
	grommet: {
		extend: {
			height: '100%',
		},
	},
};

export default (props) => {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Grommet theme={theme}>
				<Box fill background="brand">
					<Box direction="row">
						<Button icon={<Menu />} onClick={() => setOpen(true)} />
					</Box>

					{open && (
						<Layer
							position="left"
							full="vertical"
							onEsc={() => setOpen(false)}
							onClickOutside={() => setOpen(false)}
						>
							<Box background="neutral-4" fill="vertical">
								<Box pad={{ bottom: 'small' }}>
									<Button icon={<Close />} onClick={() => setOpen(false)} />
								</Box>
								{MENU_ITEMS.map(item => (
									<Box
										key={item.id}
										margin={{ horizontal: 'large' }}
										height="xxsmall"
									>
										<Link href={item.url}>
											<Button fill hoverIndicator={true}>
												<Text size="large">{item.label}</Text>
											</Button>
										</Link>{' '}
									</Box>
								))}
							</Box>
						</Layer>
					)}
					<Box pad="medium">
						{props.children}
					</Box>
				</Box>
			</Grommet>
		</>
	);
};
