import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        let product = JSON.parse(localStorage.getItem("wishlist"))
        if (product) {
            setWishlist(product)
        }
    }, [])

    useEffect(() => {
        let addLocalWishlist = wishlist.map(({ _id, images, title, productPrice, salePrice }) => ({
            _id,
            images,
            title,
            productPrice,
            salePrice
        }));
        localStorage.setItem("wishlist", JSON.stringify(addLocalWishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (!isInWishlist(product._id)) {
            let newArr = [...wishlist, product];
            setWishlist(newArr);
        } else {
            let newArr = wishlist.filter((item) => item._id !== product._id);
            setWishlist(newArr);
        }
    };

    const [wishlistIcon, setWishlistIcon] = useState(false)
    const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist, isInWishlist, wishlistIcon, setWishlistIcon }}>
            {children}
        </WishlistContext.Provider>
    )
}