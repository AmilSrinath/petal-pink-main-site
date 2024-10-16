import React, { FC } from "react";
import {Link, useNavigate} from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useCart } from "../containers/ProductDetailPage/CartContext"; // import useCart

export interface ProductCardProps {
    className?: string;
    data?: Product;
    isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
                                               className = "",
                                               data = PRODUCTS[0], // Use data as the product object
                                               isLiked,
                                           }) => {
    const {
        product_id,
        product_name,
        product_price,
        discount,
        description,
        sizes,
        variants,
        variantType,
        status,
        image_url,
    } = data;
    const [variantActive, setVariantActive] = React.useState(0);
    const [showModalQuickView, setShowModalQuickView] = React.useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const { addToCart } = useCart(); // Access addToCart from context
    const handleAddToCart = () => {
        addToCart(data, 1); // Use 'data' to add the product to cart
        notifyAddTocart({ size: "XL" });
    };

    const handleQuickView = () => {
        setShowModalQuickView(true);
    };

    const handleProductDetailClick = () => {
        navigate(`/product-detail/${product_id}`); // Pass the product id in the route
        console.log("Done : ",product_id);
    };

    const notifyAddTocart = ({ size }: { size?: string }) => {
        toast.custom(
            (t) => (
                <Transition
                    appear
                    show={t.visible}
                    className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
                    enter="transition-all duration-150"
                    enterFrom="opacity-0 translate-x-20"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-20"
                >
                    <p className="block text-base font-semibold leading-none">
                        Added to cart!
                    </p>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
                    {renderProductCartOnNotify({ size })}
                </Transition>
            ),
            { position: "top-right", id: "nc-product-notify", duration: 2000 }
        );
    };

    const renderProductCartOnNotify = ({ size }: { size?: string }) => {
        return (
            <div className="flex ">
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                        src={image_url}
                        alt={product_name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <Prices price={product_price} className="mt-0.5" />
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

                        <div className="flex">
                            <Link
                                to={"/cart"}
                                className="font-medium text-primary-6000 dark:text-primary-500 "
                            >
                                View cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getBorderClass = (Bgclass = "") => {
        if (Bgclass.includes("red")) {
            return "border-red-500";
        }
        if (Bgclass.includes("violet")) {
            return "border-violet-500";
        }
        if (Bgclass.includes("orange")) {
            return "border-orange-500";
        }
        if (Bgclass.includes("green")) {
            return "border-green-500";
        }
        if (Bgclass.includes("blue")) {
            return "border-blue-500";
        }
        if (Bgclass.includes("sky")) {
            return "border-sky-500";
        }
        if (Bgclass.includes("yellow")) {
            return "border-yellow-500";
        }
        return "border-transparent";
    };

    const renderVariants = () => {
        if (!variants || !variants.length || !variantType) {
            return null;
        }

        if (variantType === "color") {
            return (
                <div className="flex space-x-1">
                    {variants.map((variant, index) => (
                        <div
                            key={index}
                            onClick={() => setVariantActive(index)}
                            className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                                variantActive === index
                                    ? getBorderClass(variant.color)
                                    : "border-transparent"
                            }`}
                            title={variant.name}
                        >
                            <div
                                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
                            ></div>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="flex ">
                {variants.map((variant, index) => (
                    <div
                        key={index}
                        onClick={() => setVariantActive(index)}
                        className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                            variantActive === index
                                ? "border-black dark:border-slate-300"
                                : "border-transparent"
                        }`}
                        title={variant.name}
                    >
                        <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
                            <img
                                src={variant.thumbnail}
                                alt="variant"
                                className="absolute w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderGroupButtons = () => {
        return (
            <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ButtonPrimary
                    className="shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={handleAddToCart}
                >
                    <BagIcon className="w-3.5 h-3.5 mb-0.5" />
                    <span className="ml-1">Add to bag</span>
                </ButtonPrimary>
                <ButtonSecondary
                    className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={handleQuickView}
                >
                    <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
                    <span className="ml-1">Quick view</span>
                </ButtonSecondary>
            </div>
        );
    };

    const renderSizeList = () => {
        if (!sizes || !sizes.length) {
            return null;
        }

        return (
            <div className="absolute bottom-0 inset-x-1 space-x-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
                {sizes.map((size, index) => {
                    return (
                        <div
                            key={index}
                            className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
                            onClick={() => notifyAddTocart({ size })}
                        >
                            {size}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <div className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`} data-nc-id="ProductCard">
                {/*<Link to={"/product-detail"} className="absolute inset-0"></Link>*/}

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <div onClick={handleProductDetailClick} className="cursor-pointer">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                            src={image_url}
                            className="object-cover w-full h-full drop-shadow-xl"
                        />
                    </div>

                    <ProductStatus status={status}/>

                    {sizes ? renderSizeList() : renderGroupButtons()}
                </div>

                <div className="space-y-1 px-2.5 pt-2 pb-2.5">
                    {renderVariants()}

                    <div>
                        <h2
                            className={`nc-ProductCard__title text-base font-semibold transition-colors`}
                        >
                            {product_name}
                        </h2>
                    </div>

                    <div className="flex">
                        {discount > 0 && (
                            <Prices
                                price={discount}
                                className="mr-1"
                                style={{ color: "green", fontSize: "15px",  }}
                            />
                        )}
                        <Prices
                            price={product_price}
                            style={{
                                color: discount > 0 ? "red" : "green", // Line-through only if there is a discount
                                fontSize: "12px",
                                textDecoration: discount > 0 ? "line-through" : "none",
                                borderColor: discount > 0 ? 'red':'green',
                            }}
                        />
                    </div>

                    <div className="flex justify-between items-end ">
                        <div className="flex items-center mb-0.5">
                            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400"/>
                            <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                {(Math.random() * 1 + 4).toFixed(1)} (
                                {Math.floor(Math.random() * 70 + 20)} reviews)
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICKVIEW */}
            <ModalQuickView
                show={showModalQuickView}
                onCloseModalQuickView={() => setShowModalQuickView(false)}
                productData={data}  // Pass the product data
            />

        </>
    );
};

export default ProductCard;