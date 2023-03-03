import type { GetServerSideProps } from "next";
import Post from "../../../components/Post";
import { prisma } from "../../../lib/prisma";

function UserPage({ userInfo }: { userInfo: User }) {
  return (
    <>
      {userInfo && (
        <div>
          <div className="">
            <p className="text-xl text-gray-400">User Details</p>
            <div className="mt-3 text-sm space-y-2">
              <p className="">Username: {userInfo.username}</p>
              <p className="">
                Joined at:{" "}
                {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-xl text-gray-400">User&apos;s Posts</p>
            <div className="mt-5 space-y-5">
              {userInfo.posts?.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  category={post.category}
                  description={post.description}
                  // user={post.user}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                  likes={post.likes}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { userId },
}) => {
  const response = await prisma.user.findUnique({
    where: {
      id: userId.toString(),
    },
    select: {
      id: true,
      username: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },

        include: {
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
        },
      },
      createdAt: true,
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
      userInfo: data,
    },
  };
};

export default UserPage;
