import { useState, useEffect } from "react";
import Link from "next/link";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
// import { postValidateProduct } from '../../../../server/api/ValidateProducts'
import {
  cleanNameForSEO,
  formatCurrency,
  getCurrencyFromLocale,
} from "../../../../utils";
// import FavoriteButton from "../../../commons/FavoriteButton";
// import AddToCartButton from "../../../commons/AddToCartButton";

export default function CatalogItem({
  id,
  title,
  description,
  price,
  priceFull,
  bgColor,
  isSkeleton = false,
  small = false,
}) {
  const items = useState(["1", "3"]);
  // const addItem = useStoreActions((actions) => actions.cart.addItem);
  // const deleteItem = useStoreActions((actions) => actions.cart.deleteItem);
  // const replaceValidated = useStoreActions(
  //   (actions) => actions.cart.replaceValidated
  // );

  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const [hasConflict, setHasConflict] = useState(false);
  const [validateProducts, setValidateProducts] = useState({
    newProduct: "",
    newProductName: "",
    itemsToReplace: [],
    cartProductsNames: [],
  });

  useEffect(() => {
    setIsAdded(items.findIndex((item) => item === id) >= 0);
  }, [items, id]);

  const onAddProduct = async (id, e) => {
    e.preventDefault();
  };

  const onDeleteProduct = (id, e) => {
    e.preventDefault();
    // deleteItem(id);
    setIsAdded(!isAdded);
  };

  const handleAccept = () => {
    // replaceValidated(validateProducts.itemsToReplace);
    // addItem(validateProducts.newProduct);
    setIsAdded(!isAdded);
    setHasConflict(false);
  };

  return (
    <div
      data-test-id={`card-estudio-${id}`}
      className={`h-28 ${small ? "md:h-48" : "md:h-60"} aspect-w-1`}
    >
      {isSkeleton ? (
        <div className="animate-pulse rounded-[20px] shadow-[2px_2px_10px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col px-7 py-5 md:py-8">
            <div className="flex">
              <span className="bg-certus-neutro-20 rounded-b-lg min-w-[6px] h-11 mr-1 md:min-w-[16px] md:h-16 md:mr-5"></span>
              <p className="ml-2 bg-certus-neutro-20 w-full rounded-lg h-11 md:h-16"></p>
            </div>
            <div className="grid-cols-3 gap-4 h-16 pt-3 hidden md:grid">
              <div className="h-2 bg-certus-neutro-20 rounded col-span-1"></div>
              <div className="h-2 bg-certus-neutro-20 rounded col-span-2"></div>
              <div className="h-2 bg-certus-neutro-20 rounded col-span-2"></div>
              <div className="h-2 bg-certus-neutro-20 rounded col-span-1"></div>
            </div>
            <div className="justify-between text-certus-neutro-20 mt-4 hidden md:flex">
              <div className="bg-certus-neutro-20 w-10">.</div>
              <div className="bg-certus-neutro-20 w-10">.</div>
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/producto/${id}/${cleanNameForSEO(title)}`} legacyBehavior>
          <a className="overflow-hidden">
            <div className="flex flex-col px-4 rounded-[20px] shadow-[2px_2px_10px_rgba(0,0,0,0.08)]">
              <div className={`flex ${small ? "pt-5" : "pt-4"}`}>
                <span
                  className={`${bgColor} rounded-b-lg min-w-[6px] mr-1 ${
                    small
                      ? "h-7 md:h-12 md:min-w-[8px] md:mr-2.5"
                      : "h-10 md:min-w-[14px] md:h-14 md:mr-2 lg:h-16"
                  }`}
                ></span>
                <div className="flex w-full justify-between items-center">
                  <p
                    data-test-id={`card-titulo-estudio-${id}`}
                    className="font-semibold md:font-medium normal-case text-certus-neutro-80 line-clamp-2 break-words text-sm md:text-xl xl:text-2xl"
                  >
                    {title}
                  </p>
                  {/* <FavoriteButton
                    id={id}
                    title={title}
                    description={description}
                    price={price}
                    className={"pl-7 md:mb-7"}
                  /> */}
                </div>
              </div>
              <div className="hidden md:block">
                <p
                  data-test-id={`card-descripcion-${id}`}
                  className={`text-certus-neutro-40 text-sm my-3 font-sans line-clamp-3 max-h-20 ${
                    small ? "md:text-base" : ""
                  }`}
                >
                  {description}
                </p>
              </div>
              <div className="flex flex-col mt-auto mb-4 md:mb-3">
                {parseFloat(priceFull) > parseFloat(price) && (
                  <div className="text-certus-neutro-40 text-[0.65rem] md:text-[0.75rem] leading-3 line-through">
                    {formatCurrency(priceFull, "MX")}
                  </div>
                )}
                <div className="flex">
                  <div
                    className={`flex-1 flex-row text-certus-neutro-80 ${
                      small
                        ? "text-base font-bold pl-2 md:pl-0"
                        : "font-semibold md:font-medium text-sm md:text-xl"
                    }`}
                  >
                    {formatCurrency(price, "MX")}
                  </div>
                  <div className="flex">
                    {/* <AddToCartButton
                      isAdded={isAdded}
                      id={id}
                      onAddProduct={onAddProduct}
                      onRemoveProduct={onDeleteProduct}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
}
