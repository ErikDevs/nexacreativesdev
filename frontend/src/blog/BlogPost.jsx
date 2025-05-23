import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import SanityBlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";
import { client } from "../client";
import Footer from "../container/Footer";
import Comment from "../container/Comment";
import "../blog/blog.css";
import Header from "../container/Header";
import { ThemeContext } from "../components/ThemeContextProvider";
import { TimerIcon } from "lucide-react";

// serializers

const serializers = {
  types: {
    block: ({ node, children }) => {
      const { style = "normal" } = node;

      switch (style) {
        case "h1":
          return (
            <h1 className="text-3xl font-extrabold mt-10 mb-6">{children}</h1>
          );
        case "h2":
          return <h2 className="text-2xl font-bold mt-8 mb-5">{children}</h2>;
        case "h3":
          return (
            <h3 className="text-xl font-semibold mt-6 mb-4">{children}</h3>
          );
        case "blockquote":
          return (
            <blockquote className="border-l-4 border-gray-400 bg-gray-100 p-5 italic rounded-md mb-6">
              {children}
            </blockquote>
          );
        case "normal":
        case "p":
          return <p className="leading-relaxed mb-5">{children}</p>;
        default:
          return <p className="leading-relaxed mb-5">{children}</p>;
      }
    },

    list: ({ type, children }) => {
      if (type === "bullet") {
        return <ul className="list-disc pl-6 space-y-2 mb-6">{children}</ul>;
      }
      if (type === "number") {
        return <ol className="list-decimal pl-6 space-y-2 mb-6">{children}</ol>;
      }
      return <ul className="list-disc pl-6 space-y-2 mb-6">{children}</ul>;
    },

    listItem: ({ children }) => <li className="ml-2">{children}</li>,

    image: ({ node }) => {
      const { asset, caption } = node;
      if (!asset) return null;

      return (
        <figure className="flex flex-col items-center text-center my-8">
          <img
            src={asset.url}
            alt={caption}
            className="w-full h-[20rem] shadow-md object-cover"
          />
          {caption && (
            <figcaption className="text-sm text-gray-500 mt-2 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const BlogPost = () => {
  const { customId } = useParams();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        customId,
        body[]{
          ...,
          asset->{
            _id,
            url
          }
        },
        publishedAt,
        "imageUrl": image.asset->url,
      }`;

      const data = await client.fetch(query);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { theme } = useContext(ThemeContext);
  const SinglePost = posts?.filter((current) => current.customId === customId);

  if (!SinglePost)
    return (
      <section className="w-screen h-screen flex justify-center items-center">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    );

  return (
    <body className="bg-slate-100">
      <Header />

      <div className="w-full  relative justify-center  flex">
        <div className="flex flex-col md:flex-row max-w-7xl gap-x-2">
          {SinglePost.map((current) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0, ease: "linear" }}
              className={`${
                theme === "dark" ? "bg-gray-900" : "bg-slate-50"
              } px-4 max-w-4xl`}
              key={current.customId}
            >
              <div className="w-full overflow-clip">
                <h1 className="text-3xl md:text-4xl font-bold my-4">
                  {current.title}
                </h1>
                <p className="my-4">
                  <span className="text-slate-400 text-sm">
                    {" "}
                    By
                    {current.postedBy
                      ? current.postedBy
                      : " Nexa Creative Solutions"}{" "}
                  </span>
                  {moment(current.publishedAt).format("MMMM, YYYY")}
                </p>

                <div className="h-[14rem] md:h-[24rem] w-full">
                  <img
                    loading="lazy"
                    className="object-cover w-full h-full"
                    src={current.imageUrl}
                    alt={current.title}
                  />
                </div>
              </div>

              <SanityBlockContent
                blocks={current.body}
                serializers={serializers}
              />
              <Comment postId={current.customId} />
            </motion.div>
          ))}

          <div
            className={`${
              theme === "dark" ? "bg-gray-900" : "bg-slate-50"
            } flex flex-col h-fit md:sticky max-w-full inset-0 md:max-w-md  p-3`}
          >
            <h1 className="text-2xl font-bold my-4">Recent Blogs</h1>
            <hr
              className={`${
                theme === "dark" ? "border-white" : "border-black"
              } w-full`}
            />
            {posts.map((post) => (
              <div key={post.title}>
                <Link
                  onClick={handleScrollToTop}
                  className="flex justify-between gap-x-4"
                  to={`/blog/BlogPost/${post.customId}`}
                >
                  <div className="w-20 h-12 flex my-4 overflow-hidden">
                    <img
                      loading="lazy"
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <div className="flex flex-col justify-center w-full">
                    <h2 className="text-sm  hover:text-green-400 transition-colors duration-300 ease-in-out font-semibold">
                      {post.title}
                    </h2>

                    <p className="text-xs flex items-center gap-2 text-slate-500">
                      <TimerIcon size={12} />{" "}
                      {moment(post.publishedAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default BlogPost;
