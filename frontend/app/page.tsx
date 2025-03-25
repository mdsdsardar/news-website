"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/news").then((res) => setNews(res.data));
  }, []);

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">Latest News</h1>
      {news.map((article, index) => (
        <div key={index} className="p-4 border-b">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

