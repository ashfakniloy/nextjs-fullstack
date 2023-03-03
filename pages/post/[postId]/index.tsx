import { getServerSession, Session } from "next-auth";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { prisma } from "../../../lib/prisma";
import Back from "../../../components/Back";
import LikeButton from "../../../components/LikeButton";
import CommentsForm from "../../../components/CommentsForm";
import DeleteComment from "../../../components/DeleteComment";
import { authOptions } from "../../api/auth/[...nextauth]";

function SinglePostpage({
  post,
  session,
  postId,
}: {
  post: Post;
  session: Session;
  postId: string;
}) {
  const myId = session?.user.id;

  return (
    <div className="">
      <Back />
      <h4 className="text-2xl text-gray-200 font-bold">{post.title}</h4>
      <p className="">
        Author: {post.user?.username}
        {myId !== post.user?.id ? (
          <span className="ml-7 text-xs text-gray-300 hover:text-gray-200">
            <Link href={`/user/${post.user?.id}`}>View profile</Link>
          </span>
        ) : (
          <span className="ml-7 text-xs text-gray-300">*My Post</span>
        )}
      </p>

      <div className="mt-3 text-sm text-gray-400 space-y-2">
        <p className="">Category: {post?.category}</p>
        <p className="">
          Created At:{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <p className="mt-7 text-gray-300">{post.description}</p>
      <div className="mt-5 flex items-center gap-10">
        <LikeButton postId={postId} likes={post.likes} />
        {post.comments?.length ? (
          <div className="text-sm text-gray-300">
            {post.comments.length > 1 ? (
              <span>{post.comments.length} Comments</span>
            ) : (
              <span>{post.comments.length} Comment</span>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mt-3">
        {session ? (
          <CommentsForm postId={postId} />
        ) : (
          <Link href="/signin" className="text-blue-400">
            Log in to comment
          </Link>
        )}
        <div className="mt-4 w-full max-w-[500px]">
          <p className="">
            {post.comments?.length ? "Comments" : "No comments yet"}
          </p>
          <div className="mt-3 space-y-4 text-sm">
            {post.comments?.map((comment, i) => (
              <div key={i}>
                <Link
                  href={`/user/${comment.userId}`}
                  className={`font-bold ${
                    comment.userId === myId
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-gray-300"
                  } `}
                >
                  {comment.user.username}
                </Link>

                <p className="mt-1">{comment.comment}</p>
                <div className="mt-1 flex items-center gap-7">
                  <p className=" text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  {(comment.userId === myId || myId === post.user?.id) && (
                    <DeleteComment id={comment.id} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // console.log("session", session);

  const postId = context.params.postId.toString();

  const response = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          // email: true,
          posts: true,
        },
      },
      likes: {
        include: {
          user: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(response));

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data,
      session,
      postId,
    },
  };
};

export default SinglePostpage;
