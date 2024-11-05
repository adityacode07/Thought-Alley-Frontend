import { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';
import Nav from './Nav';
import Footer from '../components/Footer';
interface BlogArticle {
  id: string
  title: string;
  username: string | null; 
  createdAt: string;
  content: string;
  category: string | null; 
}


const Blogs = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem("token"); 

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: token,
          },
        });

        const blogs = response.data.blogs;

        // Check if blogs is an array
        if (Array.isArray(blogs)) {
          setArticles(blogs);
        } else {
          throw new Error('Expected an array of blogs from the API');
        }
      } catch (err) {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
    <div className="rounded-full h-20 w-20 bg-slate-900 animate-ping"></div>
  </div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => {
                  const content: string = article.content || ''; // Ensure content is a string
                  const wordCount: number = content.split(' ').length; // Count words
                  const readTime: string = Math.ceil(wordCount / 200) > 0 
                    ? `${Math.ceil(wordCount / 200)} min read` 
                    : 'Less than 1 min read'; // Formatting read time

                  // Format date to "8 May 2024"
                  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });

                  return (
                    <Article
                      key={index}
                      article={{
                        title: article.title,
                        author: article.username, 
                        readTime,
                        date: formattedDate, 
                        excerpt: content.substring(0, 100) + '...', 
                        category: article.category || 'Uncategorized', 
                      }}
                      id={article.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
