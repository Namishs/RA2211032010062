import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, TrendingUp, Activity, Layout } from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { to: '/', icon: <BarChart2 className="w-5 h-5" />, label: 'Top Users' },
    { to: '/trending', icon: <TrendingUp className="w-5 h-5" />, label: 'Trending Posts' },
    { to: '/feed', icon: <Activity className="w-5 h-5" />, label: 'Feed' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Layout className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              SocialyticsPro
            </span>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}