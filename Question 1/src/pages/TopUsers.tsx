import React from 'react';
import { useTopUsers } from '../api';
import { User } from '../types';
import { Trophy, Loader, Award, Users, MessageSquare } from 'lucide-react';

export default function TopUsers() {
  const { data: users, error, isLoading } = useTopUsers();

  if (error) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-red-500 text-xl">Failed to load users</div>
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
            <Trophy className="mr-3 w-10 h-10 text-yellow-500 animate-float" />
            Top Contributors
          </h1>
          <p className="mt-2 text-gray-600">Our platform's most active users</p>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>{users?.length || 0} Users</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            <span>Updated live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.slice(0, 5).map((user: User, index: number) => (
          <div
            key={user.id}
            className="gradient-border card-hover"
          >
            <div className="bg-white rounded-xl p-6 relative overflow-hidden">
              {index === 0 && (
                <div className="absolute top-4 right-4">
                  <Award className="w-8 h-8 text-yellow-500 animate-float" />
                </div>
              )}
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-100">
                    <img
                      src={`https://source.unsplash.com/random/200x200?portrait&${user.id}`}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
                  <div className="flex items-center mt-1">
                    <MessageSquare className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-gray-600">{user.postCount} posts</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Engagement Rate</div>
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-pink-600"
                      style={{ width: `${Math.min(100, (user.postCount / 100) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}