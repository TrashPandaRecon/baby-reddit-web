import { Grid, Button,AlertIcon, Alert } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
interface ForgotPasswordProps {}
export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
	const [, forgotPassword] = useForgotPasswordMutation();
	const [complete, setComplete] = useState(false);
	return (
		<>
			<NavBar></NavBar>
			<Wrapper variant="small">
				<Formik
					initialValues={{ email: '' }}
					onSubmit={async (values) => {
						await forgotPassword(values);
						setComplete(true);
					}}
				>
					{({ isSubmitting }) =>
						complete ? (
							<Alert status="success">
								<AlertIcon />
								If the email exists, reset email has been sent.
							</Alert>
						) : (
							<Form>
								<Grid gap={2} gridAutoFlow="row dense">
									<InputField
										name="email"
										placeholder="Email"
										label="Email"
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
						)
					}
				</Formik>
			</Wrapper>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);
