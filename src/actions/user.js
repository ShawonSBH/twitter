import axios from "axios";
import { toast } from "react-toastify";

export const UserActions = {
  login: "LOGIN",
  signup: "SIGNUP",
  editUser: "EDIT_USER",
  followUser: "FOLLOW_USER",
  unfollowUser: "UNFOLLOW_USER",
};

export const userReducers = (action) => {
  switch (action.type) {
    case UserActions.login:
      logIn(action.payload);
      break;
    case UserActions.signup:
      signUp(action.payload);
      break;
    case UserActions.editUser:
      editUser(action.payload);
      break;
    case UserActions.followUser:
      followUser(action.payload);
      break;
    case UserActions.unfollowUser:
      unfollowUser(action.payload);
      break;
  }
};

export const userDispatch = (action) => {
  userReducers(action);
};

const logIn = async ({ setIsLoading, userData, signIn, setModalState }) => {
  setIsLoading(true);
  console.log(userData);
  const response = await signIn("credentials", {
    email: userData.email,
    password: userData.password,
    redirect: false,
  });
  console.log(response);
  if (response.error) {
    toast.error(response.error, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setIsLoading(false);
    setModalState({});
  }
};

const signUp = async ({ userData, setIsLoading, date, signIn }) => {
  setIsLoading(true);
  console.log(date);
  if (
    userData.name &&
    userData.username &&
    userData.email &&
    userData.password &&
    date
  ) {
    const res = await axios
      .post("/api/users", {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        dob: date,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    if (data.success) {
      await signIn("credentials", {
        email: userData.email,
        password: userData.password,
      });
    }
  } else {
    console.log("All fields required");
    toast.error("All fields are required", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setIsLoading(false);
  }
};

const editUser = async ({
  userData,
  selectedImage,
  user,
  setSelectedImage,
  setImageUrl,
  setIsLoading,
  setModalState,
  signIn,
}) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("username", userData.username);
  formData.append("profilePicture", selectedImage);
  try {
    const res = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setSelectedImage(null);
    setImageUrl(null);
    setIsLoading(false);
    setModalState("");
    await signIn("credentials");
  } catch (error) {
    console.log(error);
  }
};

const followUser = async ({
  user,
  setIsFollowed,
  isFollowed,
  followers,
  setFollowers,
  currentUser,
}) => {
  const res = await axios.post(`/api/users/${user._id}`);
  const response = await res.data;
  if (response.success) {
    setIsFollowed(!isFollowed);
    if (followers) {
      setFollowers([...followers, currentUser]);
    }
  }
};

const unfollowUser = async ({
  user,
  setIsFollowed,
  isFollowed,
  followers,
  setFollowers,
  currentUser,
}) => {
  const res = await axios.delete(`/api/users/${user._id}`);
  const response = await res.data;
  if (response.success) {
    setIsFollowed(!isFollowed);
    if (followers) {
      const updatedFollowers = followers.filter(
        (Follower) =>
          Follower.id !== currentUser.id && Follower._id !== currentUser.id
      );
      setFollowers(updatedFollowers);
    }
  }
};
