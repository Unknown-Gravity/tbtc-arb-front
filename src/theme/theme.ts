import {
	extendTheme,
	StyleFunctionProps,
	ThemeConfig,
	ThemeOverride,
} from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const styles: ThemeOverride['styles'] = {
	global: props => ({
		body: {
			height: '100vh',
			width: '100%',
		},
	}),
};

const colors: ThemeOverride['colors'] = {
	brand: {
		purple: {
			900: '#7D00FF',
			800: '#9B33FF',
			700: '#AF66FF',
			600: '#C399FF',
			500: '#D7CCFF',
			400: '#EBE1FF',
			300: '#F5EBFF',
			200: '#FAF5FF',
			100: '#FFF9FF',
		},
		yellow: {
			900: '#FAAD14',
			800: '#FFBA3F',
			700: '#FFC76A',
			600: '#FFD495',
			500: '#FFE1C0',
			400: '#FFEBE6',
			300: '#FFF2E3',
			200: '#FFF8F0',
			100: '#FFFDF5',
		},
	},
	light: {
		primaryGray: '#4A5568', // Titulos
		coolGray: '#B1BCCC', // Detalles
		gray: '#828282', // Navbar
	},
	dark: {
		primaryGray: '#1D2229', // Fondos de cajas
		focusGray: '#161A1F', // Fondo de inputs y focus de pestañas
		coolGray: '#B1BCCC', // Navbar links y detalles
	},
};

const fonts: ThemeOverride['fonts'] = {
	heading: 'Inter',
	body: 'Inter, sans-serif',
};

const components: ThemeOverride['components'] = {
	Text: {
		baseStyle: (props: StyleFunctionProps) => ({
			color: props.colorMode === 'dark' ? 'white' : 'light.primaryGray',
		}),

		variants: {
			gray: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'dark' ? 'dark.coolGray' : 'light.gray',
			}),

			purpleDarkGradient: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'light' ? 'brand.purple.900' : 'none',
				bg:
					props.colorMode === 'dark' &&
					`linear-gradient(to left, #7D00FF 20%, #D987FF)`,

				backgroundClip: props.colorMode === 'dark' && 'text',
				fill: props.colorMode === 'dark' && 'transparent',
			}),

			grayPurpleGradient: (props: StyleFunctionProps) => ({
				color: props.colorMode === 'light' ? 'light.gray' : 'none',
				bg:
					props.colorMode === 'dark' &&
					'linear-gradient(to left, #7D00FF 20%, #D987FF )',

				backgroundClip: props.colorMode === 'dark' && 'text',
				fill: props.colorMode === 'dark' && 'transparent',
			}),
		},
	},

	Button: {
		variants: {
			purple: (props: StyleFunctionProps) => ({
				py: '16px',
				px: '0px',
				fontWeight: 700,
				bg: 'brand.purple.900',
				color: props.colorMode === 'light' && 'white',
			}),

			whiteFilled: {
				color: 'brand.purple.900',
				bg: 'white',
				px: '47px',
				fontWeight: 600,
				transition: 'background-color 0.3s ease',

				_hover: {
					transition: 'background-color 0.3s ease',
					bg: 'brand.purple.300',
				},

				_active: {
					bg: 'brand.purple.500',
				},
			},
		},
	},
};

export const theme = extendTheme({ config, styles, components, fonts, colors });
