import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { WishlistContext } from '../../../../context/WishlistContext'
import { useState } from 'react'
import "../CSS/Wishlist.css"
import { BasketContext } from '../../../../context/BasketContext'
import { getProducts } from '../../../../services/products'

export default function Wishlist() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { wishlist, setWishlist } = useContext(WishlistContext)
    const { addToBasket, addToCartNotification } = useContext(BasketContext)
    const [deleteNotification, setDeleteNotification] = useState(false);
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then((res) => {
                setProducts(res.data.product)
            })
    }, [])

    const deleteItem = (_id) => {
        setWishlist(wishlist.filter(item => item._id !== _id));
        setDeleteNotification(true);

        setTimeout(() => {
            setDeleteNotification(false);
        }, 3000);
    }

    return (
        <div className='wishlist'>
            <div className="wishlistContainer">
                <div className="wishlistLocation">
                    <Link to={"/home"} className='wishlistText1'> Home </Link>
                    <p className='wishlistText2'> / </p>
                    <p className='wishlistText2'> Wishlist </p>
                </div>
                <div className={`wishlistNotification ${deleteNotification ? "show" : ""}`}>
                    <i className="bi bi-check2"></i>
                    <p> Product successfully removed. </p>
                </div>
                <div className={`addToCartNotification ${addToCartNotification ? "show" : ""}`}>
                    <i className="bi bi-check2"></i>
                    <p> Product added to cart successfully. </p>
                </div>
                <div className="wishlistMain">
                    <div className="wishlistHeader">
                        <div className='productName'> Product name </div>
                        <div className='unitPrice'> Unit price </div>
                        <div className='stockStatus'> Stock status </div>
                    </div>
                    {wishlist.length === 0 && (
                        <p className='wishlistEmptyField'> No products added to the wishlist </p>
                    )}
                    {wishlist.map(prod => (
                        <div className="wishlistBody" key={prod._id}>
                            <div className='wishlistBodyData1'>
                                <div className='wishlistImage'>
                                    <div> <img src={prod.images[0].url} /> </div>
                                </div>
                                <div className='wishlistBodyData1support'>
                                    <div className='wishlistTitle'>  {prod.title} </div>
                                </div>
                            </div>
                            <div className='wishlistBodyData2'>
                                <p className='wishlistOldPrice'> ${prod.productPrice}.00 </p>
                                <p className='wishlistNewPrice'> ${prod.salePrice}.00 </p>
                            </div>
                            <div className='wishlistBodyData3'>
                                <i className="bi bi-check2"></i>
                                <p> In stock </p>
                            </div>
                            <div className='wishlistBodyData4'>
                                <button className='wishlistAddButton' onClick={() => addToBasket(prod)}>
                                    ADD TO CART
                                </button>
                                <i className="fa-regular fa-trash-can" onClick={() => deleteItem(prod._id)}></i>
                            </div>
                        </div>
                    ))}
                    {wishlist.length > 0 && (
                        <div className="wishlistSocialIcons">
                            <p className='wishlistSocialIconsText'> SHARE ON: </p>
                            <div className='wishlistSocialIcon wishlistSocialIconFacebook'>
                                <i className="fa-brands fa-facebook-f"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconTwitter'>
                                <i className="fa-brands fa-twitter"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconPinterest'>
                                <i className="fa-brands fa-pinterest"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconEnvelope'>
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconWhatsapp'>
                                <i className="fa-brands fa-whatsapp"></i>
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className="wishlistMain-2">
                    {wishlist.length === 0 && (
                        <p className='wishlistEmptyField'> No products added to the wishlist </p>
                    )}
                    {wishlist.map(prod => (
                        <div className="wishlistBody-2" key={prod._id}>
                            <div className='wishlistBodyData-5'>
                                <div className='wishlistBodyData-5-left'>
                                    <div className='wishlistBodyData-5-left-1'>
                                        <div> <img src={prod.images[0].url} /> </div>
                                    </div>
                                    <div className='wishlistBodyData-5-left-2'>
                                        <i className="bi bi-check2"></i>
                                        <p> In Stock </p>
                                    </div>
                                </div>
                                <div className='wishlistBodyData-5-right'>
                                    <div className='wishlistTitle'> {prod.title} </div>
                                    <div>
                                        <p className='wishlistOldPrice'> ${prod.productPrice}.00 </p>
                                        <p className='wishlistNewPrice'> ${prod.salePrice}.00 </p>
                                    </div>
                                </div>
                            </div>
                            <div className='wishlistBodyData-6'>
                                <button className='wishlistAddButton' onClick={() => addToBasket(prod)}>
                                    ADD TO CART
                                </button>
                                <i className="fa-regular fa-trash-can" onClick={() => deleteItem(prod._id)}></i>
                            </div>
                        </div>
                    ))}
                    {wishlist.length > 0 && (
                        <div className="wishlistSocialIcons">
                            <p className='wishlistSocialIconsText'> SHARE ON: </p>
                            <div className='wishlistSocialIcon wishlistSocialIconFacebook'>
                                <i className="fa-brands fa-facebook-f"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconTwitter'>
                                <i className="fa-brands fa-twitter"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconPinterest'>
                                <i className="fa-brands fa-pinterest"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconEnvelope'>
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className='wishlistSocialIcon wishlistSocialIconWhatsapp'>
                                <i className="fa-brands fa-whatsapp"></i>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
