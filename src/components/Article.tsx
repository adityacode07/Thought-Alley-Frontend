import { useNavigate } from 'react-router-dom';

function Article({ article, id }: any) {
  const navigate = useNavigate(); 

  const getRandomColor = () => {
    const colors = [
      'bg-blue-100',
      'bg-green-100',
      'bg-yellow-100',
      'bg-red-100',
      'bg-indigo-100',
      'bg-purple-100',
      'bg-pink-100',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleTitleClick = () => {
    navigate(`/blog/${id}`);
    
  };

  return (
    <article
      key={id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getRandomColor()}`}>
              <span className="text-sm font-medium text-gray-700">{article.author[0]}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{article.author}</span>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{article.category}</span>
        </div>
        <h2 className="text-xl font-bold leading-tight text-gray-900 hover:text-gray-700">
          <a href="#" className="hover:underline" onClick={handleTitleClick}>
            {article.title}
          </a>
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center text-xs text-gray-500 space-x-2">
          <span>{article.date} </span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
        </div>
      </div>
    </article>
  );
}

export default Article;
