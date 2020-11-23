import {
	Grid,
	Button,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Link,
} from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BasicTemplate } from '../../components/BasicTemplate';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';
import {NavBar} from '../../components/NavBar';

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
	const [, changePassword] = useChangePasswordMutation();
	const router = useRouter();
	const [tokenError, setTokenError] = useState('');
    return (
        <>
		<NavBar></NavBar>
			<Wrapper variant="small">
				<Formik
					initialValues={{ password: '', reenterPassword: '' }}
					onSubmit={async (values, { setErrors }) => {
						const response = await changePassword({
							password: values.password,
							reenterPassword: values.reenterPassword,
							token,
						});
						if (response.data?.changePassword.errors) {
							const errorMap = toErrorMap(response.data.changePassword.errors);
							if ('token' in errorMap) {
								setTokenError(errorMap.token);
							}
							setErrors(errorMap);
						} else if (response.data?.changePassword.user) {
							router.push('/');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							{tokenError ? (
								<Alert status="error">
									<AlertIcon />
									<AlertTitle mr={2}>Token Error: </AlertTitle>
									<AlertDescription mr={2}>{tokenError}</AlertDescription>
									<NextLink href="/forgot-password">
										<Link color="teal.500">Try Again</Link>
									</NextLink>
								</Alert>
							) : null}
							<Grid gap={2} gridAutoFlow="row dense">
								<InputField
									name="password"
									placeholder="Password"
									label="Password"
									type="password"
								></InputField>

								<InputField
									name="reenterPassword"
									placeholder="password"
									label="Re-Enter Password"
									type="password"
								></InputField>
							</Grid>

							<Button
								isLoading={isSubmitting}
								mt={4}
								type="submit"
								variantColor="teal"
							>
								Reset
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</>
	);
};

ChangePassword.getInitialProps = ({ query }) => {
	return {
		token: query.token as string,
	};
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
