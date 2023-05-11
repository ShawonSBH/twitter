import { ArrowSmallLeftIcon, BackspaceIcon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar";
import UserProfileView from "../../components/UserProfileView";
import styles from "../../styles/UserProfile.module.css";
import { useEffect, useState } from "react";
import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import Post from "../../components/Post";
import Reacts from "@/models/Reacts";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import axios from "axios";
import Users from "@/models/Users";
import Tweets from "@/models/Tweets";
import TweetShower from "../../components/TweetShower";
import Following from "../../components/Following";
import Followers from "../../components/Followers";
import { useRouter } from "next/router";

export default function ProfilePage({ user, posts, liked, tweets }) {
  const [selectedOption, setSelectedOption] = useState("tweets");
  const { data: session } = useSession();
  const [fetchedTweets, setFetchedTweets] = useState(tweets);
  const [isFollowed, setIsFollowed] = useState(false);
  const [following, setFollowing] = useState(user.following);
  const [followers, setFollowers] = useState(user.followers);
  const router = useRouter();

  useEffect(() => {
    // Update isLiked state when session object changes
    console.log(isFollowed);
    setIsFollowed(
      user.followers?.some((follower) => {
        console.log(
          follower._id.toString() + " " + session?.user.id.toString()
        );
        return follower._id.toString() === session?.user.id.toString();
      })
    );
  }, [session]);

  //console.log(user);

  useEffect(() => {
    setFetchedTweets(tweets);
    setFollowers(user.followers);
    setFollowing(user.following);
    setIsFollowed(
      user.followers?.some((follower) => {
        console.log(
          follower._id.toString() + " " + session?.user.id.toString()
        );
        return follower._id.toString() === session?.user.id.toString();
      })
    );
  }, [router.query]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.profileBar}>
        <UserProfileView
          user={user}
          numberOfTweets={tweets.length}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
          followers={followers}
          setFollowers={setFollowers}
        />
        {selectedOption === "tweets" &&
          fetchedTweets.map((tweet) => (
            <TweetShower
              tweet={tweet}
              tweets={fetchedTweets}
              setTweets={setFetchedTweets}
            />
          ))}
        {selectedOption === "followers" && followers.length > 0 ? (
          followers.map((follower) => (
            <Followers user={follower} key={follower._id} />
          ))
        ) : selectedOption === "followers" &&
          session.user.id === user._id &&
          followers.length === 0 ? (
          <div className={styles.followerContainer}>
            <img className={styles.notFollowingImage} src="/followers.png" />
            <h3>Looking for followers?</h3>
            <p>
              When someone follows this account, they’ll show up here. Tweeting
              and interacting with others helps boost followers.
            </p>
          </div>
        ) : (
          selectedOption === "followers" &&
          followers.length === 0 && (
            <div>This user is not being followed by anyone</div>
          )
        )}
        {selectedOption === "following" && following.length > 0 ? (
          following.map((followingUser) => (
            <Following
              user={followingUser}
              key={followingUser._id}
              currentUser={user}
            />
          ))
        ) : selectedOption === "following" &&
          session.user.id === user._id &&
          following.length === 0 ? (
          <div className={styles.followerContainer}>
            <h3>Be in the know</h3>
            <p>
              Following accounts is an easy way to curate your timeline and know
              what’s happening with the topics and people you’re interested in.
            </p>
            <button className={styles.findPeople}>Find People to Follow</button>
          </div>
        ) : (
          selectedOption === "following" &&
          following.length === 0 && <div>This user is not following anyone</div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userID } = context.query;
  await connectMongo();
  const user = await Users.findById(userID)
    .populate({
      path: "followers",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        profilePicture: 1,
      },
    })
    .populate({
      path: "following",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        profilePicture: 1,
      },
    });
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions()
  );
  try {
    const posts = await Posts.find({ createdBy: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      });
    const tweets = await Tweets.find({
      typeOfTweet: { $ne: "Comment" },
      createdBy: userID,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      })
      .populate({
        path: "originalTweetLink",
        select: {
          createdBy: 1,
          comments: 1,
          likes: 1,
          retweets: 1,
          content: 1,
          image: 1,
        },
        populate: [
          {
            path: "createdBy",
            select: {
              _id: 1,
              name: 1,
              username: 1,
              email: 1,
              profilePicture: 1,
            },
          },
          {
            path: "comments",
            options: { sort: { createdAt: -1 } },
            populate: [
              {
                path: "createdBy",
                select: {
                  _id: 1,
                  name: 1,
                  username: 1,
                  email: 1,
                  profilePicture: 1,
                },
              },
              {
                path: "comments",
                options: { sort: { createdAt: -1 } },
                populate: {
                  path: "createdBy",
                  select: {
                    _id: 1,
                    name: 1,
                    username: 1,
                    email: 1,
                    profilePicture: 1,
                  },
                },
              },
            ],
          },
        ],
      })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: "createdBy",
            select: {
              _id: 1,
              name: 1,
              username: 1,
              email: 1,
              profilePicture: 1,
            },
          },
          {
            path: "comments",
            options: { sort: { createdAt: -1 } },
            populate: {
              path: "createdBy",
              select: {
                _id: 1,
                name: 1,
                username: 1,
                email: 1,
                profilePicture: 1,
              },
            },
          },
        ],
      });
    if (session) {
      const allLikedPosts = await Reacts.find({
        reactor: session?.user.id,
      }).select({
        _id: 1,
        postLink: 1,
      });
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
          posts: JSON.parse(JSON.stringify(posts)),
          liked: JSON.parse(JSON.stringify(allLikedPosts)),
          tweets: JSON.parse(JSON.stringify(tweets)),
        },
      };
    } else {
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
          posts: JSON.parse(JSON.stringify(posts)),
          tweets: JSON.parse(JSON.stringify(tweets)),
        },
      };
    }
  } catch (error) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        error: JSON.parse(JSON.stringify(error.message)),
      },
    };
  }
}
