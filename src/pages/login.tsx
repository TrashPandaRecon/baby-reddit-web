import { Box, Button, Flex, Grid, Link } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { BasicTemplate } from '../components/BasicTemplate';
import { InputField } from '../components/InputField';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';
interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
	const router = useRouter();
	const [{}, login] = useLoginMutation();
	return (
		<>
			<NavBar></NavBar>
			<Wrapper variant="small">
				<Formik
					initialValues={{ usernameOrEmail: '', password: '' }}
					onSubmit={async (values, { setErrors }) => {
						const response = await login(values);
						if (response.data?.login.errors) {
							setErrors(toErrorMap(response.data.login.errors));
						} else if (response.data?.login.user) {
							router.push('/');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Grid gap={2} gridAutoFlow="row dense">
								<InputField
									name="usernameOrEmail"
									placeholder="Username / Email"
									label="Username / Email"
								></InputField>

								<InputField
									name="password"
									placeholder="password"
									label="Password"
									type="password"
								></InputField>
							</Grid>
							<Flex>
								<NextLink href="/forgot-password">
									<Link color="teal.500" ml="auto">
										Forgot Password
									</Link>
								</NextLink>
							</Flex>
							<Button
								isLoading={isSubmitting}
								mt={4}
								type="submit"
								variantColor="teal"
							>
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(Login);
