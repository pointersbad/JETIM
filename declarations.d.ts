import { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
	interface CustomPalette {
		purple: PaletteColor;
		white: PaletteColor;
	}
	interface Palette extends CustomPalette {}
	interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		purple: true;
		white: true;
	}
}

declare module '@mui/material/TextField' {
	interface TextFieldPropsColorOverrides {
		purple: true;
	}
}
