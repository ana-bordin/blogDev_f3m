import React, { useState } from 'react';
import { getPosts } from '../hooks/userGetDocument';

const TagSearch = ({ setSearchResults }) => {
  const [tag, setTag] = useState('');

  const handleSearch = async () => {
    const posts = await getPosts();
    const filteredPosts = posts.filter((post) => post.tags.includes(tag));
    setSearchResults(filteredPosts);
  };

  return (
    <div>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Pesquisar por tag"
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default TagSearch;
