import "./AddPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import React,{ useState } from "react";
import {IPost} from "../BlogPage"

interface AddPostProps{
  addNewBlogPost: (blogPost: IPost) => void;
  handleAddFormHide: () => void;
}

const AddPostForm: React.FC<AddPostProps> = ({ addNewBlogPost, handleAddFormHide }) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postDesc, setPostDesc] = useState<string>("");

  const handlePostTitleChange = (e: any) => {
    setPostTitle(e?.target?.value);
  };

  const handlePostDescChange = (e: any) => {
    setPostDesc(e?.target?.value);
  };

  const createPost = (e: any) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      date: new Date().toLocaleDateString(),
    };

    addNewBlogPost(post);
    handleAddFormHide();
  };

  useState(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        handleAddFormHide();
      }
    };

    window.addEventListener("keyup", handleEscape);

    return () => {
      window.removeEventListener("keyup", handleEscape);
    };
  });

  return (
    <>
      <form className="addPostForm" onSubmit={createPost}>
        <button className="hideBtn" onClick={handleAddFormHide}>
          <CancelIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input
            className="addFormInput"
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
            className="addFormInput"
            name="postDescription"
            placeholder="Описание поста"
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Добавить пост
          </button>
        </div>
      </form>
      <div onClick={handleAddFormHide} className="overlay"></div>
    </>
  );
};
export default AddPostForm;