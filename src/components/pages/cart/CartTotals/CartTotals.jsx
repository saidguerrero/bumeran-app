import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ActionButton from "../../../commons/ActionButton";
import ProductPrice from "../../../commons/ProductPrice";
import {
  formatCurrency,
  formatPrice,
  getCurrencyFromLocale,
} from "../../../../utils";

const ProductRow = ({ item }) => {
  return (
    <div className="flex my-2 px-4 xl:px-12 font-lato text-sm md:text-base text-certus-neutro-60">
      <span className="flex-1" title={item.nombre}>
        {item.nombre}
      </span>
      <span className="">
        <ProductPrice
          price={`${item.precio}`}
          className="text-certus-neutro-60 font-base"
          currencySize={"text-xs"}
        />
      </span>
    </div>
  );
};

const DescuentoRow = ({ item, locale }) => {
  return (
    <>
      <div className="flex mt-8 px-4 xl:px-12 font-lato text-sm text-certus-neutro-60">
        <span className="flex-1 line-clamp-1">{item.nombre}</span>
        <span className="">
          <div
            className={"flex items-baseline text-certus-neutro-60 font-base"}
          >
            <div className="text-sm">-{formatPrice(item.precio)}</div>
            <div className={"text-xs"}>{getCurrencyFromLocale(locale)}</div>
          </div>
        </span>
      </div>
    </>
  );
};

const OnlineSaving = ({ title, discount, locale }) => {
  return (
    <>
      <div className="pt-4 text-center text-md text-certus-brand-violet">
        <div>
          {title}{" "}
          {formatCurrency(String(discount), getCurrencyFromLocale(locale))}
        </div>
      </div>
    </>
  );
};

