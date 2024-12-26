import React, { useState, useEffect, createContext, useContext } from "react";
import { useLoggedInUser } from "./LoggedInUserContext";
import { axiosReq } from "../api/AxiosDefaults";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    mostSellingProfiles: { results: [] },
  });

  const loggedInUser = useLoggedInUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-sold_artwork_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          mostSellingProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [loggedInUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

export default ProfileDataProvider;
