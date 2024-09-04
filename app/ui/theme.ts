import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
	transform: 'scale(0.85) translateY(-24px)',
};

export const theme = extendTheme({
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false,
	},
	styles: {
		global: {
			body: {
				backgroundColor: 'base',
				color: 'hText',
			},
			h1: {
				fontSize: '50px',
				fontWeight: '600',
			},
			h2: {
				fontSize: '40px',
				fontWeight: '500',
			},
			h3: {
				fontSize: '20px',
				fontWeight: '600',
			},
		},
	},
	colors: {
		base: '#FAFAFA',
		accent: '#ECEFF1',
		bodyText: '#616161',
		hText: '#212121',
		unfocus: '#9E9E9E',
		line: '#E0E0E0',
		error: '#D30000',
		tableRow: '#F5F5F5',
	},
	components: {
		Heading: {
			baseStyle: {
				fontWeight: '500',
				lineHeight: 1,
			},
			sizes: {
				/// h1 ///
				xl: {
					fontSize: '50px',
					fontWeight: '600',
				},
				/// h2 ///
				lg: {
					fontSize: '40px',
				},
				/// h3 ///
				md: {
					fontSize: '20px',
					fontWeight: '600',
				},
				/// h4 ///
				sm: {
					fontSize: '36px',
				},
			},
		},

		Button: {
			variants: {
				accent: {
					bg: 'accent',
					fontSize: '18px',
					fontStyle: 'normal',
					fontWeight: 400,
					lineHeight: '1.4',
					width: '100%',
					padding: '30px 0',
					color: 'hText',
					borderRadius: '2px',
					border: '1px solid #212121',
					paddingTop: '16px',
					paddingBottom: '16px',
					backgroundColor: 'transparent',
					_hover: {
						color: 'base',
						backgroundColor: 'hText',
						_disabled: {
							color: 'unfocus',
							background: 'accent',
						},
						_loading: {
							backgroundColor: 'transparent',
						},
					},
					_loading: { color: 'unfocus' },
				},
				accentAlt: {
					fontSize: '18px',
					fontStyle: 'normal',
					fontWeight: 400,
					lineHeight: '1.4',
					width: '100%',
					padding: '30px 0',
					color: 'base',
					borderRadius: '2px',
					border: '1px solid #212121',
					paddingTop: '16px',
					paddingBottom: '16px',
					backgroundColor: 'hText',
					_hover: {
						color: 'hText',
						backgroundColor: 'base',
						_disabled: {
							color: 'unfocus',
							background: 'base',
						},
						_loading: {
							backgroundColor: 'hText',
						},
					},
					_loading: { color: 'unfocus' },
				},
				arrow: {
					borderRadius: 0,
					p: '5px 0',
					h: 'auto',
					borderBottom: '1px solid #212121',
					color: 'hText',
					fontWeight: 400,
					justifyContent: 'space-between',
					_hover: { backgroundColor: 'transparent' },
					_disabled: { color: 'unfocus', borderBottomColor: 'unfocus' },
					_loading: {
						color: 'unfocus',
						borderBottomColor: 'unfocus',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
				},
			},
		},
		Form: {
			variants: {
				floating: {
					container: {
						_focusWithin: {
							label: {
								...activeLabelStyles,
							},
						},
						'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
							{
								...activeLabelStyles,
							},
						label: {
							top: 0,
							left: 0,
							zIndex: 2,
							position: 'absolute',
							backgroundColor: 'transparent',
							pointerEvents: 'none',
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: 'left top',
						},
					},
				},
			},
		},
	},
});
