import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline"
import styles from "../src/styles/Post.module.css"

export default function Post({imageIncluded}) {
    return (
        <div className={styles.post}>
            <img className={styles.profilePic} src="/user.jpeg"/>
            <div className={styles.postContents}>
                <div className={styles.headerContents}>
                    <h4>Mohammed Mazhar Ali Shawon</h4>
                    <p>@mazhar_ali_shawon</p>
                    <div className={styles.dot}></div>
                    <p>7h</p>
                </div>
                <div className={styles.postText}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                </div>
                {imageIncluded && <img className={styles.postPic} src="/user.jpeg"/>}
                <div className={styles.infos}>
                    <div className={styles.comments}>
                      <ChatBubbleOvalLeftEllipsisIcon className={styles.icon}/>
                      <p>20</p>
                    </div>
                    <div className={styles.reactions}>
                      <HeartIcon className={styles.icon}/>
                      <p>20</p>
                    </div>
                </div>
            </div>
        </div>
    )
}