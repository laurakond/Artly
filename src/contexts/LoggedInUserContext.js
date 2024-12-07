import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/AxiosDefaults';
import { useHistory } from 'react-router-dom';

export const LoggedinUserContext = createContext();
export const SetLoggedinUserContext = createContext();

export const useLoggedInUser = () => useContext(LoggedinUserContext);
export const useSetLoggedInUser = () => useContext(SetLoggedinUserContext);

export const LoggedInUserProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();

    const handleMount = async () => {
        try {
            const {data} = await axiosRes.get('dj-rest-auth/user/')
            setLoggedInUser(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        handleMount()
    }, []);

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                try {
                await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                setLoggedInUser((prevLoggedInUser) => {
                    if (prevLoggedInUser) {
                    history.push("/signin");
                    }
                    return null;
                });
                return config;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
            );

            axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                try {
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                    setLoggedInUser((prevLoggedInUser) => {
                    if (prevLoggedInUser) {
                        history.push("/signin");
                    }
                    return null;
                    });
                }
                return axios(err.config);
                }
                return Promise.reject(err);
            }
            );
        }, [history]);

    return(
        <LoggedinUserContext.Provider value={loggedInUser}>
            <SetLoggedinUserContext.Provider value={setLoggedInUser}>
                {children}
            </SetLoggedinUserContext.Provider>
        </LoggedinUserContext.Provider>
    )
}