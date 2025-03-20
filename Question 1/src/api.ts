import useSWR from 'swr';

const MOCK_USERS = [
  { id: '1', username: 'Sarah_Tech', postCount: 156 },
  { id: '2', username: 'DataMaster', postCount: 143 },
  { id: '3', username: 'SocialGuru', postCount: 128 },
  { id: '4', username: 'ContentCreator', postCount: 112 },
  { id: '5', username: 'TrendSetter', postCount: 98 },
];

const MOCK_POSTS = [
  {
    id: '1',
    userId: '1',
    content: 'Just launched our new AI-powered analytics dashboard! 🚀 #TechInnovation',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    commentCount: 45,
  },
  {
    id: '2',
    userId: '2',
    content: 'The future of data visualization is here. Check out our latest case study on real-time analytics.',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    commentCount: 32,
  },
  {
    id: '3',
    userId: '3',
    content: '5 Tips for Maximizing Your Social Media Impact in 2025 📱 #SocialMediaStrategy',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    commentCount: 28,
  },
  {
    id: '4',
    userId: '4',
    content: 'Breaking: New study reveals the best times to post on social media platforms! 📊',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    commentCount: 56,
  },
  {
    id: '5',
    userId: '5',
    content: 'Excited to share our latest insights on emerging social media trends! 🎯',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    commentCount: 41,
  },
];

// Mock API fetcher that simulates network delay
const mockFetcher = (data: any) => new Promise((resolve) => {
  setTimeout(() => resolve(data), 500);
});

export function useTopUsers() {
  return useSWR('/api/users/top', () => mockFetcher(MOCK_USERS), {
    refreshInterval: 30000, // Refresh every 30 seconds
  });
}

export function useTrendingPosts() {
  return useSWR('/api/posts/trending', () => mockFetcher(MOCK_POSTS), {
    refreshInterval: 30000,
  });
}

export function useFeed() {
  // For feed, we'll randomize the order and add some variation
  return useSWR('/api/posts/feed', () => 
    mockFetcher(
      [...MOCK_POSTS]
        .sort(() => Math.random() - 0.5)
        .map(post => ({
          ...post,
          createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60).toISOString(),
        }))
    ), {
    refreshInterval: 5000, // More frequent updates for feed
  });
}