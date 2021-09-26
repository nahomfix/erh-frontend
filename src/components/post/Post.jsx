import "./post.css";
import { Mail, MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

export default function Post({ post }) {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={
                                Users.filter((u) => u.id === post?.userId)[0]
                                    .profilePicture
                            }
                            alt=""
                        />
                        <span className="postUsername">
                            {
                                Users.filter((u) => u.id === post?.userId)[0]
                                    .username
                            }
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    {/* <div
                        className="postTopRight"
                        id="UncontrolledPopover"
                        style={{ cursor: "pointer" }}
                    >
                        <MoreVert />
                    </div>
                    <UncontrolledPopover
                        placement="bottom"
                        target="UncontrolledPopover"
                    >
                        <PopoverBody>
                            <Mail /> bets@mail.com
                        </PopoverBody>
                    </UncontrolledPopover> */}
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src="assets/like.png"
                            onClick={likeHandler}
                            alt=""
                        />

                        <span className="postLikeCounter">
                            {like} people like it
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
