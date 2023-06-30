import {
  FC,
  createContext,
  // useState,
  // useEffect,
  ReactNode,
} from 'react';
// import { getUser } from '@/services/user.service';
// import { IUser } from '@/types/user.types';

// Create a AuthContext
export const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
  getUserData: () => {},
  userData: {
    _id: '',
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    password: '',
  },
});

// AuthContext component that wraps your app
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [userData, setUserData] = useState<IUser & { _id: string }>({
  //   _id: '',
  //   name: '',
  //   surname: '',
  //   patronymic: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  // });

  // const login = () => {
  //   setIsLoggedIn(true);
  // };

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem('token');
  //   setUserData({
  //     _id: '',
  //     name: '',
  //     surname: '',
  //     patronymic: '',
  //     email: '',
  //     phone: '',
  //     password: '',
  //   });
  // };

  // const getUserData = async () => {
  //   const data = await getUser();
  //   setIsLoading(false);

  //   if (data.success) {
  //     setUserData(data.data);
  //     login();
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem('token')) getUserData();
  //   else setIsLoading(false);
  // }, []);

  return (
    // <AuthContext.Provider
    //   value={{
    //     isLoggedIn,
    //     isLoading,
    //     login,
    //     logout,
    //     userData,
    //     getUserData,
    //   }}
    // >
      <></>
    // </AuthContext.Provider>
  );
};
