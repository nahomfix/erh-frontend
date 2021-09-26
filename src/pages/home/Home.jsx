import UserFeed from "../../components/feed/UserFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import MainLayout from "../../layouts/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <div style={{ display: "flex" }}>
                <UserFeed />
                <Rightbar />
            </div>
        </MainLayout>
    );
}
