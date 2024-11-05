import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SpecificBlog from "./SpecificBlog";

const Blog = () => {
  const { id } = useParams(); 
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const token = localStorage.getItem("token"); 

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: token ? token : '', 
          },
        });

        setBlogPost(response.data); 

      } catch (error) {
        console.log('Failed to fetch blog post'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogPost();
  }, [id]); // Dependency array includes id

  if (loading) {
    if (loading) {
      return <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-20 w-20 bg-slate-900 animate-ping"></div>
    </div>
    }
  }


  if (!blogPost) {
    return <div>No blog post found.</div>;
  }

  return (
    <div>
      <SpecificBlog 
        title={blogPost.title}
        content={blogPost.content}
        category={blogPost.category}
        createdAt={blogPost.createdAt}
        username={blogPost.username}
      />
    </div>
  );
};

export default Blog;
