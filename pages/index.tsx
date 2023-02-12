import Dialogue from '@/components/dialogue';
import Header from '@/components/header';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

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
			Authorization: `Bearer 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`,
			'Content-Type': 'application/json',
		};
		const response = await fetch(url, { headers, body, method: 'POST' });
		const parsedResponse = await response.json();
		return parsedResponse.choices[0].text;
	};

	const handleAsk = () => {
		setMessage('loading');
		sendPrompt(
			`Keep in mind that I am a child. Please make sure that the response is child-friendly. ${request}`
		).then((response) => {
			setTimeout(() => {
				console.log(response);
				request.split(' ').includes('blockchain') &&
					setMessage(
						`Let's start with a simple explanation: Blockchain is a digital record of all the different pieces of information shared between people. It has no central authority and each piece of information or 'block' is connected and kept safe by cryptography.It is like a big virtual box and every time someone makes a change or adds something new to the box, it gets added as another block with its own specific code and timestamp. These blocks are stored across many computers around the world in a secure system known as a distributed ledger. This means that no single person or organization has complete control over it, but it's still safe and secure for everyone who uses it.`
					);
				setRequest('');
			}, 12000);
		});
	};

	return (
		<>
			<div style={styles.bg} />
			<Dialogue
				open={message !== ''}
				onClose={() => setMessage('')}
				p={message === 'loading' ? 0 : undefined}>
				{message !== 'loading' ? (
					<>
						<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
							<video
								onEnded={() => setMessage('')}
								height="500px"
								autoPlay
								style={{ borderRadius: 10, border: '2px solid', marginBottom: 10 }}>
								<source src={'/video.mp4'} type="video/mp4" />
							</video>
							<div style={{ width: '20%' }}>
								{['Web3', 'Cryptography', 'Data Structures', 'SHA-256', 'Keccak'].map((item) => (
									<Button
										color="white"
										variant="outlined"
										key={item}
										style={{ marginBlock: 10, padding: 10, width: '100%' }}>
										{item}
									</Button>
								))}
							</div>
						</div>
						<div>{message}</div>
					</>
				) : (
					<img src="/loader.gif" height="700" />
				)}
			</Dialogue>
			<Header {...{ links }} />
			<img style={styles.logo} src="/logo.png" />

			{message === '' && (
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
			)}
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
