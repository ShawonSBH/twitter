import { useState } from "react";
import styles from "../src/styles/Modal.module.css";
import updateFormStyles from "../src/styles/UpdateForm.module.css";
import { signIn } from "next-auth/react";
import { UserActions, userDispatch } from "@/actions/user";
// import { PhotoIcon } from "@heroicons/react/24/outline";
// import photoStyles from "../src/styles/TweetBox.module.css";

export default function UpdateForm({ setModalState, user }) {
  const [userData, setUserData] = useState({
    name: user.name,
    username: user.username,
    profilePicture: user.profilePicture,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(user.profilePicture);

  const handleUpdate = async () => {
    setIsLoading(true);
    if (checkForChange) {
      userDispatch({
        type: UserActions.editUser,
        payload: {
          userData,
          selectedImage,
          user,
          setSelectedImage,
          setImageUrl,
          setIsLoading,
          setModalState,
          signIn,
        },
      });
    }
    setModalState("");
  };

  const checkForChange = () =>
    user.name !== userData.name ||
    user.username !== userData.username ||
    user.profilePicture !== imageUrl;

  const handleChange = (event) => {
    event.preventDefault();
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={styles.form}>
      <h2>Update Your Account</h2>
      <div>
        <p className={updateFormStyles.label}>Name</p>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          className={styles.inputs}
        />
      </div>
      <div>
        <p className={updateFormStyles.label}>username</p>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          className={styles.inputs}
        />
      </div>
      <div>
        <p className={updateFormStyles.label}>Profile Picture</p>
        <div className={styles.profilePicturePreview}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded image"
              style={{ width: "20rem" }}
            />
          )}
        </div>
      </div>
      <button className={styles.submitButton}>
        <label htmlFor="profile-picture-upload">Upload Image</label>
      </button>
      <input
        type="file"
        id="profile-picture-upload"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setSelectedImage(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setImageUrl(e.target.result);
          };
          reader.readAsDataURL(file);
        }}
      />
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button onClick={handleUpdate} className={styles.submitButton}>
          Update
        </button>
      )}
    </div>
  );
}
