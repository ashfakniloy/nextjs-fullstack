import type { GetServerSideProps, Metadata } from "next";
import { notFound } from "next/navigation";
import PostForm from "../../../components/PostForm";
import { prisma } from "../../../lib/prisma";

function EditPostPage({ data: post, postId }: { data: Post; postId: string }) {
  // if (!post) {
  //   notFound();
  // }

  const initialState = {
    title: post?.title,
    category: post?.category,
    description: post?.description,
  };

  return (
    <div>
      <h4 className="text-2xl text-gray-400 font-bold">Edit {post?.title}</h4>
      <div className="mt-5">
        <PostForm initialState={initialState} formType="edit" postId={postId} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { postId },
}) => {
  // console.log("postId", postId);

  const response = await prisma.post.findUnique({
    where: {
      id: postId.toString(),
    },
  });

  const data = JSON.parse(JSON.stringify(response));

  console.log("data", data);

  return {
    props: {
      data,
      postId,
    },
  };
};

export default EditPostPage;
