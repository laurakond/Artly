import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const LoggedinUserContext = createContext();
export const SetLoggedinUserContext = createContext();

export const useLoggedInUser = () => useContext(LoggedinUserContext);
export const useSetLoggedInUser = () => useContext(SetLoggedinUserContext);

export const LoggedInUserProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleMount = async () => {
        try {
            const {data} = await axios.get('dj-rest-auth/user/')
            setLoggedInUser(data)
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(()=>{
        handleMount()
    }, []);

    return(
        <LoggedinUserContext.Provider value={loggedInUser}>
            <SetLoggedinUserContext.Provider value={setLoggedInUser}>
                {children}
            </SetLoggedinUserContext.Provider>
        </LoggedinUserContext.Provider>
    )
}