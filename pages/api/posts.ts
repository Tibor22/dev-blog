import { NextApiHandler } from 'next';
import fs from 'fs';
import path from 'path';

const handler: NextApiHandler = (req, res) => {
	console.log(req.method);
	const { method } = req;

	switch (method) {
		case 'GET': {
			const data = readPostsInfo();
			return res.json({ postInfo: data });
		}

		default:
			return res.status(404).send('Not found');
	}
};

const readPostsInfo = () => {
	const dirPathToRead = path.join(process.cwd(), 'posts');
	const dirs = fs.readdirSync(dirPathToRead);
	dirs.map((filename) => {
		const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
		const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf8' });
		console.log(fileContent);
	});

	return '';
};

export default handler;
