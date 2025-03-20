import React from 'react';
import { useTrendingPosts } from '../api';
import { Post } from '../types';
import { TrendingUp, MessageSquare, Loader, Share2, Heart } from 'lucide-react';

export default function TrendingPosts() {
  const { data: posts, error, isLoading } = useTrendingPosts();

  if (error) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-red-500 text-xl">Failed to load trending posts</div>
    </div>
  );
  
  if (isLoading) return (
    <div className="flex items-center justify-center h-96">
      <Loader className="w-12 h-12 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent flex items-center">
            <TrendingUp className="mr-3 w-10 h-10 text-red-500 animate-float" />
            Trending Now
          </h1>
          <p className="mt-2 text-gray-600">Posts making waves across the platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts?.map((post: Post) => (
          <div key={post.id} className="gradient-border card-hover">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100">
                  <img
                    src={`https://source.unsplash.com/random/100x100?portrait&${post.userId}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">User {post.userId}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src={`https://source.unsplash.com/random/800x400?post&${post.id}`}
                  alt="Post"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full px-4 py-1 text-white text-sm flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {post.commentCount}
                </div>
              </div>

              <p className="text-gray-800 mb-6 line-clamp-3">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5 mr-1" />
                    Like
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-5 h-5 mr-1" />
                    Comment
                  </button>
                </div>
                <button className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5 mr-1" />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}