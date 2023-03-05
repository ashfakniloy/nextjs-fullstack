import Link from "next/link";
import type { GetServerSideProps } from "next";
import DeletePost from "../../components/DeletePost";
import { prisma } from "../../lib/prisma";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";

type PostInfo = {
  id: string;
  title: string;
};

function Dashboardpage({
  postsInfo,
  session,
}: {
  postsInfo: PostInfo[];
  session: Session;
}) {
  return (
    <>
      <Head>
        <title>{`${session?.user.username}'s Dashboard`}</title>
      </Head>

      <h4 className="text-2xl text-gray-400 font-bold">User Dashboard</h4>
      <div className="mt-5">
        <p className="text-xl text-gray-400">User Details</p>
        <div className="mt-3 text-sm space-y-2">
          <p className="">User name: {session?.user.username}</p>
          <p className="">User Email: {session?.user.email}</p>
        </div>
      </div>

      <div className="mt-7">
        <p className="text-xl text-gray-400">User&apos;s Posts</p>
        <div className="mt-5 space-y-5">
          {postsInfo?.map((postInfo) => (
            <div
              key={postInfo.id}
              className="bg-gray-900 p-3 lg:p-5 flex justify-between items-center gap-3 lg:gap-[100px] rounded-lg"
            >
              <div className="">
                <p className="text-lg font-medium text-gray-300">
                  {postInfo.title}
                </p>
              </div>

              <div className="flex flex-col items-center lg:flex-row gap-2 lg:gap-5">
                <Link href={`/post/${postInfo.id}`}>
                  <button className="text-xs font-bold bg-cyan-900 px-3 py-1.5 rounded  uppercase">
                    Details
                  </button>
                </Link>
                <Link href={`/edit-post/${postInfo.id}`}>
                  <button className="text-xs font-bold bg-blue-900 px-3 py-1.5 rounded  uppercase">
                    Edit
                  </button>
                </Link>
                <DeletePost postId={postInfo.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const id = session.user.id;

  // console.log("Server session", session);

  const response = await prisma.post.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const data = JSON.parse(JSON.stringify(response));

  return {
    props: {
      postsInfo: data,
      session,
    },
  };
};

export default Dashboardpage;
