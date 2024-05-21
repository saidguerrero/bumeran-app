import { useEffect, useState, Fragment } from "react";

import Link from "next/link";

import { useRouter } from "next/router";
import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react";

import ShoppingCart from "../../../public/shopping-cart.svg";
import ArrowDown from "../../assets/nav-bar/arrow-down.svg";
import Image from "next/image";
import NavBarMenu from "./NavBarMenu";
// import NavBarProfile from "./NavBarProfile";
// import LanguageLink from "./LanguageLink";
import { ROUTES } from "../../utils/constants";
import NavBarProfile from "./NavBarProfile";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState("5");
  //   const items = useStoreState((state) => state.cart.items);
  //   const userData = useStoreState((state) => state.account.user);

  const navigation = [
    {
      name: "Nav.locations",
      href: ROUTES.LOCATIONS.PATH,
      current: false,
      target: "_self",
      dataTestId: "btn-header-sucursales",
    },
    {
      name: "Nav.invoice",
      href: ROUTES.RESULTS.PATH,

      current: false,
      target: "_self",
      dataTestId: "btn-header-facturacion",
    },
  ];

  const navigationMobile = [
    {
      name: "Nav.tests",
      href: ROUTES.TESTS.PATH,
      current: false,
      target: "_self",
      dataTestId: "btn-header-estudios",
    },
    ...navigation,
  ];

  const resultLinks = [
    {
      name: "Nav.link1",
      href: ROUTES.RESULTS_NO_LOGIN.PATH,
      target: "_self",
      dataTestId: "dd-resultados-pacientes",
    },
    {
      name: "Nav.link2",
      href: ROUTES.RESULTS_MEDICS.PATH,
      target: "_self",
      dataTestId: "dd-resultados-medicos",
    },
    {
      name: "Nav.link3",
      href: ROUTES.RESULTS_COMPANY.PATH,
      target: "_self",
      dataTestId: "dd-resultados-empresas",
    },
    {
      name: "Nav.link4",
      href: ROUTES.RESULTS_LAB.PATH,
      target: "_self",
      dataTestId: "dd-resultados-laboratorios",
    },
  ];

  const accountLinks = [
    {
      name: "Nav.account",
      href: ROUTES.PATIENT_ACCOUNT.PATH,
      dataTestId: "dd-perfil-mi-cuenta",
    },
    {
      name: "Nav.results",
      href: ROUTES.RESULTS.PATH,
      dataTestId: "dd-perfil-resultados",
    },
    {
      name: "Nav.family",
      href: ROUTES.PATIENT_FAMILY.PATH,
      dataTestId: "dd-perfil-circulo-familiar",
    },
    {
      name: "Nav.favorites",
      href: ROUTES.FAVORITES.PATH,
      dataTestId: "dd-perfil-favoritos",
    },
  ];

  const handleMenuButton = () => {
    if (isOpen) {
      document.querySelector("body").classList.remove("no-scroll");
    } else {
      document.querySelector("body").classList.add("no-scroll");
    }
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    document.querySelector("body").classList.remove("no-scroll");
    setIsOpen(false);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {() => (
        <>
          <div className="fixed left-0 right-0 top-0 px-2 z-20 bg-white text-certus-neutro-60 h-12 pb-3 md:h-24 md:px-7">
            <div className="relative flex items-center justify-between h-12 md:h-24">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <Disclosure.Button
                  onClick={handleMenuButton}
                  className="inline-flex items-center justify-center p-2 text-certus-neutro-60 focus:outline-none"
                >
                  <span className="sr-only">Open menu</span>
                </Disclosure.Button>
              </div>
              <div className="hidden md:block">
                <div className="flex md:space-x-2.5 lg:space-x-8">
                  <Menu as="div" className="relative self-center">
                    <span className="sr-only">Open Results</span>
                    <Menu.Button
                      className="flex rounded-full text-xs lg:text-sm xl:text-lg"
                      data-test-id="btn-header-dd-resultados"
                    >
                      {"Nav.results"}
                      {/* <ArrowDown className="w-3 h-3 ml-1 self-center fill-certus-neutro-60" /> */}
                      <Image
                        src={ShoppingCart}
                        width={50}
                        height={50}
                        className="w-3 h-3 ml-1 self-center fill-certus-neutro-60"
                        alt="arrow"
                      />
                      <Image
                        src={ArrowDown}
                        width={50}
                        height={50}
                        alt="arrow"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="flex flex-col absolute w-48 rounded-md shadow-lg p-4 bg-white ">
                        {resultLinks.map((link) => (
                          <Menu.Item key={link.name}></Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex-shrink-0 flex">
                  <Link href="/" legacyBehavior>
                    <a
                      data-test-id="header-logo"
                      className="md:mt-0 md:absolute md:left-[calc(50%-50px)] lg:left-[calc(50%-71px)] md:top-2 lg:top-3 xl:top-5"
                    ></a>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:pr-0">
                <Link href={"/carrito"}>
                  <button
                    data-test-id="btn-header-carrito"
                    type="button"
                    onClick={handleCloseMenu}
                    className="relative ml-3 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-certus-neutro-20 focus:ring-white"
                  >
                    <span className="sr-only">Go to cart</span>
                    {/* <ShoppingCart className="h-6 w-6" aria-hidden="true" /> */}
                    {console.log(qty)}
                    <Image
                      src={ShoppingCart}
                      width={50}
                      height={50}
                      className="h-6 w-6"
                      aria-hidden="true"
                      alt="cart"
                    />
                    {qty > 0 && (
                      <span
                        data-test-id="btn-carrito-contador"
                        className="absolute -top-1 -right-1 bg-certus-brand-violet text-white border rounded-full pt-[1px] text-xs w-5 h-5"
                      >
                        {qty}
                      </span>
                    )}
                  </button>
                </Link>
                <NavBarProfile accountLinks={accountLinks} />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
