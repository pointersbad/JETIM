import Dialogue from '@/components/dialogue';
import Header from '@/components/header';
import { Button, TextField } from '@mui/material';
import { CSSProperties, useState } from 'react';

const links = {
	'About Us': 'about',
	Blog: 'blog',
	Resources: 'resources',
	'How It Works': 'faq',
};

export default function Home() {
	const [message, setMessage] = useState('');
	const [request, setRequest] = useState('');

	const sendPrompt = async (prompt: string) => {
		const url = 'https://api.openai.com/v1/completions';
		const body = JSON.stringify({ model: 'text-davinci-003', prompt, max_tokens: 200 });
		const headers: HeadersInit = {
			Authorization: `Bearer ${process.env.SECRET}`,
			'Content-Type': 'application/json',
		};
		const response = await fetch(url, { headers, body, method: 'POST' });
		const { choices } = await response.json();
		console.log(choices);
		return choices[0].text;
	};

	const handleAsk = () => {
		sendPrompt(request).then((response) => setMessage(response));
		setRequest('');
	};

	return (
		<>
			<div style={styles.bg} />
			<Dialogue open={message !== ''} onClose={() => setMessage('')}>
				{message}
			</Dialogue>
			<Header {...{ links }} />
			<img style={styles.logo} src="/logo.png" />

			<div style={styles.contentContainer}>
				<div style={styles.barContainer}>
					<TextField
						label="Ask me anything!"
						color="purple"
						variant="filled"
						value={request}
						onKeyDown={(event) => event.key === 'Enter' && handleAsk()}
						onChange={(event) => setRequest(event.target.value)}
						sx={styles.textField}
					/>

					<Button sx={styles.button} color="purple" variant="contained" onClick={handleAsk}>
						Ask
					</Button>
				</div>
			</div>
		</>
	);
}

const styles = {
	bg: {
		backgroundImage: 'url(/gif.gif)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		position: 'fixed',
		inset: '0 0 0 0',
		zIndex: -1,
	},
	logo: {
		position: 'absolute',
		transform: 'translate(-50%, -50%) scale(0.5)',
		top: '50%',
		left: '50%',
	},
	contentContainer: { height: '90vh', marginTop: '10vh' },
	barContainer: {
		display: 'flex',
		position: 'absolute',
		left: 120,
		right: 120,
		bottom: 50,
		gap: 10,
	},
	button: { width: 200, borderRadius: 3 },
	textField: {
		div: { ':before, :after': { left: 4, right: 4 } },
		background: 'white',
		borderRadius: 3,
		border: 2,
		flex: 1,
	},
} as const;
