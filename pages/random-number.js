import React from 'react';
import { Text, Box, Button, Heading, TextInput } from 'grommet';
import { Send } from 'grommet-icons';
import Head from 'next/head';
import AppWrapper from '../components/AppWrapper';

const getRandomNum = (fromNum, toNum) => {
	return Math.floor(Math.random() * (+toNum - +fromNum + 1)) + +fromNum;
};

export default () => {
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
			<AppWrapper>
				<Box direction="column" justify="center" align="center">
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
			</AppWrapper>
		</>
	);
};
