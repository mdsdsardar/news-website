// src/app/page.js (Updated with API fetch)
import React from 'react';
import NewsCard from '@/components/NewsCard';

async function getFeaturedNews() {
  try {
    const res = await fetch('http://localhost:5000/api/news/featured', { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch featured news');
    return res.json();
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }
}

async function getLatestNews() {
  try {
    const res = await fetch('http://localhost:5000/api/news?limit=6', { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch latest news');
    const data = await res.json();
    return data.news;
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}

export default async function Home() {
  const [featuredNews, latestNews] = await Promise.all([
    getFeaturedNews(),
    getLatestNews()
  ]);
  
  // Use the first featured news article, or fallback to sample data
  const featuredArticle = featuredNews && featuredNews.length > 0 ? featuredNews[0] : {
    _id: '1',
    title: 'Major Policy Changes Announced Following Summit',
    excerpt: 'World leaders agreed on a new framework to address climate change during the international summit held in Geneva.',
    imageUrl: '/placeholder-featured.jpg',
    category: 'Politics',
    date: new Date().toLocaleDateString(),
    source: 'News Agency'
  };

  // Use the fetched latest news, or fallback to empty array
  const latestArticles = latestNews && latestNews.length > 0 ? latestNews : [];
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Featured News */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Featured Story</h2>
        <NewsCard 
          news={{
            id: featuredArticle._id,
            title: featuredArticle.title,
            excerpt: featuredArticle.excerpt,
            imageUrl: featuredArticle.imageUrl,
            category: featuredArticle.category,
            date: new Date(featuredArticle.date).toLocaleDateString(),
            source: featuredArticle.source
          }} 
          featured={true} 
        />
      </section>

      {/* Latest News */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((news) => (
            <NewsCard 
              key={news._id} 
              news={{
                id: news._id,
                title: news.title,
                imageUrl: news.imageUrl,
                category: news.category,
                date: new Date(news.date).toLocaleDateString(),
                source: news.source
              }} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// src/app/category/[category]/page.js (Updated with API fetch)
import React from 'react';
import NewsCard from '@/components/NewsCard';

async function getCategoryNews(category, state = 'National') {
  try {
    const res = await fetch(
      `http://localhost:5000/api/category/${category}?state=${state}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error(`Failed to fetch ${category} news`);
    const data = await res.json();
    return data.news;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
}

export default async function CategoryPage({ params, searchParams }) {
  const state = searchParams.state || 'National';
  const news = await getCategoryNews(params.category, state);
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">
        {categoryName} News {state !== 'National' ? `- ${state}` : ''}
      </h1>
      
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard 
              key={item._id} 
              news={{
                id: item._id,
                title: item.title,
                imageUrl: item.imageUrl,
                category: item.category,
                date: new Date(item.date).toLocaleDateString(),
                source: item.source
              }} 
            />
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

// src/app/news/[id]/page.js (Updated with API fetch)
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

async function getNewsById(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/news/${id}`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch news article');
    return res.json();
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

export default async function NewsDetailPage({ params }) {
  const news = await getNewsById(params.id);
  
  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category and Date */}
      <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-4">
        <Link href={`/category/${news.category.toLowerCase()}`} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">
          {news.category}
        </Link>
        <div className="flex items-center">
          <span>{new Date(news.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>By {news.author}</span>
        </div>
      </div>
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{news.title}</h1>
      
      {/* Featured Image */}
      <div className="aspect-video relative mb-8">
        <Image
          src={news.imageUrl}
          alt={news.title}
          className="rounded-lg object-cover"
          fill
        />
      </div>
      
      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: news.content }} />
      </article>
      
      {/* Source Attribution */}
      <div className="text-sm text-gray-500 mb-8">
        Source: {news.source}
      </div>
      
      {/* Related News */}
      {news.relatedNews && news.relatedNews.length > 0 && (
        <div className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">Related News</h3>
          <ul className="space-y-3">
            {news.relatedNews.map((item) => (
              <li key={item._id} className="border-b pb-3">
                <Link href={`/news/${item._id}`} className="hover:text-blue-600">
                  <span className="font-medium text-gray-800">{item.title}</span>
                  <span className="ml-2 text-sm text-gray-500">{item.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
