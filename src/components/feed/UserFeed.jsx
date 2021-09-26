import Post from "../post/Post";
import "./feed.css";
import { Posts } from "../../dummyData";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Feed() {
    const history = useHistory();
    return (
        <div className="feed">
            <div className="feedWrapper">
                {/* <Share /> */}
                <Button onClick={() => history.push("/upload")}>
                    + Upload
                </Button>
                {Posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    );
}
