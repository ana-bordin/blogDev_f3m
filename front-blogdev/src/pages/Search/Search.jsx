import React from 'react'
import styles from './Search.module.css'
import { useQuery } from '../../hooks/useQuery'
import { userFetchDocuments } from '../../hooks/userFetchDocuments'
import { Link } from 'react-router-dom'
import CardPost from '../../components/CardPost'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = userFetchDocuments("posts", search)
  return (
    <div className={styles.search}>
        <h1>Resultados encontrados para: {search}</h1>
        <div>
            {posts && posts.length === 0 && (
                <>
                <p>Nao foram encontrados</p>
                <Link to="/">Voltar</Link>
                </>
            )}
            {posts && posts.map((post) => (
                <CardPost key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search
