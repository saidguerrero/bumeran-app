import { useEffect, useState } from "react";
import CartProducts from "../components/pages/cart/CartProducts";
import CartTotals from "../components/pages/cart/CartTotals";
import NextHead from "next/head";
import PageTitle from "../components/commons/PageTitle";
import MainLayout from "../components/layout";

export default function Cart({}) {
  const [serverCart, setServerCart] = useState([]);
  const [cart, setCart] = useState(["1", "3"]);

  const [items, setItems] = useState([
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
  ]);

  useEffect(() => {
    setCart(["1", "3"]);
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
    <section className="mb-6 md:mb-10 md:flex-col md:mx-10 gap-10">
      <MainLayout>
        <NextHead>
          <title>hola carrito title</title>
        </NextHead>
        {console.log(cart)}
        {console.log(serverCart)}
        {console.log(serverCart[0]?.total)}
        {cart.length > 0 ? (
          <div className="flex flex-col">
            {/* <PageTitle title="titulo carrito" className="mx-6 mb-6 md:mx-0" /> */}

            <div className="flex flex-col gap-10 md:flex-row lg:gap-14">
              <div className="flex flex-col md:w-9/12 gap-4">
                <div className="flex flex-col gap-1 md:gap-6">
                  <div
                    className="flex justify-end text-base font-semibold text-certus-brand-purple cursor-pointer pr-5 md:pr-0"
                    data-test-id="cart-vaciar-carrito"
                  >
                    limpiar carrito
                  </div>

                  <CartProducts
                    currency={serverCart?.currency}
                    items={items}
                    title={"titulo carrito"}
                  />
                </div>

                <div className="flex justify-center text-base font-semibold text-certus-brand-purple md:justify-end">
                  {/* <PDFGenerate locale={locale} /> */}
                  generar pdf
                </div>
              </div>

              <div className="px-6 md:w-3/12 md:px-0 md:pt-11 flex">
                <CartTotals
                  user={null}
                  btnText={"Comprar"}
                  currency={serverCart[0]?.currency}
                  notice={"Cart.notice"}
                  title={"Resumen de compra"}
                  total={serverCart[0]?.total}
                />
              </div>
            </div>
          </div>
        ) : null}
      </MainLayout>
    </section>
  );
}
