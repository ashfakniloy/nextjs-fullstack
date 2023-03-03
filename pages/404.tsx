import Head from "next/head";

function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>

      <div className="text-center mt-10">
        <p className="text-2xl font-bold text-red-700">Page not found</p>
      </div>
    </>
  );
}

export default NotFoundPage;
