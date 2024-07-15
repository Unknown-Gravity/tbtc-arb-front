// src/theme/theme.ts
import {
	extendTheme,
	StyleFunctionProps,
	ThemeConfig,
	ThemeOverride,
} from '@chakra-ui/react';
import { darken } from '@chakra-ui/theme-tools';

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
		primaryGray: '#4A5568',
		coolGray: '#B1BCCC',
		gray: '#828282',
	},
	dark: {
		primaryGray: '#1D2229',
		focusGray: '#161A1F',
		coolGray: '#B1BCCC',
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
					`linear-gradient(-45deg, #AB5AFA , #EDC6FF)`,
				backgroundClip: props.colorMode === 'dark' && 'text',
				fill: props.colorMode === 'dark' && 'transparent',
			}),

			grayPurpleGradient: (props: StyleFunctionProps) => ({
				color: props.colorMode === 'light' ? 'light.gray' : 'none',
				bg:
					props.colorMode === 'dark' &&
					`linear-gradient(#D987FF 60%, #AB5AFA)`,
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

	Stepper: {
		baseStyle: (props: StyleFunctionProps) => ({
			indicator: {
				'&[data-status=complete]': {
					bg: 'none',
					w: '24px',
					h: '24px',
					border: `2px solid ${
						props.colorMode === 'light'
							? props.theme.colors.dark.coolGray
							: props.theme.colors.dark.coolGray
					}`,
				},
				'&[data-status=active]': {
					bg: 'none',
					w: '24px',
					h: '24px',
					border: `2px solid ${
						props.colorMode === 'light'
							? props.theme.colors.dark.coolGray
							: props.theme.colors.dark.coolGray
					}`,
				},
				'&[data-status=incomplete]': {
					bg: 'none',
					w: '24px',
					h: '24px',
					border: `2px solid ${
						props.colorMode === 'light'
							? props.theme.colors.dark.coolGray
							: props.theme.colors.dark.coolGray
					}`,
				},
			},

			number: {
				color:
					props.colorMode === 'dark' ? 'white' : 'brand.purple.900',
				fontWeight: 700,
			},

			step: {
				fontSize: '14px',
				w: '492px',
			},

			title: {
				fontSize: '14px',
			},
			separator: {
				border: `1px solid ${props.theme.colors.dark.coolGray}`,
				ml: '-4px',
			},
		}),
	},

	Link: {
		variants: {
			purpleDarkGradient: (props: StyleFunctionProps) => ({
				transition: 'text-decoration 0.2s',
				color:
					props.colorMode === 'light' ? 'brand.purple.900' : 'none',
				bg:
					props.colorMode === 'dark' &&
					`linear-gradient(-45deg, #AB5AFA , #EDC6FF)`,
				backgroundClip: props.colorMode === 'dark' && 'text',
				fill: props.colorMode === 'dark' && 'transparent',
			}),
		},
	},
};

export const theme = extendTheme({ config, styles, components, fonts, colors });
