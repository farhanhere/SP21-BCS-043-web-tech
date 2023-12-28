import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Pagination from "../components/Pagination";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/`, {
        params: { page: page, search: search },
      });
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, page]);

  const handlePagination = (newPage) => {
    const newPath = `/?page=${newPage}&search=${search}`;
    navigate(newPath);
  };

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      {user && <Pagination handlePagination={handlePagination} currentPage={page} />}
      <Footer />
    </>
  );
};

export default Home;
