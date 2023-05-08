import axios from "axios";

export const TweetActions = {
  postTweet: "POST_TWEET",
  postComment: "POST_COMMENT",
  postLike: "POST_LIKE",
  postRetweet: "POST_RETWEET",
  editTweet: "EDIT_TWEET",
  editComment: "EDIT_COMMENT",
  deleteTweet: "DELETE_TWEET",
  deleteComment: "DELETE_COMMENT",
};

export function tweetReducer(action) {
  switch (action.type) {
    case TweetActions.postTweet:
      postTweet(action.payload);
      break;
    case TweetActions.postComment:
      postComment(action.payload);
      break;
    case TweetActions.postLike:
      postLike(action.payload);
      break;
    case TweetActions.postRetweet:
      postRetweet(action.payload);
      break;
    case TweetActions.editTweet:
      editTweet(action.payload);
      break;
    case TweetActions.editComment:
      editComment(action.payload);
      break;
    case TweetActions.deleteTweet:
      deleteTweet(action.payload);
      break;
    case TweetActions.deleteComment:
      deleteComment(action.payload);
      break;
  }
}

export const tweetDispatch = (action) => {
  tweetReducer(action);
};

const postTweet = async ({
  setIsLoading,
  setContent,
  setSelectedImage,
  setImageUrl,
  setTweets,
  setModalState,
  selectedImage,
  content,
  modalState,
  tweets,
}) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("content", content);
  formData.append("image", selectedImage);
  formData.append("typeOfTweet", "Original");
  try {
    const res = await fetch("/api/tweets", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setContent("");
    setSelectedImage(null);
    setImageUrl(null);
    setIsLoading(false);
    if (data.success) {
      setTweets([data.tweet, ...tweets]);
      if (modalState.state === "Tweet") {
        setModalState({});
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const postComment = async ({
  modalState,
  content,
  commentID,
  setFunction,
  parameter,
}) => {
  const res = await axios
    .post(`/api/comment`, {
      content,
      typeOfTweet: "Comment",
      originalTweetLink: commentID,
    })
    .catch((err) => console.log(err));

  console.log(res);
  const result = await res.data;
  if (result.success) {
    setFunction([result.comment, ...parameter]);
    modalState.setNumberOfComments(modalState.numberOfComments + 1);
  }
};

const postLike = async ({
  tweet,
  isLiked,
  setIsLiked,
  setNumberOfLikes,
  numberOfLikes,
}) => {
  const res = await axios
    .post(`/api/react`, {
      tweetID: tweet._id,
    })
    .catch((err) => console.log(err));
  const response = await res.data;
  if (response.success) {
    if (isLiked) {
      setNumberOfLikes(numberOfLikes - 1);
    } else {
      setNumberOfLikes(numberOfLikes + 1);
    }
    setIsLiked(!isLiked);
  }
};

const postRetweet = async ({
  tweet,
  setRetweeted,
  retweeted,
  setTweets,
  tweets,
  setNumberOfRetweets,
  numberOfRetweets,
}) => {
  const res = await axios
    .post(`/api/tweets/${tweet._id}`)
    .catch((err) => console.log(err));
  const response = await res.data;
  if (response.success) {
    setRetweeted(!retweeted);
    if (response.message === "Retweet Successful") {
      setTweets([response.tweet, ...tweets]);
      setNumberOfRetweets(numberOfRetweets + 1);
    } else {
      const updatedTweets = tweets.filter(
        (tweetIterator) => tweetIterator._id !== response.deletedTweet._id
      );
      setTweets(updatedTweets);
      setNumberOfRetweets(numberOfRetweets - 1);
    }
    //alert("success");
  }
};

const editTweet = async ({
  setIsLoading,
  content,
  selectedImageFile,
  imageURL,
  modalState,
  setContent,
  setSelectedImageFile,
  setImageURL,
  setModalState,
}) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("content", content);
  formData.append("image", selectedImageFile);
  formData.append("imageUrl", imageURL);
  try {
    const res = await fetch(`/api/tweets/${modalState.tweet._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setContent("");
    setSelectedImageFile(null);
    setImageURL(null);
    setIsLoading(false);
    if (data.success) {
      modalState.setTweetContent(data.tweet.content);
      modalState.setTweetImage(data.tweet.image);
    }
  } catch (error) {
    console.log(error);
  }
  setModalState({});
};

const editComment = async ({ content, commentID, setFunction }) => {
  const res = await axios
    .put(`/api/comment`, {
      content,
      commentID,
    })
    .catch((err) => console.log(err));

  const result = await res.data;
  if (result.success) {
    setFunction(result.comment.content);
  }
};

const deleteTweet = async ({ modalState, setModalState }) => {
  const res = await axios.delete(`/api/tweets/${modalState.tweet._id}`);
  const response = await res.data;
  if (response.success) {
    const updatedTweets = modalState.tweets.filter(
      (tweetIterator) => tweetIterator._id !== modalState.tweet._id
    );
    modalState.setTweets(updatedTweets);
  } else {
    console.log("Something went wrong");
  }
  setModalState({});
};

const deleteComment = async ({
  comment,
  comments,
  setComments,
  setTotalNumberOfComments,
  totalNumberOfComments,
}) => {
  const res = await axios.delete(`/api/comment/${comment._id}`);
  const response = await res.data;
  if (response.success) {
    const updatedComments = comments.filter(
      (commentIterator) => commentIterator._id !== comment._id
    );
    setComments(updatedComments);
    setTotalNumberOfComments(totalNumberOfComments - 1);
  } else {
    console.log("Something went wrong");
  }
};
