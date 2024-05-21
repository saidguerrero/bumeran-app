import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import { getProductsByName, getAllProducts } from "../../server/Products";
import CatalogItem from "../../components/pages/catalog/CatalogItem";
// import { CatalogButtons } from "../../components/pages/catalog/CatalogButtons";
// import Pagination from "../../components/commons/Pagination";

import { COLORS } from "../../data/constants";
import { CONTACT_INFO } from "../../utils/constants";
// import collect from "collect.js";

const types = {
  covid: "2",
  perfiles: "1",
};

const SearchPage = ({ query }) => {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [prescription, setPrescription] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [pages, setPages] = useState(0);

  const router = useRouter();
  const { type } = router.query;
  const productsPerPage = isMobile ? 8 : 20;
  const queryTrimmed = query ? query[0]?.trim() : "";

  useEffect(() => {
    if (type && type !== "prescription") {
      onSearch(types[type.toLocaleLowerCase()]);
    }
  }, [type]);

  // useEffect(() => {
  //   const indexOfLastRecord = currentPage * productsPerPage;
  //   const indexOfFirstRecord = indexOfLastRecord - productsPerPage;
  //   setPages(Math.ceil(products?.length / productsPerPage));
  //   setCurrentRecords(products?.slice(indexOfFirstRecord, indexOfLastRecord));
  // }, [products, currentPage]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setIsFetching(true);
  //     setProducts(await getProductsByName("prueba pelos"));

  //     setCurrentPage(1);
  //   };
  //   fetchProducts();
  // }, []);

  const displayPrescription = () => {
    router.push("/buscar-producto?type=prescription");
    setPrescription(!prescription);
  };

  const cancelPrescription = () => {
    setPrescription(false);
  };

  const onSearch = async (id) => {
    setProducts(await getFeaturedProducts(id, locale.substring(0, 2)));
  };

  // useEffect(() => {
  //   const indexOfLastRecord = currentPage * productsPerPage;
  //   const indexOfFirstRecord = indexOfLastRecord - productsPerPage;
  //   setPages(Math.ceil(products?.length / productsPerPage));
  //   setCurrentRecords(products?.slice(indexOfFirstRecord, indexOfLastRecord));
  // }, [products, currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      // setIsFetching(true);
      setProducts(await getAllProducts());

      setCurrentPage(1);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // console.log(products.result);
    // const data = products.result;
    const indexOfLastRecord = currentPage * productsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - productsPerPage;
    setPages(Math.ceil(products?.length / productsPerPage));

    setCurrentRecords(products?.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [products, currentPage]);

  return (
    <div className="flex flex-col">
      {/* <Head title={"PageTitles.catalog"}>
        <meta name="description" content={t("PageDescription.catalog")} />
      </Head> */}

      {/* <CatalogButtons
        displayPrescription={displayPrescription}
        prescription={prescription}
        cancelPrescription={cancelPrescription}
        covidButton={() => onSearch(types.covid)}
        profileButton={() => onSearch(types.perfiles)}
      /> */}
      <div className="p-5">
        <>
          {prescription ? null : (
            <>
              {products ? (
                query &&
                products.length > 0 && (
                  <p className="text-certus-neutro-40 mb-5 font-medium text-xl md:text-3xl lg:text-4xl">
                    {t("Catalog.results")}
                    <span className="text-certus-neutro-40 font-bold">
                      {" "}
                      {`"${queryTrimmed}"`}
                    </span>
                  </p>
                )
              ) : (
                <div className="text-certus-neutro-40 mb-5">
                  {" "}
                  {!isFetching && t("Catalog.notFound.search")}
                  {query && queryTrimmed.length > 0 && (
                    <span className="font-bold">{` "${queryTrimmed}"`}</span>
                  )}
                  {!isFetching && (
                    <>
                      {t("Catalog.notFound.newSearch")}
                      <a
                        href={CONTACT_INFO.WHATSAPP}
                        target="_blank"
                        rel="noreferrer"
                        className="text-certus-brand-violet"
                      >
                        {t("Catalog.notFound.whatsApp")}
                      </a>
                      {`${t("Catalog.notFound.callMsg")} `}
                      <span className="text-certus-brand-violet">
                        {t("Catalog.notFound.tel")}
                      </span>
                    </>
                  )}
                </div>
              )}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {/* {console.log("currentRecords")}
                {console.log(currentRecords)} */}
                {isFetching
                  ? [...Array(8)].map((item, e) => {
                      return <CatalogItem key={e} isSkeleton="true" />;
                    })
                  : currentRecords &&
                    currentRecords.map((product, index) => (
                      <CatalogItem
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        priceFull={product.price}
                        bgColor={COLORS[index % COLORS.length]}
                      />
                    ))}
              </div>
            </>
          )}
        </>
      </div>
      {products && !prescription && pages && pages > 1 && (
        <div className="flex p-5 justify-center md:justify-end">
          {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          /> */}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { query = "" } = params;

  return {
    props: {
      query,
    },
  };
};

export default SearchPage;
