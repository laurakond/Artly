import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { useLoggedInUser } from "./LoggedInUserContext";
import { axiosReq, axiosRes } from "../api/AxiosDefaults";
import { followUserHelper, unfollowUserHelper } from "../utils/utils";

//This code was appropriated from Code Institute's Moments walkthrough project.
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
  //Handle profile data to allow the user to follow another user
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
      toast.success(`You are now following ${clickedProfile.owner}.`);
    } catch (error) {
      toast.error(
        `Something went wrong while attempting to follow ${clickedProfile.owner}.`
      );
    }
  };

  //Handle profile data to allow the user to unfollow another user
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
      toast.success(`You are no longer following ${clickedProfile.owner}.`);
    } catch (error) {
      toast.error(
        `Something went wrong while attempting to unfollow ${clickedProfile.owner}.`
      );
    }
  };

  // Fetch and display profiles based on sold artwork count
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
      } catch (error) {}
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
