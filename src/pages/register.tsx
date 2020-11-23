import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Grid } from '@chakra-ui/core';
import { BasicTemplate } from '../components/BasicTemplate';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import {NavBar} from '../components/NavBar';
interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [{}, register] = useRegisterMutation();
	return (
        <>
            <NavBar></NavBar>
			<Wrapper variant="small">
				<Formik
					initialValues={{
						email: '',
						username: '',
						password: '',
						reenterPassword: '',
					}}
					onSubmit={async (values, { setErrors }) => {
                        const response = await register({input: values});
						if (response.data?.register.errors) {
							setErrors(toErrorMap(response.data.register.errors));
						} else if (response.data?.register.user) {
							router.push('/');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Grid gridAutoFlow="row dense" gap={2}>
								<InputField
									name="email"
									placeholder="Francis@legitmail.com"
									label="Email"
								></InputField>
								<InputField
									name="username"
									placeholder="username"
									label="Username"
								></InputField>

								<InputField
									name="password"
									placeholder="password"
									label="Password"
									type="password"
								></InputField>
								<InputField
									name="reenterPassword"
									placeholder="Re-enter password"
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
								Register
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(Register);
