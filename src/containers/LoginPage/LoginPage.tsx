import { useState } from "react";
import { useHistory } from "react-router";
import "./LoginPage.css";

interface LoginPageProps{
  setIsLoggedIn: Function;
  setUserName: Function;
}

const LoginPage: React.FC<LoginPageProps> = ({
  setIsLoggedIn,
  setUserName
}) => {

  const history: any = useHistory()

  const [login, setLogin] = useState<any>('');
  const [password, setPassword] = useState<any>('');

  const handleLoginChange = (e: any) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleLogIn = (e) => {
    e.preventDefault();

    if (login === 'admin' && password === '123456') {
      //@ts-ignore
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userName', login);
      setUserName(login);
      setIsLoggedIn(true);
      history.push('/');
    }
    else {
      alert('Введите правильный логин или пароль!');
      return false
    }
  }

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Авторизация</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Логин"
            onChange={handleLoginChange}
            value={login}
            required
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
};
export default LoginPage