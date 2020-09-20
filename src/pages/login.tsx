import {Box, Button} from '@chakra-ui/core';
import {Form, Formik} from 'formik';
import {withUrqlClient} from 'next-urql';
import {useRouter} from 'next/router';
import React from 'react';
import {BasicTemplate} from '../components/BasicTemplate';
import {InputField} from '../components/InputField';
import {Wrapper} from '../components/Wrapper';
import {useLoginMutation} from '../generated/graphql';
import {createUrqlClient} from '../utils/createUrqlClient';
import {toErrorMap} from '../utils/toErrorMap';
interface registerProps {}

export const Login: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [{}, login] = useLoginMutation();
	return (
		<BasicTemplate>
			<Wrapper variant="small">
				<Formik
					initialValues={{ username: '', password: '' }}
					onSubmit={async (values, { setErrors }) => {
						const response = await login({
							input: values,
						});
						if (response.data?.login.errors) {
							setErrors(toErrorMap(response.data.login.errors));
						} else if (response.data?.login.user) {
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
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</BasicTemplate>
	);
};
export default withUrqlClient(createUrqlClient)(Login);
