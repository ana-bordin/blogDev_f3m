import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { userDeleteDocument } from '../../hooks/userDeleteDocument';
import styles from './Dashboard.module.css'
import { userFetchDocuments } from '../../hooks/userFetchDocuments';

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid;

  const { documents: posts } = userFetchDocuments("posts", null, uid)
  const { deleteDocument } = userDeleteDocument("posts")
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus Posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Você não tem nenhum post</p>
          <Link to="/post/create" className='btn'>Criar Post</Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>titulo</span>
          <span>ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/post/${post.id}`} className='btn btn-outline'>Ver</Link>
              <Link className='btn btn-outline' to={`/post/edit/${post.id}`}>Editar</Link>
              <button className='btn btn-outline btn-danger' onClick={() => deleteDocument(post.id)}>Excluir</button>
            </div>
          </div>
        ))}

    </div>
  )
}

export default Dashboard
