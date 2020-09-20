import { Spinner } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { BasicTemplate } from '../components/BasicTemplate';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
const Index = () => {
	const [{ data }] = usePostsQuery();
	return (
		<>
			<BasicTemplate>
				<div>Hello World</div>
				{!data ? (
					<Spinner></Spinner>
				) : (
					data.posts.map((p) => <div key={p.id}>{p.title}</div>)
				)}
			</BasicTemplate>
		</>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
