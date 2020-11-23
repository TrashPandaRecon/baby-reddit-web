import { Box, Button, useColorMode } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';
import { isServer } from '../utils/isServer';
import { NavBarButtons } from './NavBarButtons';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	});
	const { colorMode } = useColorMode();
	let body = null;
	if (!data?.me) {
		body = (
			<>
				<NavBarButtons>
					<NextLink href="/login">Login</NextLink>
				</NavBarButtons>

				<NavBarButtons>
					<NextLink href="/register">Register</NextLink>
				</NavBarButtons>
			</>
		);
	} else if (fetching) {
	} else {
		body = (
			<>
				<NavBarButtons>
					<NextLink href="/">{data.me.username}</NextLink>
				</NavBarButtons>

				<Button
					display="block"
					mt={{ base: 4, md: 0 }}
					ml={{ md: 3 }}
					onClick={() => {
						logout();
					}}
					isLoading={logoutFetching}
				>
					Log Out
				</Button>
			</>
		);
	}
	const bgColor = { light: 'gray.300', dark: 'gray.700' };

	const color = { light: 'black', dark: 'white' };
	return (
		<Box
			display={{ md: 'flex' }}
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			p={2}
			w="100%"
		>
			<NavBarButtons>
				<NextLink href="/">Home</NextLink>
			</NavBarButtons>

			<Box pos="absolute" right="0" display={{ md: 'flex' }}>
				{body}
				<DarkModeSwitch></DarkModeSwitch>
			</Box>
		</Box>
	);
};
