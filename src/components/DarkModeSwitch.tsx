import { useColorMode, Switch } from '@chakra-ui/core';

export const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	return (
		<Switch p={2} color="green" isChecked={isDark} onChange={toggleColorMode} />
	);
};
