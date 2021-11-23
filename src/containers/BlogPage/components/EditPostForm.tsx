import "./EditPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import React,{ useEffect, useState } from "react";
import { IPost } from "../BlogPage";

interface EditPostProps{
  selectedPost: IPost;
  editBlogPost: (post: IPost) => void;
  handleEditFormHide: () => void;
}

const EditPostForm: React.FC<EditPostProps> = ({selectedPost,editBlogPost,handleEditFormHide}) => {

  const [postTitle, setPostTitle] = useState(selectedPost.title)
  const [postDesc, setPostDesc] = useState(selectedPost.description)

  const handlePostTitleChange = (e: any) => {
    setPostTitle(e.target.value)
  };

  const handlePostDescChange = (e: any) => {
    setPostDesc(e.target.value)
  };

  const savePost = (e: any) => {
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
    const handleEscape = (e: any) => {
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
export default EditPostForm