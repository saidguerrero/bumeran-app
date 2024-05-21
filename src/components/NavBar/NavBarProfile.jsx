import { Fragment, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useStoreState } from "easy-peasy";
import { Menu, Transition } from "@headlessui/react";

import { NavBarUser } from "./NavBarUser";
import User from "../../assets/nav-bar/user.svg";
import { signOut, useSession } from "next-auth/react";
// import collect from "collect.js";
import { ROUTES } from "../../utils/constants";
// import useClearStore from "../../hooks/pages/useClearStore";

import Image from "next/image";

export default function NavBarProfile({ accountLinks }) {
  // const { data: session } = useSession();

  const userState = useState([{}]);
  // const userAdminState = useStoreState((state) => state.account.userAdmin)
  // const { clearStore } = useClearStore(userState);
  const [userName, setUserName] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // if (userState.length > 0) {
    //   setUserName(userState[0].name[0] + userState[0].lastName[0]);
    // }
    // if (accountLinks.length > 0) {
    //   if (userState.length > 0) {
    //     setUserName(userState[0].name[0] + userState[0].lastName[0])
    //   }
    // } else {
    //   if (userAdminState.length > 0) {
    //     setUserName(userAdminState[0].name[0] + userAdminState[0].lastName[0])
    //   }
    // }
  }, [userState]);

  const goToAuthentication = async (path, isLogout) => {
    if (isLogout) {
      if (path === ROUTES.LOGOUT.PATH) await signOut({ redirect: false });
      localStorage.clear();
      sessionStorage.clear();
      clearStore();
      router.push(ROUTES.HOME.PATH);
    } else {
      router.push(path);
    }
  };

  return (
    <Menu as="div" className="ml-3 relative">
      {console.log(accountLinks)}
      <div>
        {/* {mounted &&
        !!userName &&
        (userState?.length > 0 || userAdminState?.length > 0) ? ( */}

        {false ? (
          <Menu.Button
            data-test-id="btn-perfil-paciente"
            className="flex rounded-full p-1"
          >
            <NavBarUser name={userName} />
          </Menu.Button>
        ) : (
          <Menu.Button
            data-test-id="btn-perfil-login"
            onClick={() => goToAuthentication(ROUTES.LOGIN.PATH, false)}
            className="w-8 md:w-[48px] md:p-[9px] flex text-sm justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-certus-neutro-20 focus:ring-white"
          >
            {/* <User className="h-7 w-7" aria-hidden="true" /> */}
            {console.log("llego a user")}
            <Image
              src={User}
              width={50}
              height={50}
              className="h-7 w-7"
              aria-hidden="true"
              alt="arrow"
            />
          </Menu.Button>
        )}
      </div>
      {/* {(userState?.length > 0 || userAdminState?.length > 0) && ( */}
      {userState.length > 0 && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  data-test-id="dd-perfil-logout"
                  onClick={() => goToAuthentication(ROUTES.LOGOUT.PATH, true)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block text-left px-4 py-2 text-sm text-gray-700 w-full`}
                >
                  {"Nav.logout"}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}
