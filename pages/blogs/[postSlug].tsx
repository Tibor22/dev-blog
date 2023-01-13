import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
interface Props {}

const SinglePage: NextPage<Props> = ({ data }) => {
	const router = useRouter();
	console.log(router);
	console.log('DATA:', data);
	return (
		<div className='bg-green-100 p-2 rounded'>
			<h1 className='text-3xl text-gray-900 font-semibold'>{data[0].title}</h1>
			<p className='text-gray-500'>{data[0].meta}</p>
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

export const getStaticProps: GetStaticProps = (context) => {
	const dirPathToRead = path.join(process.cwd(), 'posts');
	const dirs = fs.readdirSync(dirPathToRead);
	console.log('CONTEXT:', context);
	const data = dirs
		.map((filename) => {
			const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
			const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf8' });
			console.log(matter(fileContent).data.slug === context?.params.postSlug);

			return matter(fileContent).data;
		})
		.filter((data) => data.slug === context?.params.postSlug);
	console.log(data);
	// return data;
	return {
		props: { data },
	};
};

export default SinglePage;
