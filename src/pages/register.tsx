import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { BasicTemplate } from '../components/BasicTemplate';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [{}, register] = useRegisterMutation();
	return (
		<BasicTemplate>
			<Wrapper variant="small">
				<Formik
					initialValues={{ username: '', password: '' }}
					onSubmit={async (values, { setErrors }) => {
						const response = await register({
							username: values.username,
							password: values.password,
						});
						if (response.data?.register.errors) {
							setErrors(toErrorMap(response.data.register.errors));
						} else if (response.data?.register.user) {
							router.push('/');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="username"
								placeholder="username"
								label="Username"
							></InputField>
							<Box mt={4}>
								<InputField
									name="password"
									placeholder="password"
									label="Password"
									type="password"
								></InputField>
							</Box>
							<Button
								isLoading={isSubmitting}
								mt={4}
								type="submit"
								variantColor="teal"
							>
								Register
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</BasicTemplate>
	);
};
export default withUrqlClient(createUrqlClient)(Register);
