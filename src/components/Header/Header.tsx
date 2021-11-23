import { NavLink } from 'react-router-dom';
import './Header.css';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import React from "react"
import { IPost } from '../../containers/BlogPage/BlogPage';

interface HeaderProps{
  isLoggedIn: boolean;
  setIsLoggedIn: (blogPost: IPost) => void;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    //@ts-ignore
    setIsLoggedIn(false);
  };

  return (
    <header className="mainHeader">
      {isLoggedIn ? (
        <nav>
          Добро пожаловать, &nbsp;<strong>{userName}</strong>
          <NavLink onClick={handleLogOut} exact to='/login'>
            <MeetingRoomIcon />
            Выход
          </NavLink>
        </nav>
      ) : (
        <nav>
          Добро пожаловать, незнакомец!,
          <NavLink onClick={handleLogOut} exact to='/login'>
            <MeetingRoomIcon />
            Вход
          </NavLink>
        </nav>
      )}
    </header>
  );
};
export default Header;