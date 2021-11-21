import "./EditPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { useEffect, useState } from "react";

export const EditPostForm = ({selectedPost,editBlogPost,handleEditFormHide}) => {

  const [postTitle, setPostTitle] = useState(selectedPost.title)
  const [postDesc, setPostDesc] = useState(selectedPost.description)

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value)
  };

  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value)
  };

  const savePost = (e) => {
    e.preventDefault()
    const post = {
      id: selectedPost.id,
      title: postTitle,
      description: postDesc,
      liked: selectedPost.liked,
    }

    editBlogPost(post);
    handleEditFormHide()
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleEditFormHide();
      }
    };
    window.addEventListener('keyup', handleEscape)

    return () => window.removeEventListener('keyup', handleEscape)
  }, [selectedPost,editBlogPost,handleEditFormHide])

  const handleEditFormHides = handleEditFormHide;
  return (
    <>
      <form className="editPostForm" onSubmit={savePost}>
        <button className="hideBtn" onClick={handleEditFormHides}>
          <CancelIcon />
        </button>
        <h2>Редактирование поста</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="postTitle"
            placeholder="Заголовок поста"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="editFormInput"
            name="postDescription"
            placeholder="Описание поста"
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button
            className="blackBtn"
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
      <div onClick={handleEditFormHides} className="overlay"></div>
    </>
  );
}
