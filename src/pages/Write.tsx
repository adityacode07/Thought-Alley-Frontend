import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WritePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate=useNavigate()
  const handlePublish = async () => {
    setIsPublishing(true);
    const token = localStorage.getItem("token"); 
    try {
    
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
          category,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      console.log('Blog published successfully:', response.data);
      setTitle('');
      setContent('');
      setCategory('');
      navigate('/blogs')
      
    } catch (error) {
      console.error('Error publishing blog:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button className="text-gray-800 hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">New Story</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePublish}
                disabled={isPublishing || !title || !content}
                className="px-4 py-2 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 space-y-6">
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-500 text-3xl font-bold text-gray-900 placeholder-gray-400"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex items-center space-x-4">
                <div className="relative flex-grow">
                  <select
                    id="category"
                    name="category"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Health">Health</option>
                    <option value="Science">Science</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  rows={15}
                  className="block w-full border-0 focus:ring-0 sm:text-lg resize-none"
                  placeholder="Tell your story..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                  {content.split(/\s+/).filter(Boolean).length} words
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WritePage;
