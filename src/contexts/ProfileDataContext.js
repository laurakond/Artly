import React, { useState, useEffect, createContext, useContext } from "react";
import { useLoggedInUser } from "./LoggedInUserContext";
import { axiosReq, axiosRes } from "../api/AxiosDefaults";
import { followUserHelper, unfollowUserHelper } from "../utils/utils";

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

  const handleFollowUser = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followUserHelper(profile, clickedProfile, data.id)
          ),
        },
        mostSellingProfiles: {
          ...prevState.mostSellingProfiles,
          results: prevState.mostSellingProfiles.results.map((profile) =>
            followUserHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollowUser = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowUserHelper(profile, clickedProfile)
          ),
        },
        mostSellingProfiles: {
          ...prevState.mostSellingProfiles,
          results: prevState.mostSellingProfiles.results.map((profile) =>
            unfollowUserHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

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
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollowUser, handleUnfollowUser }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

export default ProfileDataProvider;
