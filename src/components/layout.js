import NavBar from "./NavBar";

// import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
import Script from "next/script";
// import CookieBannerPrivacity from "./CookieBannerPrivacity";
import Head from "next/head";
// import { baseURL } from '../config'

export default function Layout({ children }) {
  const { push } = useRouter();

  // const userState = useStoreState((state) => state.account.user);
  // const removeUserState = useStoreActions(
  //   (actions) => actions.account.removeUser
  // );
  // const { data: session, status } = useSession();

  return (
    <div className="flex min-h-[100vh] flex-col justify-between relative">
      <Head>
        {/* <meta property="og:title" content={"PageTitles.general"} />
        <meta property="og:description" content={"PageDescription.general"} />
        <meta property="og:image" content="/certus-url.png" /> */}
        {/* <meta property="og:url" content={baseURL} /> */}
        {/* <meta property="og:type" content="website" /> */}
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-BHXEKW72ZK" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-BHXEKW72ZK');
        `}
      </Script>
      <div id="content_wrapper">
        <NavBar />
        <main className="mt-12 md:mt-24">{children}</main>
      </div>
    </div>
  );
}
