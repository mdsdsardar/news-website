// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NewsPortal - Your Source for Latest News',
  description: 'Stay informed with the latest news across politics, sports, technology, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">NewsPortal</h3>
            <p className="text-gray-300">Your trusted source for the latest and most relevant news across the globe.</p>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health'].map((category) => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase()}`} className="text-gray-300 hover:text-white">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">Get the latest news delivered to your inbox</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md text-gray-800"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
                Go
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© 2025 NewsPortal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white">
              <span className="sr-only">Facebook</span>
              Facebook
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <span className="sr-only">Twitter</span>
              Twitter
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <span className="sr-only">Instagram</span>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// src/app/news/[id]/page.js (News Detail Page)
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// In a real application, you would fetch this data from your API
// using the id parameter from the URL
const getNewsById = (id) => {
  // This is mock data
  return {
    id,
    title: 'Major Policy Changes Announced Following Summit',
    content: `
      <p>World leaders agreed on a new framework to address climate change during the international summit held in Geneva. The agreement, which comes after months of negotiations, marks a significant shift in global climate policy.</p>
      
      <p>The new framework includes commitments to reduce carbon emissions by 50% by 2030, with major economies pledging financial support to developing nations to help them transition to renewable energy sources.</p>
      
      <p>"This is a historic moment," said the Secretary-General. "For the first time, we have a truly global commitment to address what is undoubtedly the greatest challenge of our time."</p>
      
      <p>The agreement also establishes a new international body to monitor progress and ensure accountability, with regular reporting requirements for all signatory nations.</p>
      
      <p>Critics, however, argue that the measures don't go far enough and that the timeline for implementation is too slow given the urgency of the climate crisis.</p>
      
      <p>Market analysts expect the new policies to accelerate investment in renewable energy and sustainable technologies, with several major corporations already announcing plans to align their operations with the new framework.</p>
    `,
    imageUrl: '/placeholder-featured.jpg',
    category: 'Politics',
    date: 'March 18, 2025',
    author: 'Jane Doe',
    source: 'News Agency',
    relatedNews: [
      {
        id: '8',
        title: 'Environmental Activists Respond to New Climate Framework',
        category: 'Politics'
      },
      {
        id: '9',
        title: 'Economic Implications of Climate Agreement',
        category: 'Business'
      },
      {
        id: '10',
        title: 'Historical Context: Previous Climate Summits and Their Impact',
        category: 'Environment'
      }
    ]
  };
};

export default function NewsDetailPage({ params }) {
  const news = getNewsById(params.id);
  
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category and Date */}
      <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-4">
        <Link href={`/category/${news.category.toLowerCase()}`} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">
          {news.category}
        </Link>
        <div className="flex items-center">
          <span>{news.date}</span>
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
      <div className="border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">Related News</h3>
        <ul className="space-y-3">
          {news.relatedNews.map((item) => (
            <li key={item.id} className="border-b pb-3">
              <Link href={`/news/${item.id}`} className="hover:text-blue-600">
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className="ml-2 text-sm text-gray-500">{item.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
