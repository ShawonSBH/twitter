import axios from "axios";

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

const logIn = async ({ setIsLoading, userData, signIn }) => {
  setIsLoading(true);
  console.log(userData);
  signIn("credentials", {
    email: userData.email,
    password: userData.password,
  });
};

const signUp = async ({ userData, setIsLoading, date, signIn }) => {
  setIsLoading(true);
  console.log(date);
  const res = await axios
    .post("/api/users", {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      dob: date,
      profilePicture: userData.profilePicture,
    })
    .catch((err) => console.log(err));

  const data = await res.data;
  if (data.success) {
    await signIn("credentials", {
      email: userData.email,
      password: userData.password,
    });
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

const followUser = async ({ user, setIsFollowed, isFollowed }) => {
  const res = await axios.post(`/api/users/${user._id}`);
  const response = await res.data;
  if (response.success) {
    setIsFollowed(!isFollowed);
  }
};

const unfollowUser = async ({ user, setIsFollowed, isFollowed }) => {
  const res = await axios.delete(`/api/users/${user._id}`);
  const response = await res.data;
  if (response.success) {
    setIsFollowed(!isFollowed);
  }
};
