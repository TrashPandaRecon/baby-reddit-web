import { Box, Button, Link, useColorMode } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';
import {isServer} from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
        const [{data, fetching}] = useMeQuery({
                pause: isServer()
        });
	const { colorMode } = useColorMode();
	let body = null;
	if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Button
						display="block"
						float="left"
						p={2}
						position="absolute"
						left="80%"
					>
						Login
					</Button>
				</NextLink>
				<NextLink href="/register">
					<Button
						display="block"
						float="left"
						p={2}
						position="absolute"
						left="85%"
					>
						Register
					</Button>
				</NextLink>
			</>
		);
	} else if (fetching) {
	} else {
		body = (
			<>
				<NextLink href="/">
					<Link
						display="block"
						float="left"
						p={2}
						position="absolute"
						left="80%"
					>
						{data.me.username}
					</Link>
				</NextLink>

				<Button
					display="block"
					float="left"
					p={2}
					position="absolute"
					left="85%"
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
			display="inline"
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			p={4}
			w="100%"
		>
			<NextLink href="/">
				<Button display="block" float="left" p={2}>
					Home
				</Button>
			</NextLink>
			{body}
			<DarkModeSwitch></DarkModeSwitch>
		</Box>
	);
};
