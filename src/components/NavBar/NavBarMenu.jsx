import { Fragment, useState, useEffect } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useStoreState } from "easy-peasy";
import { Disclosure } from "@headlessui/react";

import { LANGUAGES, ROUTES } from "../../utils/constants";
import ArrowRight from "../../assets/nav-bar/arrow-right.svg";
import ArrowDown from "../../assets/nav-bar/arrow-down-mobile.svg";
import User from "../../assets/nav-bar/user.svg";
// import NavBarHelp from "./NavBarHelp";
import { NavBarUser } from "./NavBarUser";
import { signOut } from "next-auth/react";
import useClearStore from "../../hooks/pages/useClearStore";

export default function NavBarMenu({
  closeMenu,
  isOpen,
  navigation,
  resultLinks,
  accountLinks,
}) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("");
  const { locale, push } = useRouter();
  const userState = useState([{}]); //useStoreState((state) => state.account.user);
  // const { clearStore } = useClearStore(userState);

  const ICONS = {
    [LANGUAGES.SPANISH]: "/flag_mx.svg",
    [LANGUAGES.ENGLISH]: "/flag_us.svg",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // if (userState.length > 0) {
    //   setUserName(userState[0].name[0] + userState[0].lastName[0]);
    // }
  }, [userState]);

  const handleLangButton = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  const goToAuthentication = async (path, isLogout) => {
    if (isLogout) {
      if (path === ROUTES.LOGOUT.PATH) await signOut({ redirect: false });
      localStorage.clear();
      sessionStorage.clear();
      clearStore();
      push(ROUTES.HOME.PATH);
    } else {
      push(path);
    }
    closeMenu();
  };

  return (
    <Disclosure.Panel className="md:hidden" static>
      <div
        className={`fixed w-full border-t border-opacity-20 border-certus-blue-60 bottom-0 top-12 bg-white text-certus-neutro-60 z-50 pt-0 transition-all ease-in-out duration-500 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        {navigation.map((item) => (
          <Fragment key={item.name}>
            <Link href={item.href} locale={locale} legacyBehavior>
              <Disclosure.Button
                as="a"
                target={item.target}
                onClick={() => closeMenu()}
                className={`flex px-7 py-4 rounded-md text-base font-semibold hover:cursor-pointer ${
                  item.current ? "text-certus-blue" : "hover:text-certus-blue"
                }`}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
                {/* <ArrowRight className="w-4 h-3 m-auto mr-0" /> */}
                <Image
                  src={ArrowRight}
                  width={50}
                  height={50}
                  className="w-4 h-3 m-auto mr-0"
                  alt="arrow"
                />
              </Disclosure.Button>
            </Link>
            <hr />
          </Fragment>
        ))}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="a"
                className="flex px-7 py-4 text-base font-semibold cursor-pointer hover:text-certus-blue"
              >
                <span className="">{"Nav.results"}</span>
                {/* <ArrowDown
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } w-6 h-4 m-auto mr-0`}
                /> */}

                <Image
                  src={ArrowDown}
                  width={50}
                  height={50}
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } w-6 h-4 m-auto mr-0`}
                  alt="arrow"
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-certus-neutro-10 text-sm text-certus-neutro-60">
                {resultLinks.map((item) => (
                  <Fragment key={item.name}>
                    <Link href={item.href} locale={locale} legacyBehavior>
                      <Disclosure.Button
                        as="a"
                        target="_self"
                        onClick={() => closeMenu()}
                        className="hover:text-certus-blue pl-7 py-2 text-base font-medium flex"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                    <hr />
                  </Fragment>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <hr />
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="a"
                className="flex px-6 py-4 text-base font-semibold cursor-pointer hover:text-certus-blue"
              >
                <Image
                  src={User}
                  width={50}
                  height={50}
                  className="w-7 h-7 mr-1"
                  alt="arrow"
                />
                {mounted && userState && userState.length > 0 ? (
                  <div className="flex justify-between w-full">
                    <div className="flex">
                      <NavBarUser name={userName} />
                      <span className="mt-1">{"Nav.account"}</span>
                    </div>
                    {/* <ArrowDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } w-6 h-4 mr-1 mt-2`}
                    /> */}
                    <Image
                      src={ArrowDown}
                      width={50}
                      height={50}
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } w-6 h-4 mr-1 mt-2`}
                      alt="arrow"
                    />
                  </div>
                ) : (
                  <button
                    className="flex"
                    onClick={() => goToAuthentication(ROUTES.LOGIN.PATH, false)}
                  >
                    {/* <User className="w-7 h-7 mr-1" /> */}
                    <Image
                      src={User}
                      width={50}
                      height={50}
                      className="w-7 h-7 mr-1"
                      alt="arrow"
                    />
                    <span className="mt-1">{"Nav.account"}</span>
                  </button>
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="bg-certus-neutro-10 text-sm text-certus-neutro-60">
                {userState.length > 0 && (
                  <>
                    {accountLinks.map((item) => (
                      <Fragment key={item.name}>
                        <Link href={item.href} locale={locale} legacyBehavior>
                          <Disclosure.Button
                            as="a"
                            target="_self"
                            onClick={() => closeMenu()}
                            className={`flex pl-7 py-2 text-base font-medium ${
                              item.current
                                ? "text-certus-blue"
                                : "hover:text-certus-blue"
                            }`}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                        <hr />
                      </Fragment>
                    ))}
                    <button
                      className="pl-7 py-2 text-base font-medium flex hover:text-certus-blue"
                      onClick={() =>
                        goToAuthentication(ROUTES.LOGOUT.PATH, true)
                      }
                    >
                      {"Nav.logout"}
                    </button>
                  </>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <hr />
        <Disclosure.Button
          as="a"
          className="flex px-7 py-4 text-base font-semibold cursor-pointer hover:text-certus-blue"
          onClick={handleLangButton}
        >
          <Image
            alt={`Current language is ${locale}`}
            src={
              locale === LANGUAGES.ENGLISH
                ? ICONS[LANGUAGES.ENGLISH]
                : ICONS[LANGUAGES.SPANISH]
            }
            height="12"
            width="18"
          />
          <span className="ml-2 uppercase">{"spanish"}</span>
          {/* <ArrowDown className="w-6 h-4 m-auto mr-0" /> */}
        </Disclosure.Button>
        {isLangMenuOpen && (
          // <Link
          //   legacyBehavior
          //   href={asPath}
          //   locale={
          //     locale === LANGUAGES.ENGLISH
          //       ? LANGUAGES.SPANISH
          //       : LANGUAGES.ENGLISH
          //   }
          // >
          //   <Disclosure.Button
          //     as="a"
          //     className="block px-7 pb-4 text-base font-semibold cursor-pointer hover:text-certus-blue"
          //     onClick={() => {
          //       handleLangButton()
          //       closeMenu()
          //     }}
          //   >
          //     <Image
          //       alt={`Current language is ${locale}`}
          //       src={
          //         locale === LANGUAGES.ENGLISH
          //           ? ICONS[LANGUAGES.SPANISH]
          //           : ICONS[LANGUAGES.ENGLISH]
          //       }
          //       height="12"
          //       width="18"
          //     />
          //     <span className="ml-2 uppercase">
          //       {t(
          //         `Languages.${locale === LANGUAGES.ENGLISH ? 'spanish' : 'english'
          //         }`
          //       )}
          //     </span>
          //   </Disclosure.Button>
          // </Link>
          <></>
        )}
        <hr />
        {/* <NavBarHelp /> */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex justify-evenly pb-5 pl-6 pr-6">
            <a
              href="https://www.facebook.com/CertusLab/"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt="" src="/facebook-mobile.svg" height="48" width="48" />
            </a>
            <a
              href="https://www.instagram.com/certuslab/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt=""
                src="/instagram-mobile.svg"
                height="48"
                width="48"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCoq098Asa0IK3vEClRumDxw/videos"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt="" src="/youtube-mobile.svg" height="48" width="48" />
            </a>
            <a
              href="https://www.tiktok.com/@certuslab"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt="" src="/tiktok-mobile.svg" height="48" width="48" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt="" src="/linkedin-mobile.svg" height="48" width="48" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <Image alt="" src="/twitter-mobile.svg" height="48" width="48" />
            </a>
          </div>
        </div>
      </div>
    </Disclosure.Panel>
  );
}
