import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-800 text-gray-100 lg:max-w-[1000px] mx-3 lg:mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
