import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Redux Posts</h1>
        <p className="app__subtitle">
          React + Redux Toolkit demo using JSONPlaceholder
        </p>
      </header>

      <main className="app__main">
        <PostForm />
        <PostList />
      </main>

      <footer className="app__footer">
        <small>
          Note: JSONPlaceholder fakes POST requests 
        </small>
      </footer>
    </div>
  );
};

export default App;