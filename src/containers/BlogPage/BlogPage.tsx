import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './BlogPage.css';
import AddPostForm from './components/AddPostForm';
import BlogCard from './components/BlogCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditPostForm from './components/EditPostForm';
import { postsUrl } from '../../shared/projectData';
import Header from '../../components/Header/Header';
import { Pagination } from 'antd';
import useStyles from "../../styles"
import stores from "../../store/index"
import CryptoTable from "../../components/CryptoTable/CryptoTable"

let source: any;

interface BlogPageProps{
  userName: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (blogPost: IPost) => void;
}

export interface IPost{
  id?: number;
  title?: string;
  description?: string;
  date?: any;
  liked?: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({ userName, isLoggedIn, setIsLoggedIn }) => {

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [blogArr, setBlogArr] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<IPost>({});

  const history = useHistory();
  const location = useLocation();

  const [totalElementsCount, setTotalElementsCount] = useState<number>(0);
  const [currentPageElements, setCurrentPageElements] = useState<number[]>([])
  let nedValue: any = location?.search.split('=')[1];
  const elementsPerPage = 2;
  const [offset, setOffset] = useState(nedValue * elementsPerPage || 0);
  const pagesCount = Math.ceil(totalElementsCount / elementsPerPage);
  const classes: any = useStyles();

  const fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then(response => {
        setBlogArr(response?.data);
        setTotalElementsCount(response?.data?.length);
        setCurrentPageElements(response?.data?.slice(offset, offset + elementsPerPage))
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (pageNumber: number) => {
    const offset = (pageNumber - 1) * elementsPerPage;
    history.push(`/blog?page=${pageNumber}`)
    setOffset(offset);
    setCurrentPageElements(blogArr.slice(offset, offset + elementsPerPage))
  };


  useEffect(() => {
    fetchPosts();
    return () => {
      if (source) {
        source.cancel('Axios get canceled');
      }
    };
  });

  const deletePost = (blogPost: IPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      setIsPending(true);
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          console.log('Пост удален => ', response.data);
          //fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewBlogPost = (blogPost: IPost) => {
    setIsPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log('Пост создан =>', response.data);
        //fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editBlogPost = (updatedBlogPost: IPost) => {
    setIsPending(true);
    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('Пост отредактирован =>', response.data);
       // fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFormShow = () => setShowAddForm(true);

  const handleAddFormHide = () => setShowAddForm(false);

  const handleEditFormShow = () => setShowEditForm(true);

  const handleEditFormHide = () => setShowEditForm(false);

  const handleSelectPost = (blogPost: IPost) => setSelectedPost(blogPost);

  

  const isAdmin = isLoggedIn && userName === 'admin';

  const blogPosts = currentPageElements.map((item: any) => {
    return (
      <BlogCard
        key={item?.id}
        title={item?.title}
        description={item?.description}
        date={item?.date}
        deletePost={() => deletePost(item)}
        handleEditFormShow={handleEditFormShow}
        handleSelectPost={() => handleSelectPost(item)}
        isAdmin={isAdmin}
      />
    );
  });

  if (currentPageElements.length === 0) return <h1>Загружаю данные...</h1>;

  const postsOpacity = isPending ? 0.5 : 1;

  return (
    <>
      <Header
        userName={userName}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className='blogPage'>
        
        {
        showAddForm && (
          <AddPostForm
            //@ts-ignore
            blogArr={blogArr}
            addNewBlogPost={addNewBlogPost}
            handleAddFormHide={handleAddFormHide}
          />
        )}

        {showEditForm && (
          <EditPostForm
            handleEditFormHide={handleEditFormHide}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )}
        <>
          <h1>Блог</h1>

          {isAdmin && (
            <div className='addNewPost'>
              <button className='blackBtn' onClick={handleAddFormShow}>
                Создать новый пост
              </button>
            </div>
          )}

          <div className='posts' style={{ opacity: postsOpacity }}>
            {blogPosts}
            {pagesCount > 1 && (
              <Pagination
                defaultCurrent={location?.search.split('=')[1] || 1}
                onChange={handlePageClick}
                total={totalElementsCount}
                pageSize={elementsPerPage}
                showSizeChanger={false}
              />
              
            )}
          </div>
          <CryptoTable classes={classes} currenciesStore={stores.currenciesStore} converterStore={stores.converterStore}/>
          {isPending && <CircularProgress className='preloader' />}
        </>
      </div>
    </>
  );
};
export default BlogPage;