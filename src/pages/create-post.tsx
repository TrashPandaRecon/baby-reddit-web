import { Grid, Flex, Link, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

const CreatePost: React.FC<{}> = ({}) => {
	const [, CreatePost] = useCreatePostMutation();
	const router = useRouter();
	return (
		<>
			<NavBar></NavBar>
			<Wrapper variant="small">
				<Formik
					initialValues={{ title: '', text: '', sub: '', media: '' }}
					onSubmit={async (values,{setErrors}) => {
						const response = await CreatePost({ input: values });
						if (response.data?.createPost.errors) {
							setErrors(toErrorMap(response.data.createPost.errors));
						} else if (!response.data?.createPost.errors) {
							router.push('/');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Grid gap={2} gridAutoFlow="row dense">
								<InputField
									name="title"
									placeholder="title"
									label="Title"
								></InputField>
								<InputField
									name="sub"
									placeholder="sub"
									label="Sub"
								></InputField>
								<InputField
									name="media"
									placeholder="media"
									label="Link to image"
								></InputField>

								<InputField
									name="text"
									placeholder="text"
									label="Text"
									textarea
								></InputField>
							</Grid>
							<Button
								isLoading={isSubmitting}
								mt={4}
								type="submit"
								variantColor="teal"
							>
								Post
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(CreatePost);
