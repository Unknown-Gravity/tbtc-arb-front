import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const styles: ThemeOverride["styles"] = {
	global: (props) => ({
		body: {
			height: "100vh",
			width: "100%",
		},
	}),
};

const colors: ThemeOverride["colors"] = {
	brand: {
		purple: {
			100: "rgba(125, 0, 255, 0.1)",
			200: "rgba(125, 0, 255, 0.2)",
			300: "rgba(125, 0, 255, 0.3)",
			400: "rgba(125, 0, 255, 0.4)",
			500: "rgba(125, 0, 255, 0.5)",
			600: "rgba(125, 0, 255, 0.6)",
			700: "rgba(125, 0, 255, 0.7)",
			800: "rgba(125, 0, 255, 0.8)",
			900: "rgba(125, 0, 255, 1.0)",
		},
		yellow: {
			100: "rgba(250, 173, 20, 0.1)",
			200: "rgba(250, 173, 20, 0.2)",
			300: "rgba(250, 173, 20, 0.3)",
			400: "rgba(250, 173, 20, 0.4)",
			500: "rgba(250, 173, 20, 0.5)",
			600: "rgba(250, 173, 20, 0.6)",
			700: "rgba(250, 173, 20, 0.7)",
			800: "rgba(250, 173, 20, 0.8)",
			900: "rgba(250, 173, 20, 1.0)",
		},
	},
	light: {
		primaryGray: "#4A5568", // Titulos
		coolGray: "#B1BCCC", // Detalles
		gray: "#828282", // Navbar
	},
	dark: {
		primaryGray: "#1D2229", // Fondos de cajas
		focusGray: "#161A1F", // Fondo de inputs y focus de pestañas
		coolGray: "#B1BCCC", // Navbar links y detalles
	},
};

const fonts: ThemeOverride["fonts"] = {
	heading: "Inter",
	body: "Inter",
};

const components: ThemeOverride["components"] = {};

export const theme = extendTheme({ config, styles, components, fonts, colors });
