const PostItem = ({ post }) => {
  const classes = [
    'post-item',
    post._optimistic ? 'post-item--optimistic' : '',
    post._justAdded ? 'post-item--new' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes}>
      <header className="post-item__header">
        <h3 className="post-item__title">{post.title}</h3>
        {post._optimistic && <span className="badge">Saving...</span>}
        {post._justAdded && !post._optimistic && (
          <span className="badge badge--success">New</span>
        )}
      </header>
      <p className="post-item__body">{post.body}</p>
    </article>
  );
};

export default PostItem;