import '@/styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
	typography: {
		fontFamily: 'Orbitron',
	},
	palette: {
		purple: createColor('#7d43b4'),
		white: createColor('#ffffff'),
	},
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider {...{ theme }}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
