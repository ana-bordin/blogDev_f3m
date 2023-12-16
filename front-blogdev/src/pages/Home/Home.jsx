import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import Post from '../../hooks/userPost';
import { getPosts } from '../../hooks/userGetDocument';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const postsSnapshot = await getDocs(postsCollection);
        const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error('Erro ao buscar posts:', error.message);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(filteredPosts);
  }, [posts, searchTerm]);

  const handleTagClick = (postId) => {
    navigate(`/search?postId=${postId}`);
  };

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="text"
        placeholder="Pesquisar por tag"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && searchResults.length === 0 && <p>Nenhum resultado encontrado</p>}
      {searchResults.length > 0 && (
        <div>
          <h3>Resultados da pesquisa:</h3>
          {searchResults.map((post) => (
            <Post key={post.id} post={post} onTagClick={handleTagClick} />
          ))}
        </div>
      )}
      {!searchTerm && (
        <div>
          <h3>Todos os posts:</h3>
          {posts.map((post) => (
            <Post key={post.id} post={post} onTagClick={handleTagClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
