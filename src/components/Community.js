import { CiImageOn } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";
import CompanyLayout from "./CompanyLayout";
function Community() {
  const [cookies] = useCookies(["freelancer", "company"]);
  const [user, setuser] = useState();
  const [posts, setPosts] = useState([]);
  const [seeComments, setSeeComments] = useState(new Set());
  const [postContent, setPostContent] = useState("");
  const [postMedia, setPostMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      if (cookies.company || cookies.freelancer) {
        const apiUrl = cookies.freelancer
          ? "http://localhost:3000/api/v1/Freelancer/details"
          : "http://localhost:3000/api/v1/Company/details";
    
        try {
          // Fetch user details
          const userResponse = await fetch(apiUrl, { method: "GET", credentials: "include", redirect: "follow" });
          const userResult = await userResponse.json();
          if (userResult.success) {
            const currentUser = userResult.freelancer || userResult.company;
            //console.log(currentUser)
            setuser(currentUser);
            fetchPosts(currentUser)
    
            // Fetch posts after user is set
            // const postResponse = await fetch("http://localhost:3000/api/v1/community/getPosts");
            // const postData = await postResponse.json();
            // if (postData.success) {
            //   const reversedPosts = postData.posts.reverse();
            //   setPosts(reversedPosts);
    
            //   // Initialize likes state based on current user's likes
            //   const newLikes = {};
            //   reversedPosts.forEach(post => {
            //     newLikes[post._id] = post.likes.some(like => String(like.user) === String(currentUser._id));
            //   });
            //   setLikes(newLikes);
            //}
          }
        } catch (error) {
          console.error("Error fetching user or posts:", error);
        }
      }
    };
    
    
    fetchUserAndPosts();
  }, [cookies.company, cookies.freelancer]);
  
  const fetchPosts = async (currentUser) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/community/getPosts");
      const data = await response.json();
      if (data.success) {
        const reversedPosts = data.posts.reverse();
        console.log("Hello")
       // console.log(reversedPosts)
        setPosts(reversedPosts);
  
        const newLikes = {};
        reversedPosts.forEach(post => {
          console.log("post")
          console.log(post)
          newLikes[post._id] = post.likes.some(like =>
            {
              
              return String(like.user._id) === String(currentUser._id)

            } 
            );
        });
        console.log(newLikes)
        setLikes(newLikes);
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  


  const handlePostCreation = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/community/createPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: postContent,
            media: postMedia,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        // Refresh posts after successful post creation
        fetchPosts();
        // Clear post content and media
        setPostContent("");
        setPostMedia([]);
        setSelectedMedia([]);
      } else {
        console.error("Failed to create post:", data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    // Sequentially upload files
    for (const file of files) {
      const formData = new FormData();
      formData.append("filename", file);

      // Make an API call to upload each file
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/uploadFile",
          {
            method: "POST",
            body: formData,
            credentials: "include", // if your API requires credentials
          }
        );

        const result = await response.json();
        if (result.success) {
          console.log("File uploaded:", result.url);
          // Update the postMedia state with the new image URL
          setPostMedia((oldMedia) => [...oldMedia, result.url]);
          setSelectedMedia((oldMedia) => [
            ...oldMedia,
            {
              url: result.url,
              type: file.type.startsWith("image") ? "image" : "video",
            },
          ]);
        } else {
          console.error("Failed to upload file:", result.message);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    e.target.value = "";
  };

  const toggleCommentsVisibility = (postId) => {
    setSeeComments((currentComments) => {
      const newComments = new Set(currentComments);
      if (newComments.has(postId)) {
        newComments.delete(postId);
      } else {
        newComments.add(postId);
      }
      return newComments;
    });
  };

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        " year" +
        (Math.floor(interval) > 1 ? "s" : "") +
        " ago"
      );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        " month" +
        (Math.floor(interval) > 1 ? "s" : "") +
        " ago"
      );
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        " day" +
        (Math.floor(interval) > 1 ? "s" : "") +
        " ago"
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        " hour" +
        (Math.floor(interval) > 1 ? "s" : "") +
        " ago"
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        " minute" +
        (Math.floor(interval) > 1 ? "s" : "") +
        " ago"
      );
    }
    return Math.floor(seconds) + " second" + (seconds > 1 ? "s" : "") + " ago";
  }

  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Return an empty string if the input is undefined or null
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const submitComment = async (postId) => {
    if (!comments[postId]) return; // Don't submit if the comment is empty

    const url = `http://localhost:3000/api/v1/community/${postId}/addComment`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Assuming you need to handle sessions
      body: JSON.stringify({ content: comments[postId] }),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.success) {
        // Clear the input after successful submission
        setComments({ ...comments, [postId]: "" });
        // Optionally refresh posts or append new comment locally
        console.log("Comment added:", data.post);
        fetchPosts(); // if you want to re-fetch all posts
      } else {
        console.error("Failed to add comment:", data.message);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const likePost = async (postId) => {
    const url = `http://localhost:3000/api/v1/community/${postId}/likePost`;
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (data.success) {
            // Update local state to reflect the new like
            setLikes({ ...likes, [postId]: true });
            fetchPosts(user); // Optionally refresh posts or update locally
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

const unlikePost = async (postId) => {
    const url = `http://localhost:3000/api/v1/community/${postId}/unlikePost`;
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (data.success) {
            // Update local state to reflect the unlike
            setLikes({ ...likes, [postId]: false });
            fetchPosts(user); // Optionally refresh posts or update locally
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error unliking post:', error);
    }
};


  return (
    <>
      <CompanyLayout>
        <div
          className="px-5 "
          style={{ backgroundColor: "#E8E9EB", minHeight: "100vh" }}
        >
          <div
            className="text-center  py-4 fw-bold"
            style={{ fontSize: "35px", color: "#6319b8" }}
          >
            Community Form
          </div>
          <div className="container-fluid py-3 ">
            <div className="row shadow-sm ">
              <div className="col-md-12 border rounded bg-white p-3">
                <div className="d-flex align-items-center  mb-2 mb-3">
                  <img
                    src={user?.pfp}
                    alt="Profile picture"
                    className="rounded-circle me-2"
                    width="48"
                    height="48"
                  />
                  <input
                    className="px-2 py-3  shadow-none form-control rounded "
                    type="text"
                    placeholder="Write a post..."
                    style={{ border: "1px solid grey" }}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
                <div
                  className=" "
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("media-input").click()}
                >
                  <div>
                    <p
                      type="button"
                      className="border-0 btn-transparent me-2 fw-semibold"
                    >
                      <CiImageOn
                        className="mx-1"
                        style={{ fontSize: "20px" }}
                      />
                      Photo
                    </p>
                  </div>
                  <div>
                    <p
                      type="button"
                      className="border-0 btn-transparent me-2 flex gap-1 fw-semibold"
                    >
                      <CiVideoOn
                        className="mx-1"
                        style={{ fontSize: "20px" }}
                      />
                      Video
                    </p>
                  </div>
                  <input
                    id="media-input"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row", // Change direction to row to align items side by side
                    flexWrap: "wrap", // Allows items to wrap to the next line if the space is filled
                    alignItems: "center",
                    justifyContent: "center", // Centers the items on the line
                    gap: "10px", // Adds space between the items
                  }}
                >
                  {selectedMedia.map((media, index) => {
                    return media.type === "image" ? (
                      <img
                        key={index}
                        src={media.url}
                        alt={`Selected ${index}`}
                        style={{
                          width: "150px",
                          height: "auto",
                          borderRadius: "0px",
                        }} // Smaller width and auto height to maintain aspect ratio
                      />
                    ) : (
                      <video
                        key={index}
                        controls
                        src={media.url}
                        style={{ width: "150px", height: "auto" }} // Same styling for videos
                      />
                    );
                  })}
                </div>
                <div className="" style={{ marginLeft: "90%" }}>
                  <button
                    type="button"
                    className="btna text-white rounded py-2 px-4 "
                    onClick={handlePostCreation}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          {posts.map((post) => (
            <div key={post._id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={post.author?.pfp}
                    alt="Profile picture"
                    className="rounded-circle me-2"
                    width="48"
                    height="48"
                    style={{ borderRadius: "0px" }}
                  />
                  <div>
                    <span className="fw-bold">
                      {post.authorType === "Freelancer"
                        ? `${capitalizeFirstLetter(
                            post.author.firstname || ""
                          )} ${capitalizeFirstLetter(
                            post.author.lastname || ""
                          )}`
                        : post.author.companyname}
                    </span>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      {timeSince(post.timestamp)}
                      {/* Formatting the date to a readable string */}
                    </div>
                  </div>
                </div>
                <p className="card-text">{post.content}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {post.media.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        borderRadius: "0",
                        width: "30%",
                        marginBottom: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <img
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="img-fluid"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted" style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                    <div
                    className="like-container"
                    onClick={() => likes[post._id] ? unlikePost(post._id) : likePost(post._id)}
                    style={{
                      cursor: "pointer",
                      fontWeight: likes[post._id] ? "bold" : "normal",
                      display: 'flex',
        alignItems: 'center'
                    }}
                  >
                    
                    <AiOutlineLike
                      className="mx-1"
                      style={{
                        fontSize: "21px",
                        marginTop: "-3px",
                        
                      }}
                    />
                    {post.likes.length} {post.likes.length < 2 ? "Like" : "Likes"}
                    </div>
                    <span
                      style={{ marginLeft: "8px" }}
                      onClick={() => toggleCommentsVisibility(post._id)}
                    >
                      <MdOutlineComment
                        className="mx-1"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                      {post.comments.length} Comments:
                    </span>
                  </div>
                </div>
                {/* Render comments */}
                <div
                  className={`mt-2 px-3 ${
                    seeComments.has(post._id) ? "d-block" : "d-none"
                  }`}
                >
                  <div className="mb-3">
                    <div className="mt-3 ">
                      <div className="flex justify-content-between">
                        <div className="d-flex align-items-center  mb-2 mb-3">
                          <img
                            src={user?.pfp}
                            alt="Profile picture"
                            className="rounded-circle me-2"
                            width="48"
                            height="48"
                            style={{ borderRadius: "0px" }}
                          />
                          <input
                            className="p-2  shadow-none form-control rounded-4 "
                            type="text"
                            placeholder="Write a comment..."
                            value={comments[post._id] || ""}
                            onChange={(e) =>
                              setComments({
                                ...comments,
                                [post._id]: e.target.value,
                              })
                            }
                            style={{
                              flex: 1, // Takes the remaining space
                              border: "1px solid #ccc",
                              borderRadius: "20px",
                              padding: "10px 15px", // Comfortable padding
                              marginRight: "8px", // Margin to separate from the button
                            }}
                          />
                          <button
                            type="button"
                            className="btncomment"
                            style={{
                              padding: "0 15px", // Smaller padding for the button
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => submitComment(post._id)}
                          >
                            <IoSend
                              style={{ color: "gray", fontSize: "20px" }}
                            />
                          </button>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="mt-2">
                            <div className="mb-2">
                              <span
                                className="fw-bold"
                                style={{ fontSize: "20px" }}
                              >
                                Comments:
                              </span>
                            </div>
                            {post.comments.map((comment) => (
                              <div
                                key={comment._id}
                                className="mb-2 d-flex align-items-center"
                              >
                                <img
                                  src={comment.commenter?.pfp}
                                  alt="Profile picture"
                                  className="rounded-circle me-2"
                                  width="32"
                                  height="32"
                                  style={{ borderRadius: "0px" }}
                                />
                                <div>
                                  <p className="fw-bold mb-0">
                                    {comment.commenterType === "Freelancer"
                                      ? `${capitalizeFirstLetter(
                                          comment.commenter.firstname || ""
                                        )} ${capitalizeFirstLetter(
                                          comment.commenter.lastname || ""
                                        )}`
                                      : comment.commenter.companyname}
                                  </p>
                                  <p className="text-muted mb-0">
                                    {comment.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CompanyLayout>
    </>
  );
}
export default Community;
