import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { userInsertDocument } from '../../hooks/userInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()

  const navigate = useNavigate()

  const { insertDocument, response } = userInsertDocument("posts")

  const handlerSubmit = (e) => {
    e.preventDefault()
    setFormError("")


    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida")
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    if (!title || !tags || !body || !image) {
      setFormError("Por favor, preencha com atenção todos os campos!")
    }

    console.log(tagsArray)

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createBy: user.displayName
    })

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createBy: user.displayName
    }
    )
    navigate("/")
  }

  return (
    <>
      <div>
        <h2 className={styles.CreatePost}>
          Nova postagem
        </h2>
        <p>
          Compartilhe sua experiência
        </p>
        <form onSubmit={handlerSubmit}>
          <label>
            <span>
              Título
            </span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="título da postagem"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required />
          </label>
          <label>
            <span>
              URL da imagem
            </span>
            <input type="text"
              name="image"
              id="image"
              placeholder="Endereço da imagem"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              required />
          </label>
          <label>
            <span>
              Conteúdo da Postagem
            </span>
            <textarea name="body"
              id="body"
              cols="30"
              rows="10"
              placeholder="Insira o conteúdo da sua postagem aqui"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              required> </textarea>
          </label>
          <label>
            <span>
              Tags
            </span>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Insira suas Tags, separadas por vírgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              required />
          </label>
          {!response.loading && <button className="btn">Criar Postagem</button>}
          {response.loading && <button className="btn">Postando...</button>}
          {response.error && <p className='error'>{response.error || formError}</p>}
        </form>
      </div>
    </>
  )
}

export default CreatePost
