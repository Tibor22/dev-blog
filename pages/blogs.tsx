import { NextPage } from 'next';
import BlogCard from '../component/BlogCard';

interface Props {}

const Blogs: NextPage<Props> = () => {
	return (
		<div className='max-w-3xl p-10 mx-auto p-5 space-y-5'>
			<BlogCard
				title='First blog'
				description='		Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolor voluptatum unde necessitatibus. Nulla quasi itaque, cumque ipsum nesciunt sequi eos? Cumque iste, aut unde pariatur fugiat nobis dolorum.'
			/>
			<BlogCard
				title='First blog'
				description='		Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolor voluptatum unde necessitatibus. Nulla quasi itaque, cumque ipsum nesciunt sequi eos? Cumque iste, aut unde pariatur fugiat nobis dolorum.'
			/>
			<BlogCard
				title='First blog'
				description='		Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolor voluptatum unde necessitatibus. Nulla quasi itaque, cumque ipsum nesciunt sequi eos? Cumque iste, aut unde pariatur fugiat nobis dolorum.'
			/>
		</div>
	);
};

export default Blogs;
