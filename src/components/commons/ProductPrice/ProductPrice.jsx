import {
  formatCurrency,
  formatPrice,
  getCurrencyFromLocale,
} from "../../../utils";
import { useRouter } from "next/router";

const ProductPrice = ({ price, className, currencySize, priceFull }) => {
  const router = useRouter();
  const { locale } = router;
  const showFullPrice = parseFloat(priceFull) > parseFloat(price);
  return (
    <div
      className={`flex flex-col whitespace-nowrap items-baseline ${className} ${
        showFullPrice ? "-mt-3" : ""
      }`}
    >
      {showFullPrice && (
        <div className="text-certus-neutro-40 text-[0.75rem] leading-3 line-through font-medium">
          {formatCurrency(String(priceFull), getCurrencyFromLocale(locale))}
        </div>
      )}
      {!isNaN(price) && (
        <div className="text-xl">
          {formatPrice(price)}
          <span className={currencySize}>{getCurrencyFromLocale(locale)}</span>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
