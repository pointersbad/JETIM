import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
	interface CustomPalette {
		purple: PaletteColorOptions;
	}
	interface Palette extends CustomPalette {}
	interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		purple: true;
	}
}

declare module '@mui/material/TextField' {
	interface TextFieldPropsColorOverrides {
		purple: true;
	}
}
