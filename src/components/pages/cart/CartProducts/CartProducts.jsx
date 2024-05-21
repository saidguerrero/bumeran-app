import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CART_COLORS } from "../../../../utils/constants";
import CartItem from "./CartItem";

export default function CartProducts({ items = [] }) {
  const [serverCart, setServerCart] = useState({});
  const { locale } = useRouter();

  return (
    <div className="border-y md:border md:rounded-2xl md:px-11">
      {items.length > 0 ? (
        items.map((item, index) => (
          <CartItem
            key={item.id}
            title={item.nombre}
            price={item.precio}
            bgColor={CART_COLORS[index % CART_COLORS.length]}
            onClick={() => deleteItem(item.id)}
            isLast={items.length - 1 === index}
            dataTestId={`cart-item-${item.id}`}
          />
        ))
      ) : (
        <div className="text-certus-neutro-30 py-1 pl-5 md:pl-0">
          items vacios
        </div>
      )}
    </div>
  );
}
