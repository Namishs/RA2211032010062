import React from 'react';
import { useFeed } from '../api';
import { Post } from '../types';
import { MessageSquare, Loader, Share2, Heart, RefreshCw } from 'lucide-react';

export default function Feed() {
  const { data: posts, error, isLoading } = useFeed();

  if (error) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-red-500 text-xl">Failed to load feed</div>
    </div>
  );
  
  if (isLoading) return (
    <div className="flex items-center justify-center h-96">
      <Loader className="w-12 h-12 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent flex items-center">
            <RefreshCw className="mr-3 w-10 h-10 text-green-500 animate-float" />
            Live Feed
          </h1>
          <p className="mt-2 text-gray-600">Real-time updates from across the platform</p>
        </div>
      </div>

      <div className="space-y-8">
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
                <div className="ml-4 flex-1">
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
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                  New
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-6 group">
                <img
                  src={`https://source.unsplash.com/random/800x400?post&${post.id}`}
                  alt="Post"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <p className="text-gray-800 mb-6">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-6">
                  <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Like</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    <span className="font-medium">{post.commentCount} Comments</span>
                  </button>
                </div>
                <button className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5 mr-2" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}