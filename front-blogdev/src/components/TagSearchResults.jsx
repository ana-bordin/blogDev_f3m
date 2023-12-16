import React from 'react';

const TagSearchResults = ({ results }) => {
  return (
    <div>
      <h3>Resultados da Pesquisa</h3>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagSearchResults;