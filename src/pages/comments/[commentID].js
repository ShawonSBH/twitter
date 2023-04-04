import Comments from "@/models/Comments";
import PostDetails from "../../../components/PostDetails";
import Posts from "@/models/Posts";
import Sidebar from "../../../components/Sidebar";
import styles from "../../styles/SinglePost.module.css";
import secondaryStyles from "../../styles/Postview.module.css";
import Comment from "../../../components/Comment";

export default function CommentPage({ post, comment }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={secondaryStyles.container}>
        <PostDetails post={post} numberOfComments={post.comments.length} />
        <Comment comment={comment} />
        {comment.replies?.map((reply) => (
          <div style={{ paddingLeft: "2rem" }}>
            <Comment comment={reply} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { commentID } = context.query;

  const comment = await Comments.findById(commentID)
    .populate({
      path: "commentor",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    })
    .populate({
      path: "replies",
      populate: {
        path: "commentor",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      },
    });

  console.log(comment);

  const post = await Posts.findById(comment.postLink).populate({
    path: "createdBy",
    select: {
      _id: 1,
      name: 1,
      username: 1,
      email: 1,
      profilePicture: 1,
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      comment: JSON.parse(JSON.stringify(comment)),
    },
  };
}
