import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomeRoutes from "./HomeRoutes";
import SearchAllCard from "./components/SearchAllCard/SearchAllCard";
import Contact from "./Pages/Contact/Contact";
import CreateCollectible from "./Pages/CreateCollectible/CreateCollectible";
import DashBoard from "./Pages/dashboard/DashBoard";
import SingleCollectible from "./Pages/single_collectible/SingleCollectible";
import Profile from "./Pages/profile/Profile";
import OnSale from "./Pages/profile/onsales/OnSale";
import Activity from "./Pages/activity/Activity";
import Created from "./Pages/profile/create/Created";
import Followers from "./Pages/profile/followers/Followers";
import Following from "./Pages/profile/following/Following";
import Likes from "./Pages/profile/likes/Likes";
import Collectibles from "./Pages/profile/Collectible/Collectibles";
import ItemDetails from "./Pages/item_details/ItemDetails";
import Bids from "./Pages/item_details/bids/Bids";
import History from "./Pages/item_details/history/History";
import Info from "./Pages/item_details/info/Info";
import Owners from "./Pages/item_details/owners/Owners";
import CreateCollection from "./Pages/CreateCollection/CreateCollection";
import Support from "./Pages/support/Support";
import EditProfile from "./Pages/edit_profile/EditProfile";
import MyActivity from "./Pages/activity/myactivity/MyActivity";
import AllActivity from "./Pages/activity/allactivity/AllActivity";
import Followingactivity from "./Pages/activity/following/Followingactivity";
import Aboutus from "./Pages/Aboutus/Aboutus";
import NotFoundPage from "./Pages/notfoundPage/NotFoundPage";
import { useEffect } from "react";
import store from "./store";
import { LoadingUser } from "./actions/userAction";
import ProtectRouter from "./components/router/ProtectRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OthersOnSale from "./Pages/otherProfile/othersonsales/OthersOnSale";
import OthersCollectibles from "./Pages/otherProfile/OthersCollectible/OthersCollectibles";
import OthersActivity from "./Pages/otherProfile/Othersactivity/OthersActivity";
import OthersCreated from "./Pages/otherProfile/Otherscreate/OthersCreated";
import OthersFollowers from "./Pages/otherProfile/Othersfollowers/OthersFollowers";
import OthersFollowing from "./Pages/otherProfile/Othersfollowing/OthersFollowing";
import OthersLikes from "./Pages/otherProfile/Otherslikes/OthersLikes";
import OthersProfile from "./Pages/otherProfile/OthersProfile";
import WhitlistCheck from "./components/whiteUserCheck/WhitlistCheck";
import PrivateRouter from "./components/privateRouter/PrivateRouter";
import HotCollectionPage from "./Pages/hotCollectionPage/HotCollectionPage";

function App() {
  useEffect(() => {
    store.dispatch(LoadingUser);
  });

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomeRoutes />
              </Layout>
            }
          />
          <Route
            path="/searchallcard"
            element={
              <Layout>
                <SearchAllCard />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/create_collection"
            element={
              <Layout>
                <CreateCollectible />
              </Layout>
            }
          />
      
          <Route
            path="/createsinglecollection"
            element={
              <Layout>
                <PrivateRouter>
                  <SingleCollectible />
                </PrivateRouter>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <PrivateRouter> <Profile /></PrivateRouter>
              </Layout>
            }
          >
            <Route path="onsale" element={<OnSale />}></Route>
            <Route path="collectibles" element={<Collectibles />}></Route>
            <Route path="activity" element={<Activity />}></Route>
            <Route path="created" element={<Created />}></Route>
            <Route path="followers" element={<Followers />}></Route>
            <Route path="following" element={<Following />}></Route>
            <Route path="likes" element={<Likes />}></Route>
          </Route>
          <Route
            path="/otherprofile"
            element={
              <Layout>
                <OthersProfile />
              </Layout>
            }
          >
            <Route path="onsale/:id" element={<OthersOnSale />}></Route>
            <Route path="collectibles/:id" element={<OthersCollectibles />}></Route>
            <Route path="activity/:id" element={<OthersActivity />}></Route>
            <Route path="created/:id" element={<OthersCreated />}></Route>
            <Route path="followers/:id" element={<OthersFollowers />}></Route>
            <Route path="following/:id" element={<OthersFollowing />}></Route>
            <Route path="likes/:id" element={<OthersLikes />}></Route>
          </Route>
          <Route
            path="/item-1/:id/:token/:collectionId"
            element={
              <Layout>
                <ItemDetails />
              </Layout>
            }
          >
            <Route path="bids" element={<Bids />}></Route>
            <Route path="history" element={<History />}></Route>
            <Route path="info" element={<Info />}></Route>
            <Route path="owners" element={<Owners />}></Route>
          </Route>

          <Route
            path="/create_collection_Page"
            element={
              <Layout>
                <PrivateRouter><WhitlistCheck><CreateCollection /></WhitlistCheck></PrivateRouter>
              </Layout>
            }
          />
          <Route
            path="/help_support"
            element={
              <Layout>
                <Support />
              </Layout>
            }
          />
          <Route
            path="/editprofile"
            element={
              <Layout>
                <EditProfile />
              </Layout>
            }
          />
          <Route
            path="/activity"
            element={
              <Layout>
                <Activity />
              </Layout>
            }
          >
            <Route path="myactivity" element={<MyActivity />}></Route>
            <Route path="allactivity" element={<AllActivity />}></Route>
            <Route path="follower" element={<Followingactivity />}></Route>
          </Route>

          <Route
            path="/about_us"
            element={
              <Layout>
                <Aboutus />
              </Layout>
            }
          />

          <Route
            path="/hotcollection/:id"
            element={
              <Layout>
                <HotCollectionPage />
              </Layout>
            }
          />
          <Route
            path="/pagenotfound"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
