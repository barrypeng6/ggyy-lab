import React from 'react';
import { Text, Box, Button, Heading, Grommet, Layer, TextInput } from 'grommet';
import { Send, Menu, Close } from 'grommet-icons';
import Link from 'next/link';
import Head from 'next/head';

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

const getRandomNum = (fromNum, toNum) => {
	return Math.floor(Math.random() * (+toNum - +fromNum + 1)) + +fromNum;
};

export default () => {
	const [open, setOpen] = React.useState(false);
	const [fromNum, setFromNum] = React.useState(null);
	const [toNum, setToNum] = React.useState(null);
	const [randomNum, setRandomNum] = React.useState(null);
	const [error, setError] = React.useState('');

	const changeFromNum = event => {
		const num = Number(event.target.value);
		if (!isNaN(num)) setFromNum(num);
	};
	const changeToNum = event => {
		const num = Number(event.target.value);
		if (!isNaN(num)) setToNum(num);
	};
	const handleSend = () => {
		// Validation
		if (fromNum <= toNum) {
			setRandomNum(getRandomNum(fromNum, toNum));
			setError('');
		} else {
			setError('Minimum number must be larger than maximum.');
		}
	};
	return (
		<>
			<Head>
				<title>Random Number</title>
			</Head>
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

					<Box direction="column" justify="center" pad="medium" align="center">
						<Heading level="3" margin="none" textAlign="center">
							Random Number
						</Heading>
						<Box width="small" pad="medium">
							<Text
								style={{ opacity: 0.4 }}
								size={randomNum == null ? 'medium' : 'xxlarge'}
								textAlign="center"
							>
								{randomNum == null ? 'type your range' : randomNum}
							</Text>
						</Box>
						<Box width="small" pad="small">
							<TextInput
								name="fromNum"
								placeholder="from"
								value={fromNum == null ? '' : fromNum}
								onChange={changeFromNum}
							/>
						</Box>
						<Box width="small" pad="small">
							<TextInput
								name="toNum"
								placeholder="to"
								value={toNum == null ? '' : toNum}
								onChange={changeToNum}
							/>
						</Box>
						{error && (
							<Box width="small" pad="small">
								<Text size="medium" textAlign="center" color="status-error">
									{error}
								</Text>
							</Box>
						)}
						<Box width="small" pad="small">
							<Button
								icon={<Send />}
								primary
								label="Send"
								disabled={fromNum == null || toNum == null}
								onClick={handleSend}
							/>
						</Box>
					</Box>
				</Box>
			</Grommet>
		</>
	);
};
