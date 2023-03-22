import Post from "./Post";
import styles from "../src/styles/Feed.module.css";
import TweetBox from "./TweetBox";

export default function Feed() {
  const users = [
    {
      id: 1,
      name: "Mohammed Mazhar Ali Shawon",
      username: "mazhar_ali_shawon",
      image: "/user.jpeg",
    },
    {
      id: 2,
      name: "Farhan Mahtab Mahi",
      username: "ironblood",
      image: "/pp.jpeg",
    },
  ];

  const posts = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis",
      image: "",
      time: "8h",
      user: users[0],
      likes: 30,
      comments: 20
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
      image: "/user.jpeg",
      time: "7h",
      user: users[0],
      likes: 120,
      comments: 50
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate",
      image: "",
      time: "7h",
      user: users[1],
      likes: 40,
      comments: 10
    },
  ];

  return (
    <div className={styles.feed}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
      </div>
      <TweetBox />
      {posts.map((post) => (
        <Post key ={post.id} post={post}/>
      ))}
    </div>
  );
}
