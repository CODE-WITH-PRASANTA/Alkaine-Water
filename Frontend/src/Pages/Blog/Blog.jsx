import React, { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiMessageSquare,
  FiRotateCcw,
} from "react-icons/fi";
import API, { IMG_URL, getImageUrl } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./Blog.css";

const BlogBannerBg = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop&q=80";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/all");
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleFilterReset = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTag("");
    setCurrentPage(1);
  };

  const tagCloudList = ["#company", "#delivery", "#experts", "#services", "#strategy", "#technologies", "#water"];

  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      const search = searchQuery.toLowerCase();
      const desc = post.description || "";
      const title = post.title || "";
      const category = post.category || "";

      const matchSearch =
        title.toLowerCase().includes(search) ||
        desc.toLowerCase().includes(search);

      const matchCategory = selectedCategory ? category === selectedCategory : true;

      const matchTag = selectedTag 
        ? title.toLowerCase().includes(selectedTag.replace("#", "").toLowerCase()) || 
          desc.toLowerCase().includes(selectedTag.replace("#", "").toLowerCase())
        : true;

      return matchSearch && matchCategory && matchTag;
    });
  }, [blogs, searchQuery, selectedCategory, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const categoryCounts = useMemo(() => {
    return blogs.reduce((acc, currentItem) => {
      if (currentItem.category) {
        acc[currentItem.category] = (acc[currentItem.category] || 0) + 1;
      }
      return acc;
    }, {});
  }, [blogs]);

  return (
    <div className="Blog">
      
      {/* COMPONENT 1: HERO BANNER */}
      <section className="BlogHeaderBanner">
        <div className="BlogHeaderBannerBg" style={{ backgroundImage: `linear-gradient(rgba(20, 30, 45, 0.6), rgba(20, 30, 45, 0.6)), url(${BlogBannerBg})` }}>
          <div className="BlogHeaderBreadcrumbStack">
            <h1 className="BlogHeaderPageTitle">Insightful Articles</h1>
            <div className="BlogBreadcrumbLinksRow">
              <span className="BlogBreadcrumbLink">Home</span>
              <span className="BlogBreadcrumbDivider">//</span>
              <span className="BlogBreadcrumbActive">Blog</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT 2: CORE SIDEBAR & MAIN POSTS GRID SECTION */}
      <section className="BlogMainLayoutSection">
        <div className="BlogMainLayoutContainer">
          
          {/* LEFT CONTENT AREA */}
          <main className="BlogPostsContentGrid">
            {paginatedPosts.length === 0 ? (
              <div className="BlogNoResultsFoundCard">
                <div className="NoResultsIconContainer">
                  <FiRotateCcw className="SpinningIcon" />
                </div>
                <h3>No articles match your selection.</h3>
                <p>Try tweaking your filter options or lowering search strictness thresholds.</p>
                <button onClick={handleFilterReset} className="BlogResetFilterBtn">Reset All Filters</button>
              </div>
            ) : (
              <div className="BlogResponsiveCardsStack">
                {paginatedPosts.map((post) => (
                  <article key={post._id || post.id} className="BlogPostCardItem">
                    <div className="BlogPostCardImageFrame">
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="BlogPostCoreAssetImage"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
                        }}
                      />
                      {post.category && <div className="BlogPostCategoryFloatingTag">{post.category}</div>}
                    </div>
                    
                    <div className="BlogPostCardDetailsContent">
                      <div className="BlogPostMetaDetailsStrip">
                        <span className="BlogPostMetaElement">
                          <FiCalendar className="BlogPostMetaIcon" /> 
                          {post.date ? new Date(post.date).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'}) : "Recent"}
                        </span>
                        <span className="BlogPostMetaElement">
                          <FiUser className="BlogPostMetaIcon" /> By {post.name || "Admin"}
                        </span>
                        <span className="BlogPostMetaElement">
                          <FiMessageSquare className="BlogPostMetaIcon" /> 0 Comments
                        </span>
                      </div>
                      
                      <h2 className="BlogPostCardHeadlineTitle">{post.title}</h2>
                      
                      <div
                        className="BlogPostCardSnippetText"
                        dangerouslySetInnerHTML={{
                          __html:
                            post.description && post.description.length > 180
                              ? post.description.substring(0, 180) + "..."
                              : post.description || "",
                        }}
                      />
                      
                     <button
  className="BlogPostCardReadMoreActionBtn"
  onClick={() => navigate(`/blogdetails/${post._id}`)}
>
  Read more <span className="BlogPostBtnArrow">&gt;&gt;</span>
</button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="BlogPaginationContainer">
                <button 
                  className="BlogPaginationNavArrow" 
                  disabled={currentPage === 1}
                  onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo({top: 400, behavior: 'smooth'}); }}
                >
                  <FiArrowLeft />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    className={`BlogPaginationNumberBtn ${currentPage === idx + 1 ? 'activePageNumber' : ''}`}
                    onClick={() => { setCurrentPage(idx + 1); window.scrollTo({top: 400, behavior: 'smooth'}); }}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button 
                  className="BlogPaginationNavArrow" 
                  disabled={currentPage === totalPages}
                  onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({top: 400, behavior: 'smooth'}); }}
                >
                  <FiArrowRight />
                </button>
              </div>
            )}
          </main>

          {/* RIGHT CONTENT AREA: Dynamic Sidebar Control Filters Widget Stack */}
          <aside className="BlogSidebarWidgetsStack">
            
            <div className="BlogSidebarWidgetCard SearchWidget">
              <h3 className="BlogWidgetSectionHeading">Search</h3>
              <div className="BlogSearchFieldInputWrapper">
                <input 
                  type="text" 
                  placeholder="Type parameters..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="BlogWidgetSearchInputElement"
                />
                <button className="BlogWidgetSearchIconButton"><FiSearch /></button>
              </div>
            </div>

            <div className="BlogSidebarWidgetCard RecentPostsWidget">
              <h3 className="BlogWidgetSectionHeading">Recent Posts</h3>
              <div className="BlogSidebarRecentPostsRowsList">
                {blogs.slice(0, 3).map(post => (
                  <div key={post._id || post.id} className="BlogSidebarMiniPostRowItem">
                    <img 
                      src={getImageUrl(post.image)} 
                      alt={post.title} 
                      className="BlogSidebarMiniPostThumbnail" 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=150";
                      }}
                    />
                    <div className="BlogSidebarMiniPostMetaBlock">
                      <h4 className="BlogSidebarMiniPostTitle">{post.title}</h4>
                      <span className="BlogSidebarMiniPostDate">
                        {post.date ? new Date(post.date).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Categories Selector */}
            <div className="BlogSidebarWidgetCard CategoriesWidget">
              <h3 className="BlogWidgetSectionHeading">Categories</h3>
              <ul className="BlogSidebarCategoriesListContainer">
                {Object.keys(categoryCounts).map(cat => (
                  <li 
                    key={cat}
                    className={`BlogSidebarCategoryListItemRow ${selectedCategory === cat ? 'selectedCategoryItem' : ''}`}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat ? "" : cat);
                      setCurrentPage(1);
                    }}
                  >
                    <span className="BlogCategoryArrowSymbol">&gt;</span>
                    <span className="BlogCategoryLabelText">{cat}</span>
                    {/* <span className="BlogCategoryCounterBadge">{categoryCounts[cat]}</span> */}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 4: Tags Cloud System */}
            <div className="BlogSidebarWidgetCard TagCloudWidget">
              <h3 className="BlogWidgetSectionHeading">Popular Tags</h3>
              <div className="BlogSidebarTagsCloudFlexGroup">
                {tagCloudList.map(tag => (
                  <span
                    key={tag}
                    className={`BlogSidebarIndividualTagBadge ${selectedTag === tag ? 'activeTagBadge' : ''}`}
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? "" : tag);
                      setCurrentPage(1);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
};

export default Blog;