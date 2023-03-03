import type { GetServerSideProps } from "next";
import Pagination from "../components/Pagination";
import Post from "../components/Post";
import Search from "../components/Search";
import { prisma } from "../lib/prisma";
import Head from "next/head";

const PER_PAGE = 5;

function Homepage({
  count: postCount,
  posts,
  limitNumber,
}: {
  count: number;
  posts: Post[];
  limitNumber: number;
}) {
  return (
    <div className="">
      <Head>
        <title>NextJS Fullstack Practice</title>
      </Head>

      <Search />

      <h4 className="mt-11 text-2xl text-gray-400 font-bold">All Posts</h4>

      <p className="my-2 text-sm text-gray-400">
        Showing {posts.length} {posts.length > 1 ? "items" : "item"} of{" "}
        {postCount}
      </p>

      <div className="mt-4 mb-8 space-y-5">
        {posts.length ? (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category}
              description={post.description}
              user={post.user}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              likes={post.likes}
              comments={post.comments}
            />
          ))
        ) : (
          <p className="text-xl text-red-500">No post found</p>
        )}
      </div>

      {postCount > (limitNumber || PER_PAGE) && (
        <Pagination postCount={postCount} limit={limitNumber || PER_PAGE} />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page, limit },
}) => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count();

  const response = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limitNumber || PER_PAGE,
    // skip: currentPage && limitNumber && (currentPage - 1) * limitNumber,
    skip: (currentPage - 1) * limitNumber || 0,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
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
      comments: true,
    },
  });

  const posts = JSON.parse(JSON.stringify(response));

  // console.log("posts", posts);

  return {
    props: {
      count,
      posts,
      limitNumber,
    },
  };
};

export default Homepage;
