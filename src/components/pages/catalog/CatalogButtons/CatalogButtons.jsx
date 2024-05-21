import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { Input } from "../../../commons/Inputs";
import { cleanQueryForURL } from "../../../../utils";
import Search from "../../../../assets/catalog/search.svg";
// import Prescription from '../../../../assets/catalog/prescription.svg'
// import PrescriptionPink from '../../../../assets/catalog/prescription-pink.svg'

export const CatalogButtons = ({
  displayPrescription,
  prescription,
  covidButton,
  profileButton,
  cancelPrescription,
}) => {
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const inputRef = useRef(null);
  const { type } = router.query;

  useEffect(() => {
    if (showSearchButton) {
      inputRef.current.focus();
    }
  }, [showSearchButton]);

  const handleSearchButton = () => {
    router.push(
      {
        query: {},
      },
      undefined
    );
    cancelPrescription();
    setShowSearchButton(!showSearchButton);
  };

  const onSearchTerm = () => {
    cancelPrescription();
    if (searchTerm.trim().length === 0) return;
    const cleanTerm = cleanQueryForURL(searchTerm);
    router.push(`/buscar-producto/${cleanTerm}`);
  };

  const clearSearch = () => {
    cancelPrescription();
    setShowSearchButton(false);
    setSearchTerm("");
  };

  const handleCovidButton = () => {
    cancelPrescription();
    clearSearch();
    covidButton();
  };

  const handleProfileButton = () => {
    cancelPrescription();
    clearSearch();
    profileButton();
  };

  return (
    <>
      <div className="flex flex-col items-center py-5 text-base sm:space-x-5 md:flex-row md:justify-end md:pr-5 lg:text-lg">
        {!showSearchButton ? (
          <div className="hidden md:block">
            <button
              data-test-id="btn-cat-buscar"
              onClick={handleSearchButton}
              className="flex justify-center items-center font-medium rounded-lg bg-certus-brand-purple text-white px-4 h-10 lg:w-52 lg:h-14 disabled:cursor-not-allowed"
            >
              {/* <Search className="w-5 h-5 fill-white mr-1" /> */}
              {"Catalog.search"}
            </button>
          </div>
        ) : (
          <>
            <div className="hidden grow border-certus-neutro-20 md:block">
              <div className="flex flex-row border-b-4 ml-5 text-certus-neutro-40 focus-within:border-certus-brand-purple">
                <Input
                  dataTestId="cat-search"
                  type="text"
                  valueRef={inputRef}
                  placeholder={"Catalog.searchMsg"}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" ? onSearchTerm() : null
                  }
                  icon={
                    <Search
                      className={
                        "absolute bg-white fill-certus-neutro-40  top-3 w-6 h-6 lg:top-0 lg:w-10 lg:h-10 cursor-pointer"
                      }
                      onClick={() => {
                        onSearchTerm();
                      }}
                    />
                  }
                  className="font-lato border-none outline-none focus:ring-0 h-11 indent-7 w-full pr-2 lg:indent-12 disabled:bg-white disabled:focus:text-certus-neutro-40 disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => onSearchTerm()}
                  className="text-certus-brand-purple font-light ml-auto mr-0 disabled:cursor-not-allowed"
                >
                  {"Catalog.search"}
                </button>
              </div>
            </div>
          </>
        )}
        <button
          data-test-id="btn-cat-orden-medica"
          onClick={() => displayPrescription()}
          className={`${
            prescription
              ? "bg-white text-certus-brand-purple border-2 border-certus-brand-purple"
              : "bg-certus-brand-purple text-white"
          } flex justify-center items-center h-10 rounded-lg order-3 px-8 w-11/12 font-medium hover:opacity-50 md:order-none md:w-auto lg:h-14`}
        >
          <p className="line-clamp-1">{"Catalog.prescription"}</p>
        </button>
        <div className="flex text-certus-neutro-40 my-3 border-certus-neutro-20 border-b-4 text-base order-2 w-11/12 min-w-0 focus-within:border-certus-brand-purple md:w-60 md:-order-1 md:hidden">
          <Input
            dataTestId="cat-search"
            type="text"
            placeholder={"Catalog.searchMsgMobile"}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            className="font-lato border-none outline-none h-11 indent-1 w-full pr-2 disabled:bg-white disabled:focus:text-certus-neutro-40 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => onSearchTerm()}
            className="hidden font-medium text-certus-brand-purple ml-auto mr-0 disabled:cursor-not-allowed md:block"
          >
            {"Catalog.search"}
          </button>
          <Search
            className={
              "bg-white fill-certus-brand-purple w-6 h-6 mt-3 cursor-pointer block md:hidden"
            }
            onClick={() => onSearchTerm()}
          />
        </div>
        <div className="flex justify-between w-11/12 space-x-2 md:space-x-5 text-white font-medium order-1 md:order-none md:justify-end md:w-auto">
          <Link className="w-1/2" href="/buscar-producto?type=perfiles">
            <button
              data-test-id="btn-cat-perfiles"
              onClick={() => handleProfileButton()}
              className={`${
                type === "perfiles" || !type
                  ? "bg-white text-certus-brand-purple border-2 border-certus-brand-purple"
                  : "bg-certus-brand-purple text-white"
              } flex justify-center items-center rounded-lg w-full h-10 font-medium hover:opacity-50 sm:px-5 md:w-40 lg:w-52 lg:h-14 disabled:cursor-not-allowed disabled:bg-certus-brand-purple disabled:text-white`}
            >
              {"Catalog.profile"}
            </button>
          </Link>
          <Link className="w-1/2" href="/buscar-producto?type=covid">
            <button
              data-test-id="btn-cat-covid19"
              onClick={() => handleCovidButton()}
              className={`${
                type === "covid"
                  ? "bg-white text-certus-brand-purple border-2 border-certus-brand-purple"
                  : "bg-certus-brand-purple text-white"
              } flex justify-center items-center rounded-lg w-full  h-10 font-medium hover:opacity-50 sm:px-5 md:w-40 lg:w-52 lg:h-14 disabled:cursor-not-allowed`}
            >
              COVID-19
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CatalogButtons;
