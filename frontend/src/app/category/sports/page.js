import React from 'react';
import NewsCard from '@/components/NewsCard';

// In a real application, this would be fetched from your API
const getCategoryNews = (category) => {
  // This is mock data
  const categoryNews = {
    politics: [
      {
        id: '1',
        title: 'Major Policy Changes Announced Following Summit',
        excerpt: 'World leaders agreed on a new framework to address climate change during the international summit held in Geneva.',
        imageUrl: '/placeholder-featured.jpg',
        category: 'Politics',
        date: 'March 18, 2025',
        source: 'News Agency'
      },
      {
        id: '8',
        title: 'Environmental Activists Respond to New Climate Framework',
        imageUrl: '/placeholder-politics.jpg',
        category: 'Politics',
        date: 'March 18, 2025',
        source: 'News Agency'
      },
      {
        id: '11',
        title: 'Government Announces Budget for Next Fiscal Year',
        imageUrl: '/placeholder-politics2.jpg',
        category: 'Politics',
        date: 'March 17, 2025',
        source: 'Political Daily'
      },
      {
        id: '12',
        title: 'Opposition Party Criticizes New Tax Proposal',
        imageUrl: '/placeholder-politics3.jpg',
        category: 'Politics',
        date: 'March 16, 2025',
        source: 'News Network'
      }
    ],
    sports: [
      {
        id: '3',
        title: 'National Basketball Team Advances to Finals',
        imageUrl: '/placeholder-sports.jpg',
        category: 'Sports',
        date: 'March 17, 2025',
        source: 'Sports Network'
      },
      {
        id: '13',
        title: 'Local Soccer Club Signs International Star Player',
        imageUrl: '/placeholder-sports2.jpg',
        category: 'Sports',
        date: 'March 16, 2025',
        source: 'Sports Daily'
      },
      {
        id: '14',
        title: 'Marathon Record Broken at Annual City Run',
        imageUrl: '/placeholder-sports3.jpg',
        category: 'Sports',
        date: 'March 15, 2025',
        source: 'Athletics Review'
      },
      {
        id: '15',
        title: 'Tennis Tournament Postponed Due to Weather',
        imageUrl: '/placeholder-sports4.jpg',
        category: 'Sports',
        date: 'March 14, 2025',
        source: 'Sports Update'
      }
    ],
    technology: [
      {
        id: '2',
        title: 'New Breakthrough in Quantum Computing',
        imageUrl: '/placeholder-tech.jpg',
        category: 'Technology',
        date: 'March 17, 2025',
        source: 'Tech Today'
      },
      {
        id: '16',
        title: 'Tech Giant Unveils Next Generation Smartphone',
        imageUrl: '/placeholder-tech2.jpg',
        category: 'Technology',
        date: 'March 16, 2025',
        source: 'Tech Review'
      },
      {
        id: '17',
        title: 'AI Research Shows Promise in Medical Diagnostics',
        imageUrl: '/placeholder-tech3.jpg',
        category: 'Technology',
        date: 'March 15, 2025',
        source: 'Innovation Weekly'
      }
    ],
    business: [
      {
        id: '4',
        title: 'Stock Market Hits Record High',
        imageUrl: '/placeholder-business.jpg',
        category: 'Business',
        date: 'March 16, 2025',
        source: 'Finance Daily'
      },
      {
        id: '9',
        title: 'Economic Implications of Climate Agreement',
        imageUrl: '/placeholder-business2.jpg',
        category: 'Business',
        date: 'March 18, 2025',
        source: 'Business News'
      },
      {
        id: '18',
        title: 'Startup Secures Major Investment for Expansion',
        imageUrl: '/placeholder-business3.jpg',
        category: 'Business',
        date: 'March 15, 2025',
        source: 'Entrepreneur Weekly'
      }
    ],
    health: [
      {
        id: '5',
        title: 'New Medical Research Shows Promise for Treatment',
        imageUrl: '/placeholder-health.jpg',
        category: 'Health',
        date: 'March 16, 2025',
        source: 'Health Journal'
      },
      {
        id: '19',
        title: 'Experts Recommend New Guidelines for Healthy Living',
        imageUrl: '/placeholder-health2.jpg',
        category: 'Health',
        date: 'March 15, 2025',
        source: 'Medical Today'
      },
      {
        id: '20',
        title: 'Study Reveals Benefits of Mediterranean Diet',
        imageUrl: '/placeholder-health3.jpg',
        category: 'Health',
        date: 'March 14, 2025',
        source: 'Wellness Magazine'
      }
    ],
    entertainment: [
      {
        id: '6',
        title: 'Award-winning Film Director Announces New Project',
        imageUrl: '/placeholder-entertainment.jpg',
        category: 'Entertainment',
        date: 'March 15, 2025',
        source: 'Entertainment Weekly'
      },
      {
        id: '21',
        title: 'Celebrity Couple Welcomes First Child',
        imageUrl: '/placeholder-entertainment2.jpg',
        category: 'Entertainment',
        date: 'March 14, 2025',
        source: 'Celebrity News'
      },
      {
        id: '22',
        title: 'Music Festival Announces Lineup for Summer Event',
        imageUrl: '/placeholder-entertainment3.jpg',
        category: 'Entertainment',
        date: 'March 13, 2025',
        source: 'Music Magazine'
      }
    ]
  };
  
  return categoryNews[category.toLowerCase()] || [];
};
export default function CategoryPage({ params }) {
  const news = getCategoryNews(params.category);
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">{categoryName} News</h1>
      
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No articles found in this category.</p>
        </div>
      )}
    </main>
  );
}
export default
