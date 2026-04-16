import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  addPost,
  selectAddStatus,
  selectAddError,
  clearAddError,
} from '../redux/postsSlice';

const PostForm = () => {
  const dispatch = useDispatch();
  const addStatus = useSelector(selectAddStatus);
  const addError = useSelector(selectAddError);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const isSubmitting = addStatus === 'loading';
  const canSubmit = title.trim() && body.trim() && !isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const result = await dispatch(
      addPost({
        title: title.trim(),
        body: body.trim(),
        tempId: `temp-${nanoid()}`,
      })
    );

    if (addPost.fulfilled.match(result)) {
      setTitle('');
      setBody('');
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Add a new post</h2>

      <label htmlFor="post-title">Title</label>
      <input
        id="post-title"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (addError) dispatch(clearAddError());
        }}
        placeholder="What's on your mind?"
        maxLength={120}
        disabled={isSubmitting}
      />

      <label htmlFor="post-body">Body</label>
      <textarea
        id="post-body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          if (addError) dispatch(clearAddError());
        }}
        placeholder="Write something..."
        rows={4}
        disabled={isSubmitting}
      />

      <button type="submit" disabled={!canSubmit}>
        {isSubmitting ? 'Adding...' : 'Add Post'}
      </button>

      {addError && <p className="form-error">Error: {addError}</p>}
    </form>
  );
};

export default PostForm;