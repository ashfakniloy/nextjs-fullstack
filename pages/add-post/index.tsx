import Head from "next/head";
import PostForm from "../../components/PostForm";

function AddPostpage() {
  const initialState = {
    title: "",
    category: "",
    description: "",
  };

  return (
    <>
      <Head>
        <title>Add New Post</title>
      </Head>

      <h4 className="text-2xl text-gray-400 font-bold">Add New Post</h4>
      <div className="mt-5">
        <PostForm initialState={initialState} formType="post" />
      </div>
    </>
  );
}

export default AddPostpage;
