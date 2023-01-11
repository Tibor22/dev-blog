import { InferGetStaticPropsType, NextPage } from 'next';
import BlogCard from '../components/BlogCard';

interface PostApiResponse {
	postInfo: { title: string; meta: string; slug: string }[];
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/posts');
	const { postInfo }: PostApiResponse = await res.json();
	return {
		props: {
			posts: postInfo,
		},
	};
}

const Blogs: NextPage<Props> = ({ posts }: Props) => {
	return (
		<div className='max-w-3xl p-10 mx-auto p-5 space-y-5'>
			{posts.map((post) => {
				return <BlogCard title={post.title} description={post.meta} />;
			})}
		</div>
	);
};

export default Blogs;
