import { Post } from '@/entities/Post';

export default async function socialJson() {
    try {
        const posts = await Post.filter({ status: 'published', category: 'article' }, '-publish_date', 50);
        return {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(posts, null, 2),
        };
    } catch (error) {
        return {
            headers: { 'Content-Type': 'application/json' },
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch posts" }),
        };
    }
}