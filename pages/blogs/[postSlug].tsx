import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next';
import { useRouter } from 'next/router';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ content, title }) => {
	const router = useRouter();
	console.log(router);
	return (
		<div className='max-w-max mx-auto'>
			<h1 className='text-3xl text-gray-900 font-semibold mb-3 mt-3'>
				{title}
			</h1>
			<div className='prose pb-20'>
				<MDXRemote {...content} />
			</div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = () => {
	//reading paths
	const dirPathToRead = path.join(process.cwd(), 'posts');
	const dirs = fs.readdirSync(dirPathToRead);
	const paths = dirs.map((filename) => {
		const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
		const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf8' });
		return { params: { postSlug: matter(fileContent).data.slug } };
	});
	return {
		paths,
		fallback: false,
	};
};

interface IStaticProps extends ParsedUrlQuery {
	postSlug: string;
}

type Post = {
	title: string;
	content: MDXRemoteSerializeResult;
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
	const { postSlug } = context.params as IStaticProps;

	const filePathToRead = path.join(process.cwd(), 'posts/' + postSlug + '.md');
	const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf8' });

	// const { data, content } = matter(fileContent);
	const source: any = await serialize(fileContent, {
		parseFrontmatter: true,
	});

	// return data;
	return {
		props: { title: source.frontmatter.title, content: source },
	};
};

export default SinglePage;
