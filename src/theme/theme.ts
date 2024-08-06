// src/theme/theme.ts
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
			bg: props.colorMode === 'dark' && 'dark.background',
		},
	}),
};

const colors: ThemeOverride['colors'] = {
	brand: {
		purple: {
			1000: '#4A2E99',
			900: '#7D00FF',
			990: '#7D00FF90',
			980: '#7D00FF80',
			970: '#7D00FF70',
			960: '#7D00FF60',
			950: '#7D00FF50',
			940: '#7D00FF40',
			930: '#7D00FF30',
			920: '#7D00FF20',
			910: '#7D00FF10',
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
		coolGray2: '#718096',
		gray: '#828282',
		lightGray: '#F6F7FA',
		superLightGray: '#E2E8F0',
		secondaryGray: '#323A47',
	},
	dark: {
		primaryGray: '#1D2229',
		focusGray: '#161A1F',
		coolGray: '#B1BCCC',
		background: '#161A1F',
		secondaryGray: '#323A47',
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

			gray2: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'dark'
						? 'dark.coolGray'
						: 'light.primaryGray',
			}),

			coolGray: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'light'
						? 'light.coolGray2'
						: 'dark.coolGray',
			}),

			lightCoolGray: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'light' ? 'light.coolGray2' : 'white',
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
					`linear-gradient(113.75deg, #EDC6FF 0%, #AB5AFA 100%);`,
				backgroundClip: props.colorMode === 'dark' && 'text',
				fill: props.colorMode === 'dark' && 'transparent',
				textDecorationLine: 'underline',
				WebkitBackgroundClip: 'text',
			}),

			purple: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'light' ? 'brand.purple.900' : 'white',
			}),

			darkPurpleGradient: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'light'
						? 'brand.purple.1000'
						: 'transparent',
				bg:
					props.colorMode === 'dark' &&
					`linear-gradient(#D987FF 60%, #AB5AFA)`,
				backgroundClip: props.colorMode === 'dark' && 'text',
				fill: props.colorMode === 'dark' && 'transparent',
			}),

			grayPurple: (props: StyleFunctionProps) => ({
				color:
					props.colorMode === 'light'
						? 'brand.purple.900'
						: 'dark.coolGray',
			}),
		},
	},
	Button: {
		variants: {
			purple: (props: StyleFunctionProps) => ({
				p: '0px 16px 0px 16px',
				fontWeight: 600,
				fontSize: '16px',
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

			lightpurple: (props: StyleFunctionProps) => ({
				bg: props.colorMode === 'dark' ? 'dark.primaryGray' : 'white',
				_active: {
					bg:
						props.colorMode === 'dark'
							? 'dark.focusGray'
							: 'brand.purple.910',
					color: 'brand.purple.900',
				},
				_hover: {
					bg: props.colorMode === 'dark' ? 'dark.focusGray' : 'white',
				},
			}),

			purpleOutlined: (props: StyleFunctionProps) => ({
				bg: 'linear-gradient(#D987FF 60%, #AB5AFA)',
				bgClip: 'text',
				color:
					props.colorMode === 'light'
						? 'brand.purple.900'
						: 'transparent',
				border: `1px solid ${theme.colors.brand.purple[900]}`,
			}),

			grayOutlined: (props: StyleFunctionProps) => ({
				bg: 'none',
				color:
					props.colorMode === 'light'
						? 'light.primaryGray'
						: 'dark.coolGray',
				border: `1px solid ${theme.colors.light.coolGray}`,
			}),
		},
	},

	Stepper: {
		baseStyle: (props: StyleFunctionProps) => ({
			indicator: {
				'&[data-status=complete]': {
					bg: 'none',
					w: '24px',
					h: '24px',
					border:
						props.colorMode === 'light'
							? `2px solid ${props.theme.colors.light.coolGray}`
							: 'none',
				},
				'&[data-status=active]': {
					bg: 'none',
					w: '24px',
					h: '24px',
					border:
						props.colorMode === 'light'
							? `2px solid ${props.theme.colors.light.coolGray}`
							: 'none',
				},
				'&[data-status=incomplete]': {
					bg: 'none',
					w: '24px',
					h: '24px',
					border:
						props.colorMode === 'light'
							? `2px solid ${theme.colors.light.coolGray}`
							: 'none',
				},

				title: {
					fontSize: '14px',
				},
				separator: {
					border: `1px solid ${theme.colors.dark.coolGray}`,
					ml: '-4px',
				},

				number: {
					color:
						props.colorMode === 'dark'
							? 'white'
							: 'brand.purple.900',
					fontWeight: 700,
				},
			},
		}),

		variants: {
			main: (props: StyleFunctionProps) => ({
				step: {
					fontSize: '14px',
					w: '492px',
				},
			}),

			minting: (props: StyleFunctionProps) => ({
				step: {
					fontSize: '14px',
					maxW: '235px',
					pb: '15px',
					pt: '5px',
				},
				title: {
					fontWeight: '600',
					lineHeight: '24px',
					h: '60px',
				},

				description: {
					lineHeight: '20px',
					color: props.colorMode === 'dark' && 'white',
					w: '213px',
				},
			}),

			progress: (props: StyleFunctionProps) => ({
				stepper: {
					justifyContent: 'space-between',
				},
				step: {
					gap: 0,
					w: undefined,
				},
				separator: {
					'&[data-status=complete]': {
						bg:
							props.colorMode === 'light'
								? 'brand.purple.900'
								: `linear-gradient(to right, #EDC6FF , #AB5AFA)`,
					},
					'&[data-status=incomplete]': {
						bg: 'dark.coolGray',
					},

					'&[data-status=active]': {
						bg: 'dark.coolGray',
					},

					_horizontal: {
						ml: 0,
					},
				},

				indicator: {
					'&[data-status=complete]': {
						bg:
							props.colorMode === 'light'
								? 'brand.purple.900'
								: `linear-gradient(to right, #EDC6FF , #AB5AFA)`,
						border: 'none',
					},
					'&[data-status=active]': {
						bg: `linear-gradient(to right, #B62CFF , #7D00FF)`,
						border: 'none',
						boxShadow: `0 0 11.5px ${theme.colors.brand.purple[990]}`,
					},

					'&[data-status=incomplete]': {
						padding: '3px',
						backgroundClip: 'content-box',
						bg: 'light.secondaryGray',
						border: `3px solid ${theme.colors.light.primaryGray}`,
					},
				},
				icon: {
					color:
						props.colorMode === 'light'
							? 'white'
							: 'dark.primaryGray',
				},
			}),
		},
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

	Input: {
		baseStyle: (props: StyleFunctionProps) => ({
			field: {
				fontSize: '18px',
				lineHeight: '24px',
				fontWeight: 400,
				height: '48px',
				_light: {
					bg: 'white',
					borderColor: 'light.primaryGray',
					color: 'light.primaryGray',
				},
				_dark: {
					bg: 'dark.focusGray',
					borderColor: 'light.primaryGray',
				},
				_focus: {
					_dark: {
						boxShadow: 'none',
						outline: 'none',
					},
					_light: {
						boxShadow: 'none',
						outline: 'none',
					},
				},
			},
		}),
	},

	Modal: {
		baseStyle: (props: StyleFunctionProps) => ({
			dialog: {
				bg: props.colorMode === 'light' ? 'white' : 'dark.focusGray',
			},
		}),
	},
};

export const theme = extendTheme({ config, styles, components, fonts, colors });
