import axios from "axios";
import React, { useState, useEffect } from "react";


const CodeCompile = ({generatedCode , nums}) => {
  const baseURL = "http://localhost:4000/runCode";
  console.log(JSON.stringify(generatedCode) , nums)

  const [post, setPost] = useState({ title: "", body: {} });
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

//   useEffect(() => {
//     axios
//       .post(`${baseURL}/1`)
//       .then((response) => {
//         setPost(response.data);
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   }, []);

  async function createPost() {
   const response = await axios
  .post(baseURL, {
  clientId: "6c4910cf0da72930ff0d6ab8e3b8b710",
  // clientId:process.env.YOUR_CLIENT_ID,
  clientSecret: "b3f34d0f1f456b84e0437e9a4c2d48cd3cfd2945af497caed8632c7d942ae5ab",
  //clientSecret: process.env.YOUR_CLIENT_SECRET,
    script: `${generatedCode}`,
    language: "cpp17",
    versionIndex: "1",
    stdin:`${nums.join(" ")}`
  })
  console.log(response.data)
  setPost(response.data.data)
  setClicked(true);
//   .then((response) => {
//     setPost(response.data);
//   })
//   .catch((error) => {
//     setError(error);
//   });

  }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
console.log(`${process.env.YOUR_CLIENT_ID}`)

  return (
    <div>
      <button className={`p-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:border-2 hover:border-blue-300 ${clicked ? 'absolute top-0 left-0' : ''}`}
      onClick={createPost}>
      <i class="fi fi-sr-square-terminal mx-2 m-auto h-15 w-15 hover:border-2 hover:border-blue-300"></i>
      Compile Code
      </button>

      <div className="flex justify-start items-start overflow-y-auto">
      <h1 className="p-1">{post.title}</h1>
      <pre className="p-1">{post.output}</pre>
      </div>
    </div>
  );
};

export default CodeCompile;
