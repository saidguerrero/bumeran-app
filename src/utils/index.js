export const ONLY_ALPHABETS = RegExp(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$/);

export const SPECIAL_CHARACTERS = RegExp(/[@$!%*#?&]+/);

export const REGULAR_EXPRESSIONS = {
  RFC: RegExp(
    /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/
  ),
  RAZON_SOCIAL: RegExp(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+$/),
  ONLY_DIGITS: RegExp(/^[0-9]+$/),
  PHONE_NUMBER: RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  ),
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function cleanQueryForURL(str) {
  let cleanStr = str.replace(/\B\s+|\s+\B/g, " ");
  return encodeURIComponent(cleanStr.replace(/([^a-zA-Z0-9à-üÀ-Ü])/g, " "));
}

export function cleanNameForSEO(name) {
  return encodeURIComponent(name.trim().replaceAll(" ", "-").toLowerCase());
}

export function getCurrencyFromLocale(locale) {
  let currency = locale === "es-MX" ? "MX" : "USD";
  return currency;
}

export function formatCurrency(price, currency) {
  const priceFixed = Number(price).toFixed(2);
  const formattedPrice = priceFixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${formattedPrice} ${currency}`;
}

export function formatPrice(price) {
  let priceFixed = parseFloat(price);
  let formattedPrice = priceFixed
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${formattedPrice}`;
}

export const formatFullCurrency = (price, locale) => {
  return price
    ? `${formatPrice(price)}${getCurrencyFromLocale(locale || "es-MX")}`
    : price;
};

export function objectHasContent(obj) {
  return Object.keys(obj).length > 0;
}

export function sortDataByName(data) {
  let sortedData;

  sortedData = data.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  });

  return sortedData;
}

export const formatDate = ({ date, locale, pattern = "DD/MMM/YYYY" }) => {
  if (date && locale) {
    return moment(date).locale(locale).format(pattern);
  }
  return;
};

export const formatDateUTC = ({ date, locale, pattern = "DD/MMM/YYYY" }) => {
  if (date && locale) {
    return moment.parseZone(date).locale(locale).format(pattern);
  }
  return;
};

export const buildListBoxData = ({ data, nameProp, valueProp }) => {
  if (data && data.length > 0) {
    return data.map((option) => ({
      name: option[nameProp],
      value: option[valueProp],
    }));
  }
  return [];
};

export const buildListBoxDataTax = ({ data, nameProp, valueProp }) => {
  if (data && data.length > 0) {
    return data.map((option) => ({
      name: option[nameProp],
      value: option[valueProp],
      person: option["tipoPersona"],
    }));
  }
  return [];
};

export const findOptionByValue = ({ nameProp, value, data }) => {
  if (nameProp && value && data?.length > 0) {
    return data.find((option) => option[nameProp] === value);
  }
  return null;
};

export const concatenateName = (arrayFullName) => {
  return arrayFullName.join(" ");
};

export const getFullName = ({ firstName, secondName, lastName, surname }) => {
  return [firstName, secondName || "", lastName, surname || ""].join(" ");
};

export const capitalizeName = (str) => {
  if (str) {
    str = str.toLowerCase();
    const arrStr = str.split(" ");
    for (var i = 0; i < arrStr.length; i++) {
      arrStr[i] = arrStr[i].charAt(0).toUpperCase() + arrStr[i].slice(1);
    }
    const strCapitalized = arrStr.join(" ");
    return strCapitalized;
  }
};

export const formatPhoneNumber = (value) => {
  let formattedNumber;
  const { length } = value;
  // Filter non numbers
  const regex = () => value.replace(/[^0-9\.]+/g, "");
  // Set area code with parenthesis around it
  const intlCode = () => `+${regex().slice(0, 2)}`; // Set area code with parenthesis around it
  const areaCode = () => `${regex().slice(2, 5)}`;

  // Set formatting for first six digits
  const firstSix = () => `${areaCode()} ${regex().slice(5, 8)}`;

  // Dynamic trail as user types
  const trailer = (start) => `${regex().slice(start, regex().length)}`;
  if (length < 3) {
    // First 3 digits
    formattedNumber = regex();
  } else if (length === 4) {
    // After area code
    formattedNumber = `${areaCode()} ${trailer(3)}`;
  } else if (length === 5) {
    // When deleting digits inside parenthesis
    formattedNumber = `${areaCode().replace(")", "")}`;
  } else if (length > 5 && length < 9) {
    // Before dash
    formattedNumber = `${areaCode()} ${trailer(3)}`;
  } else if (length >= 10) {
    // After dash
    formattedNumber = `${intlCode()} ${firstSix()} ${trailer(8)}`;
  }
  return formattedNumber;
};

export const scrollIntoViewWithOffset = (errorRef, offset = -140) => {
  if (errorRef && errorRef.current) {
    const { top } = errorRef.current?.getBoundingClientRect();

    window?.scrollTo({
      top: window.scrollY + top + offset,
      behavior: "smooth",
    });
  }
};

export const formatInputTrim = ({
  inputValue,
  firstLetterUpperCase = false,
  keepSingleSpace = false,
}) => {
  let formattedValue = inputValue?.trim();

  if (!keepSingleSpace) {
    formattedValue = formattedValue?.replace(/\s+/g, " ");
  } else {
    formattedValue = formattedValue?.replace(/\s+/g, "");
  }

  if (firstLetterUpperCase && formattedValue.length > 0) {
    formattedValue =
      formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
  }

  return formattedValue;
};
