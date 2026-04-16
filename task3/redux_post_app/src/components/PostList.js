import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
} from '../redux/postsSlice';
import PostItem from './PostItem';
import SearchBar from './SearchBar';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  }, [posts, search]);

  if (status === 'loading' && posts.length === 0) {
    return <p className="status status--loading">Loading posts...</p>;
  }

  if (status === 'failed') {
    return (
      <div className="status status--error">
        <p>Failed to load posts: {error}</p>
        <button onClick={() => dispatch(fetchPosts())}>Retry</button>
      </div>
    );
  }

  return (
    <section className="post-list">
      <div className="post-list__header">
        <h2>Posts ({filteredPosts.length})</h2>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="status status--empty">
          {search ? `No posts match "${search}".` : 'No posts yet.'}
        </p>
      ) : (
        <div className="post-list__items">
          {filteredPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PostList;