export default function CartTotals({
  user = null,
  btnText = "",
  notice = "",
  onClick = null,
  step = 0,
  title,
  patientTypeCheckbox,
  total,
}) {
  // const { data: session } = useSession();
  const [serverCart, setServerCart] = useState([]);
  // const userState = useStoreState((state) => state.account.user);
  // const patientInfo = useStoreState((state) => state.checkout.patientInfo);
  // const [isSeniorAge, setIsSeniorAge] = useState(userState[0]?.seniorAge);
  const { locale } = useRouter();
  const cart = [
    {
      id: "1",
      nombre: "Tu guía BABY",
      precio: "1390.00",
      precio3ra: "1370.00",
      precio9999: "1463.00",
    },
    {
      id: "2",
      nombre: "Tenedores",
      precio: "390.00",
      precio3ra: "370.00",
      precio9999: "463.00",
    },
  ];
  const [policySelected, setPolicySelected] = useState("");
  const [indicationsChecked, setIndicationsChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const [descuento, setDescuento] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [removeMarginTop, setRemoveMarginTop] = useState(false);
  // const stripeReady = useStoreState((state) => state.checkout.stripeReady);
  // const stripeIsReady = useStoreActions(
  //   (actions) => actions.checkout.stripeIsReady
  // );

  const dataTestPolicy = {
    cancel: "cancelacion",
    validity: "vigencia",
  };

  const getDataTestIdButtonPrecess = () => {
    if (step === 1) {
      return t("Checkout.payment.next")
        ? "datos-btn-continuar"
        : "cart-btn-proceder";
    } else if (step === 2) {
      return t("Checkout.payment.next")
        ? "factura-btn-continuar"
        : "cart-btn-proceder";
    } else {
      return "cart-btn-proceder";
    }
  };

  useEffect(() => {
    setServerCart([
      {
        items: [
          {
            id: "1",
            nombre: "Tu guía BABY",
            precio: "1390.00",
            precio3ra: "1370.00",
            precio9999: "1463.00",
          },
        ],
        total: 1390,
        total3ra: 1370,
        total9999: 1463,
        currency: "MXN",
      },
    ]);
  }, []);

  return (
    <div className="shadow-[2px_2px_10px_rgba(0,0,0,0.08)] rounded-2xl">
      <div className="bg-certus-brand-violet mb-6 text-center text-white py-5 xl:py-5 rounded-t-2xl xl:text-xl font-semibold">
        {title}
      </div>
      {serverCart?.items &&
        step !== 0 &&
        serverCart?.items.map((item, index) => (
          <ProductRow key={index} item={item} currency={serverCart?.currency} />
        ))}
      {hasDiscount && isSeniorAge && step !== 0 && descuento > 0 && (
        <DescuentoRow
          item={{ precio: descuento, nombre: t("Cart.3raEdad") }}
          locale={locale}
        />
      )}
      <div
        data-test-id="cart-resumen-total"
        className="flex mt-4 pt-1 px-4 xl:px-9 text-2xl"
      >
        <span className="flex-1 text-certus-neutro-40 font-medium">Total</span>
        {console.log(serverCart.total)}
        <ProductPrice
          price={total}
          className="text-certus-neutro-60 font-semibold"
          currencySize={"text-base"}
          priceFull={step === 0 ? serverCart?.total9999 : 0}
        />
      </div>
      <div className="flex justify-end text-xs mb-4 px-4 xl:px-9">
        IVA incluido
      </div>

      {step === 3 && (
        <div>
          <hr />
          <div className="px-8 pt-6">
            <div className="flex items-start mb-3">
              {/* <Checkbox
                dataTestId={
                  indicationsChecked
                    ? "resumen-indicaciones-checked"
                    : "resumen-indicaciones-unchecked"
                }
                name={"indications"}
                checked={indicationsChecked}
                onChange={() => setIndicationsChecked(!indicationsChecked)}
                className="mt-[2px] mr-3"
              /> */}
              <div className="text-xs text-certus-neutro-60">
                {t("Checkout.summary.indicationsCheck")}
              </div>
            </div>
            <div className="flex items-start">
              {/* <Checkbox
                dataTestId={
                  termsChecked
                    ? "resumen-acuerdo-checked"
                    : "resumen-acuerdo-unchecked"
                }
                name={"terms"}
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
                className="mt-[2px] mr-3"
              /> */}
              <div className="text-xs text-certus-neutro-60">
                {/* <Trans
                  i18nKey={"Checkout.summary.termsCheck"}
                  components={{
                    a: (
                      <a
                        className="text-certus-brand-purple"
                        href="/Privacy.pdf"
                        target="_blank"
                        rel="noreferrer"
                      />
                    ),
                    b: (
                      <a
                        className="text-certus-brand-purple"
                        href="/Terms.pdf"
                        target="_blank"
                        rel="noreferrer"
                      />
                    ),
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <p className={`text-center ${removeMarginTop ? "pb-5 pt-1" : "py-5"}`}>
        {step === 3 && (
          <ActionButton
            onClick={onClick}
            className={"w-9/12 font-medium"}
            disabled={!indicationsChecked || !termsChecked || !stripeReady}
            theme={
              !indicationsChecked || !termsChecked || !stripeReady
                ? "disabled"
                : "purple"
            }
          >
            {btnText}
          </ActionButton>
        )}
        {step !== 3 && (
          <ActionButton
            dataTestId={getDataTestIdButtonPrecess()}
            onClick={onClick}
            className={"w-9/12 font-medium"}
            theme={step === 1 && !patientTypeCheckbox ? "disabled" : "purple"}
            disabled={step === 1 && !patientTypeCheckbox ? true : false}
          >
            {btnText}
          </ActionButton>
        )}
        {step === 1 && !patientTypeCheckbox && (
          <div className="py-4 px-4 text-justify text-sm text-certus-neutro-40">
            {t("Cart.patientTypeNote")}
          </div>
        )}
      </p>
      {(step === 0 || step === 1 || step === 2 || step === 3) && (
        <>
          <div className="flex w-full justify-center text-sm pb-4">
            <div
              data-test-id="cart-btn-cancelacion"
              className={`p-2 mx-1 cursor-pointer rounded-md text-center text-certus-brand-purple ${
                policySelected === "cancel"
                  ? "bg-certus-brand-purple bg-opacity-10"
                  : "bg-transparent"
              }`}
              onClick={() => {
                policySelected !== "cancel"
                  ? setPolicySelected("cancel")
                  : setPolicySelected("");
              }}
            >
              politica cnac
            </div>
            <div
              data-test-id="cart-btn-vigencia"
              className={`p-2 mx-1 cursor-pointer rounded-md text-center text-certus-brand-purple ${
                policySelected === "validity"
                  ? "bg-certus-brand-purple bg-opacity-10"
                  : "bg-transparent"
              }`}
              onClick={() => {
                policySelected !== "validity"
                  ? setPolicySelected("validity")
                  : setPolicySelected("");
              }}
            >
              poliza
            </div>
          </div>
          {policySelected !== "" && (
            <div
              data-test-id={`cart-copy-${dataTestPolicy[policySelected]}`}
              className="text-xs text-certus-neutro-60 text-justify p-5 bg-certus-neutro-10"
            >
              {/* {t(`Cart.${policySelected}Policy.content`)} */}
            </div>
          )}
        </>
      )}
    </div>
  );
}
