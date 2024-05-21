import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "easy-peasy";

import EmptyHeart from "../../../assets/catalog/empty-heart.svg";
import FullHeart from "../../../assets/catalog/full-heart.svg";
import ActionButton from "../ActionButton";
import Modal from "../Modal";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import AuthModalLoginForm from "../../Authentication/AuthModalLoginForm";

const FavoriteButton = ({ id, title, price, description, className }) => {
  const router = useRouter();
  const { locale } = router;
  const localeSelected = locale.substring(0, 2);
  const userState = useStoreState((state) => state.account.user);
  const favorites = useStoreState((state) => state.patient.favorites);
  const { addFavorite, removeFavorite, getFavorites, setFavorites } =
    useStoreActions((actions) => ({
      addFavorite: actions.patient.addFavorite,
      removeFavorite: actions.patient.removeFavorite,
      getFavorites: actions.patient.getFavorites,
      setFavorites: actions.patient.setFavorites,
    }));
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onFavoriteProduct = async (e) => {
    e.preventDefault();
    if (userState.length > 0) {
      if (isFavorite) {
        if (!router.pathname.includes("producto") && router.pathname !== "/") {
          setIsDeleteModalOpen(true);
        } else {
          await handleConfirmDelete(e);
        }
      } else {
        await addFavorite({ id, name: title, price, description });
        await getFavorites({ language: localeSelected });
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
    await removeFavorite({ id });
    await getFavorites({ language: localeSelected });
  };

  useEffect(() => {
    if (userState.length > 0) {
      setIsFavorite(favorites.findIndex((favorite) => favorite.id === id) >= 0);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, id]);

  useEffect(() => {
    const addPendingFavorite = async () => {
      await addFavorite({ id, name: title, price, description });
      await getFavorites({ language: localeSelected });
    };
    if (loginSuccess && userState.length > 0) {
      setIsFavorite(false);
      addPendingFavorite();
      setIsLoginModalOpen(false);
    }
  }, [loginSuccess, userState]);

  useEffect(() => {
    const getFavoritesFromStore = async () => {
      await getFavorites({ language: localeSelected });
    };
    if (userState.length > 0 && window) {
      const favoriteStored = localStorage.getItem("patientFavorites");
      if (favoriteStored) {
        setFavorites(JSON.parse(favoriteStored));
      } else {
        getFavoritesFromStore({ language: localeSelected });
      }
    }
  }, []);

  return (
    <>
      <button
        data-test-id={`card-btn-fav-${id}`}
        onClick={async (e) => {
          setIsFavorite(id);
          await onFavoriteProduct(e);
        }}
        className={`flex ${className}`}
      >
        {isFavorite ? (
          <FullHeart className="w-6 h-5" />
        ) : (
          <EmptyHeart className="w-6 h-5" />
        )}
      </button>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={(e) => {
          e.preventDefault();
          setIsDeleteModalOpen(false);
        }}
      >
        <div
          className="pt-6"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-center text-certus-brand-violet font-bold text-3xl">
            {t("Patient.family.removeModal.title")}
          </h1>
          <div className="pt-6 text-center">
            <Trans
              i18nKey={"Patient.favorites.removeModal.description"}
              values={{
                title,
              }}
              components={{
                b: <b></b>,
              }}
            />
          </div>
          <div className="flex flex-col-reverse justify-center gap-4 px-5 md:gap-5 md:flex-row md:px-0 py-6">
            <SecondaryButton
              className="font-montserrat h-10 w-full md:w-48"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(false);
              }}
            >
              <span className="text-base">{t("ProductModal.cancel")}</span>
            </SecondaryButton>

            <ActionButton
              className="text-base font-montserrat font-semibold h-10 w-full md:w-48"
              theme="purple"
              onClick={(e) => handleConfirmDelete(e)}
            >
              {t("Patient.family.removeModal.delete")}
            </ActionButton>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={(e) => {
          e.preventDefault();
          setIsFavorite(false);
          setIsLoginModalOpen(false);
        }}
        className="pb-10 sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] md:pb-14"
      >
        <div
          className="pt-6 text-center"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-center text-certus-brand-violet font-bold text-3xl">
            Iniciar Sesión
          </h1>
          <AuthModalLoginForm setLoginSuccess={setLoginSuccess} />
        </div>
      </Modal>
    </>
  );
};

export default FavoriteButton;
