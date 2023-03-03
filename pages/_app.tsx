import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
import Log from "../components/Log";

const inter = Inter({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  const pathname = usePathname();

  return (
    <div className={inter.className}>
      <NextNProgress color="#F40009" options={{ showSpinner: false }} />
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <SessionProvider session={pageProps.session}>
        {pathname !== "/signup" && pathname !== "/signin" && <Navbar />}
        <div className="mb-5">
          <Component {...pageProps} />
        </div>
      </SessionProvider>

      <Log />
      <Analytics />
    </div>
  );
}

export default MyApp;
