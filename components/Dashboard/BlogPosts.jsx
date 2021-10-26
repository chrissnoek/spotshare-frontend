import axios from "axios";
import { useEffect, useState } from "react";

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const url = 'https://www.spotshare.nl/blog/api/';

    useEffect(() => {
        axios.get(url).then((response) => {
            const data = [];
            for (let index = 0; index < 5; index++) {
                data.push(response.data[index]);
            }
            setPosts(data);
        });
    }, []);

    return (
        <div className="hidden md:block ">
        <h2 className="my-3">Laatste blogs</h2>
        {posts.map((post) => {
            return (
                <div>
                    <div className="flex justify-center items-center mb-4 cursor-pointer">
                        <a className="mr-4 rounded flex-none cursor-pointer" href={`https://spotshare.nl${post.hero_image}`}>
                            <img className="rounded h-20 w-20 object-cover cursor-pointer" alt={post.title} src={`https://spotshare.nl${post.hero_image}`} />
                        </a>
                        <a className="text-sm font-bold w-full cursor-pointer break-word" href={`https://spotshare.nl${post.hero_image}`}>
                            {post.title}
                        </a>
                    </div>
                </div>
            );
        })}
        </div>
    )

}

export default BlogPosts;