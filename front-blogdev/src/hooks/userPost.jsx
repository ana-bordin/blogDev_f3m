import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { addDoc, Timestamp } from 'firebase/firestore'

const Post = ({ post, onTagClick }) => {
  const { title, image, createdBy, tags } = post;

  const handleImageError = () => {
    // Trate o erro de carregamento da imagem aqui, se necessário
    console.error('Erro ao carregar imagem:', image);
  };

  return (
    <div>
      <h4>{title}</h4>
      <img
        src={image}
        alt={title}
        style={{ maxWidth: '100%' }}
        onError={handleImageError}
      />
      <p>Autor: {createdBy}</p>
      <p>
        Tags:{' '}
        {tags && Array.isArray(tags) && tags.map((tag) => (
          <span key={tag} onClick={() => onTagClick(tag)} style={{ cursor: 'pointer', margin: '0 5px' }}>
            {tag}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Post;
