import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import Log from "../components/Log";

const inter = Inter({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  const pathname = usePathname();

  return (
    <div className={inter.className}>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <SessionProvider session={pageProps.session}>
        {pathname !== "/signup" && pathname !== "/signin" && <Navbar />}
        <Component {...pageProps} />
      </SessionProvider>

      <Log />
      <Analytics />
    </div>
  );
}

export default MyApp;
