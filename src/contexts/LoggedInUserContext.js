import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/AxiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

//This code was appropriated from Code Institute's Moments walkthrough project.
export const LoggedInUserContext = createContext();
export const SetLoggedInUserContext = createContext();

export const useLoggedInUser = () => useContext(LoggedInUserContext);
export const useSetLoggedInUser = () => useContext(SetLoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setLoggedInUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setLoggedInUser((prevLoggedInUser) => {
              if (prevLoggedInUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
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
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <LoggedInUserContext.Provider value={loggedInUser}>
      <SetLoggedInUserContext.Provider value={setLoggedInUser}>
        {children}
      </SetLoggedInUserContext.Provider>
    </LoggedInUserContext.Provider>
  );
};
