// src/components/NewsCard.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsCard = ({ news, featured = false }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${featured ? 'h-full' : 'h-full'} hover:shadow-lg transition duration-300`}>
        <div className="relative">
          <div className={`${featured ? 'h-64' : 'h-48'} relative`}>
            <Image 
              src={news.imageUrl || '/placeholder-news.jpg'} 
              alt={news.title}
              className="object-cover"
              fill
            />
          </div>
          {news.category && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 text-xs rounded">
              {news.category}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className={`font-bold text-gray-800 ${featured ? 'text-xl mb-2' : 'text-lg mb-1'} line-clamp-2`}>
            {news.title}
          </h3>
          {featured && (
            <p className="text-gray-600 mb-3 line-clamp-3">{news.excerpt}</p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{news.date}</span>
            <span className="text-sm text-gray-600">{news.source}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

// src/app/page.js (Home Page)
import React from 'react';
import NewsCard from '@/components/NewsCard';

// Sample data - In a real application, this would come from your API
const featuredNews = {
  id: '1',
  title: 'Major Policy Changes Announced Following Summit',
  excerpt: 'World leaders agreed on a new framework to address climate change during the international summit held in Geneva.',
  imageUrl: '/placeholder-featured.jpg',
  category: 'Politics',
  date: 'March 18, 2025',
  source: 'News Agency'
};

const latestNews = [
  {
    id: '2',
    title: 'New Breakthrough in Quantum Computing',
    imageUrl: '/placeholder-tech.jpg',
    category: 'Technology',
    date: 'March 17, 2025',
    source: 'Tech Today'
  },
  {
    id: '3',
    title: 'National Basketball Team Advances to Finals',
    imageUrl: '/placeholder-sports.jpg',
    category: 'Sports',
    date: 'March 17, 2025',
    source: 'Sports Network'
  },
  {
    id: '4',
    title: 'Stock Market Hits Record High',
    imageUrl: '/placeholder-business.jpg',
    category: 'Business',
    date: 'March 16, 2025',
    source: 'Finance Daily'
  },
  {
    id: '5',
    title: 'New Medical Research Shows Promise for Treatment',
    imageUrl: '/placeholder-health.jpg',
    category: 'Health',
    date: 'March 16, 2025',
    source: 'Health Journal'
  },
  {
    id: '6',
    title: 'Award-winning Film Director Announces New Project',
    imageUrl: '/placeholder-entertainment.jpg',
    category: 'Entertainment',
    date: 'March 15, 2025',
    source: 'Entertainment Weekly'
  },
  {
    id: '7',
    title: 'Local Community Launches Environmental Initiative',
    imageUrl: '/placeholder-local.jpg',
    category: 'Local',
    date: 'March 15, 2025',
    source: 'City News'
  }
];

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Featured News */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Featured Story</h2>
        <NewsCard news={featuredNews} featured={true} />
      </section>

      {/* Latest News */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </main>
  );
}
