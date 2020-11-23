import { Box, Image, Spinner, useColorMode, Text, Link, List } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { BasicTemplate } from '../components/BasicTemplate';
import {NavBar} from '../components/NavBar';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
interface indexProps {}
const Index: React.FC<indexProps> = ({}) => {
	const [{ data }] = usePostsQuery();
	const { colorMode } = useColorMode();

	const bgColor = { light: 'gray.300', dark: 'gray.500' };

	const color = { light: 'black', dark: 'white' };
	return (
		<>
			<NavBar></NavBar>
				{!data ? (
					<Spinner></Spinner>
				) : (
					data.posts.map((p) => (
						<List key={p.id}>
							<Box p={4} display={{ md: 'flex' }}>
								<Box flexShrink={0}>
									<Image
										rounded="lg"
										width={{ md: 40 }}
										src={p.media}
									/>
								</Box>
								<Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
									<Text
										fontWeight="bold"
										textTransform="uppercase"
										fontSize="sm"
										letterSpacing="wide"
										color="teal.600"
									>
										{p.sub}
									</Text>
									<Link
										mt={1}
										display="block"
										fontSize="lg"
										lineHeight="normal"
										fontWeight="semibold"
										href="#"
									>
										{p.title}
									</Link>
									<Text mt={2} color="gray.500">
										{p.text}
									</Text>
								</Box>
							</Box>
						</List>
					))
				)}
		</>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
