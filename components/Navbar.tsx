import Link from "next/link";
import Logout from "./Logout";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  // console.log("session", session?.user);

  return (
    <div className="mb-5 flex flex-col lg:flex-row justify-between items-center py-4 border-b border-gray-600">
      <div className="text-3xl font-bold tracking-widest">
        <Link href="/">logo</Link>
        {/* <DynamicLink href="/">logo</DynamicLink> */}
      </div>

      {session?.user ? (
        <div className="mt-3 lg:mt-0 flex flex-col lg:flex-row items-center gap-2 lg:gap-6 text-sm font-medium">
          <p className="text-gray-400 lg:pr-8">User: {session.user.username}</p>
          {/* <Navigations /> */}

          <div className="space-x-6">
            <Link href="/">Home</Link>
            {/* <DynamicLink href="/">Home</DynamicLink> */}
            <Link href="/add-post">Add Post</Link>
            <Link href="/dashboard">Dashboard</Link>
            {/* <DynamicLink href="/dashboard">Dashboard</DynamicLink> */}
            <Logout />
          </div>
        </div>
      ) : (
        <div className="mt-5 lg:mt-0 text-sm font-medium space-x-7">
          <Link href="/signup">
            <button className="bg-green-900 px-2 py-1.5 rounded">Signup</button>
          </Link>
          <Link href="/signin">
            <button className="bg-blue-900 px-2 py-1.5 rounded">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
