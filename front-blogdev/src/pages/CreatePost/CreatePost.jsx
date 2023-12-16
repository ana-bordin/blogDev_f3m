import React, { useState } from 'react';
import { useAuthValue } from '../../context/AuthContext';
import { userInsertDocument } from '../../hooks/userInsertDocument';
import Post from '../../hooks/userPost';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();
  const { insertDocument, response } = userInsertDocument('posts');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(imageURL);
    } catch (error) {
      setFormError('A URL da imagem precisa ser válida');
      return;
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !tags || !body || !imageURL) {
      setFormError('Preencha todos os campos!');
      return;
    }

    await insertDocument({
      title,
      imageURL,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // Limpar os campos após a postagem ser criada
    setTitle('');
    setImageURL('');
    setBody('');
    setTags('');
  };

  return (
    <div>
      <h2>Nova postagem</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          URL da Imagem:
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </label>
        <label>
          Conteúdo da Postagem:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn" disabled={response.loading}>
          {response.loading ? 'Postando...' : 'Criar Postagem'}
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
