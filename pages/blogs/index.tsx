import { InferGetStaticPropsType, NextPage } from 'next';
import BlogCard from '../../components/BlogCard';
import { readPostsInfo } from '../../lib/helper';
import { PostApiResponse } from '../../utils/types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
	const postInfo: PostApiResponse = readPostsInfo();
	return {
		props: {
			posts: postInfo,
		},
	};
}

const Blogs: NextPage<Props> = ({ posts }: Props) => {
	return (
		<div className='max-w-3xl mx-auto p-5 space-y-3'>
			{posts.map((post, i) => {
				return (
					<BlogCard
						key={i}
						slug={post.slug}
						title={post.title}
						description={post.meta}
					/>
				);
			})}
		</div>
	);
};

export default Blogs;
