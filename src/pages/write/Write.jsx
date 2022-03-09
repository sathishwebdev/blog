import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Editor } from "@tinymce/tinymce-react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const { user } = useContext(Context);

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {
       setImgSrc(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    console.log(newPost);
    if (imgSrc) {
      newPost.photo = imgSrc
    }
    try {
    console.log(newPost)
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}posts`, newPost);
      window.location.replace(`/post/` + res.data._id);
    } catch (err) {
      console.log("error while posting")
    }
  };
  return (
    <div className="write">
      {imgSrc && (
        <img className="writeImg" src={imgSrc} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) =>{
                getBase64(e.target.files[0])
              }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div style={{width:"98 %", margin:"1%"}}>
          <Editor
            apiKey= {process.env.REACT_APP_EDITOR_KEY}
            value={desc.content}
            init={{
              height: 600,
              menubar: false
            }}
            onEditorChange={(e)=>{
              setDesc(e)}}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
