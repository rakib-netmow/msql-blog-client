import { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

function App() {
  const [post, setPost] = useState([]);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getPost() {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        console.log(response?.data);
        setPost(response?.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPost();
  }, []);

  const handleSubmit = async () => {
    const obj = { title, value };
    console.log(obj);
    const result = await axios.post("http://localhost:5000/blog", obj);
    console.log(result);
  };

  return (
    <div
      className="App"
      style={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h4>Title</h4>
      <input
        name="Title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        style={{ height: "300px", width: "700px" }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <button style={{ marginTop: "50px" }} onClick={handleSubmit}>
        Submit
      </button>
      <div style={{ marginTop: "60px" }}>
        {post?.map((p, i) => (
          <div key={i}>
            <h2>{p?.TITLE}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(p?.POST),
              }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
