import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import DeleteItem from "../../../../assets/DeleteItem";
import { formatPrice, getCurrencyFromLocale } from "../../../../utils";

const CartItem = ({
  onClick,
  price,
  title,
  bgColor,
  deliveryTime,
  isLast,
  displayDelete,
  isOrderProduct,
  dataTestId,
  paymentInPerson,
}) => {
  const [serverCart, setServerCart] = useState({});
  const { locale } = useRouter();

  const renderMobileMount = () => {
    return (
      <div className="flex items-baseline font-bold text-certus-neutro-80 pl-2 md:hidden md:pl-0">
        <span className="text-base">{formatPrice(price)}</span>
        <span className="text-sm">{getCurrencyFromLocale(locale)}</span>
      </div>
    );
  };

  const renderDeliveryTime = () => {
    return (
      deliveryTime && (
        <div className="flex md:flex-col lg:flex-row sm:items-end md:items-start font-lato text-xs font-normal text-certus-neutro-40 gap-1 md:text-base">
          <span className="font-semibold">{t("Order.delivery")}</span>
          <span>{deliveryTime}*</span>
        </div>
      )
    );
  };

  return (
    <div
      data-test-id={dataTestId}
      className={`flex ${
        isOrderProduct
          ? "flex-row py-4 px-7 md:px-0 md:py-6"
          : "flex-col p-4 md:py-7 md:p-0"
      } gap-2 md:flex-row md:items-center md:gap-9 ${
        isLast ? "" : "border-certus-neutro-20 border-b-2"
      }`}
    >
      <div className="flex w-full">
        <div className="flex w-full gap-1 items-center md:gap-4">
          <div
            className={` flex-none bg-[${bgColor}] h-full w-[5px] rounded-b md:w-2 md:rounded-b-lg`}
          />

          <div className="flex flex-col w-full gap-1">
            <span
              className={`${
                isOrderProduct ? "text-base font-bold" : "text-lg"
              } font-semibold text-certus-neutro-80 pr-2 md:text-xl  lg:text-2xl`}
            >
              {title}
            </span>

            {renderDeliveryTime()}
          </div>
        </div>

        {!paymentInPerson && (
          <div className="hidden md:flex md:items-end md:self-center md:font-semibold md:text-certus-neutro-80">
            <span
              className={`${
                isOrderProduct ? "text-2xl md:text-xl lg:text-3xl" : "text-2xl"
              }`}
            >
              {formatPrice(price)}
            </span>
            <span
              className={`${
                isOrderProduct ? "text-xl lg:text-2xl" : "text-lg"
              }`}
            >
              MX
            </span>
          </div>
        )}

        {isOrderProduct && (
          <div className="flex items-end mb-[-4px]">{renderMobileMount()}</div>
        )}
      </div>

      {displayDelete && (
        <div className="flex gap-9 pr-2">
          <div className="hidden md:block md:w-[1px] md:h-8 md:bg-certus-neutro-20" />

          <div className="flex w-full justify-between">
            {renderMobileMount()}

            <button onClick={onClick} className="flex">
              <div className="flex gap-3">
                <DeleteItem />

                <span className="hidden md:flex md:text-base md:font-semibold md:text-red-10">
                  Eliminar
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
CartItem.defaultProps = {
  isLast: false,
  displayDelete: true,
  isOrderProduct: false,
  deliveryTime: "",
};

CartItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.any,
  bgColor: PropTypes.string,
  onClick: PropTypes.any,
  deliveryTime: PropTypes.string,
  isLast: PropTypes.bool,
  displayDelete: PropTypes.bool,
  isOrderProduct: PropTypes.bool,
};

export default CartItem;
