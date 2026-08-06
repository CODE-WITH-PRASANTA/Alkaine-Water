import React from 'react';
import './HomeRecentBlogPost.css';

// --- PLACE YOUR PROJECT IMAGE ASSETS HERE ---
import blogImg1 from '../../assets/shop-5.jpg'; 
import blogImg2 from '../../assets/shop-7.jpg'; 
import blogImg3 from '../../assets/shop-8.jpg'; 

const HomeRecentBlogPost = () => {
  const posts = [
    {
      id: 1,
      tag: 'LATEST NEWS',
      image: blogImg1,
      title: 'Packaged Water: What Things to Consider?',
      date: 'August 12, 2021',
      author: 'By admin',
      desc: 'Learn how to select certified, multi-stage filtered packaged drinking water that maintains optimal pH balance and essential minerals for daily health.'
    },
    {
      id: 2,
      tag: 'LATEST NEWS',
      image: blogImg2,
      title: 'Top Benefits of Using the Alka Drops Delivery Appp',
      date: 'August 12, 2021',
      author: 'By admin',
      desc: 'Effortlessly schedule refill orders, track doorstep deliveries in real-time, and manage water subscriptions across Bhubaneswar in just a few tap.'
    },
    {
      id: 3,
      tag: 'LATEST NEWS',
      image: blogImg3,
      title: 'Five Tips to Keep Your Body Hydrated',
      date: 'August 12, 2021',
      author: 'By admin',
      desc: 'Nam quam nibh, lobortis sit amet turpis non, sollicitudin viverra leo. Cras nec rhoncus nulla. ...'
    }
  ];

  return (
    <div className="HomeRecentBlogPost-container">
      {/* Top Header Layout Block */}
      <div className="HomeRecentBlogPost-headerRow">
        <div className="HomeRecentBlogPost-headerLeft">
          <span className="HomeRecentBlogPost-tagline">RECENT BLOG POST</span>
          <h2 className="HomeRecentBlogPost-heading">Our industry updates</h2>
          <svg className="HomeRecentBlogPost-miniWave" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C5 1 5 7 10 4C15 1 15 7 20 4C25 1 25 7 30 4C35 1 35 7 40 4" stroke="#5ac8fa" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="HomeRecentBlogPost-headerRight">
          <button className="HomeRecentBlogPost-topBtn">
            READ MORE
          </button>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="HomeRecentBlogPost-grid">
        {posts.map((post) => (
          <div key={post.id} className="HomeRecentBlogPost-card">
            
            {/* Card Top Image Viewport Frame */}
            <div className="HomeRecentBlogPost-imageFrame">
              <span className="HomeRecentBlogPost-cardRibbon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                {post.tag}
              </span>
              <img 
                src={post.image} 
                alt={post.title} 
                className="HomeRecentBlogPost-img"
                onError={(e) => {
                  e.target.src = `https://placehold.co/360x280/eef3fc/2b39b3?text=Natural+Water`;
                }}
              />
            </div>

            {/* Typography Content Blocks */}
            <div className="HomeRecentBlogPost-contentBody">
              <h3 className="HomeRecentBlogPost-title">{post.title}</h3>
              
              <div className="HomeRecentBlogPost-metaGroup">
                <span className="HomeRecentBlogPost-metaItem">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {post.date}
                </span>
                <span className="HomeRecentBlogPost-metaDivider">|</span>
                <span className="HomeRecentBlogPost-metaItem">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {post.author}
                </span>
              </div>

              <p className="HomeRecentBlogPost-desc">{post.desc}</p>
              
              <div className="HomeRecentBlogPost-footerLink">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
                READ MORE
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRecentBlogPost;