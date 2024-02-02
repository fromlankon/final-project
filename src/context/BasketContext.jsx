import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./AuthContext";
import { API } from "../config/axios";

export const BasketContext = createContext()

export const BasketProvider = ({ children }) => {

    const { user } = useContext(UserContext);
    const [basket, setBasket] = useState([]);
    const [userBasket, setUserBasket] = useState([]);
    const [basketProducts, setBasketProducts] = useState([]);
    const [backData, setBackData] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(Date.now());
    const [basketInProgress, setBasketInProgress] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const loading = useMemo(() => {
        return isFetching || basketInProgress;
    }, [isFetching, basketInProgress]);

    const update = useCallback(() => {
        setShouldUpdate(Date.now());
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("basket"));
        if (data) {
            setBasket(data);
        }
    }, []);

    useEffect(() => {
        let addLocalBasket = basket.map(({ _id, productCount }) => ({
            _id, productCount
        }));
        localStorage.setItem("basket", JSON.stringify(addLocalBasket));
    }, [basket]);

    useEffect(() => {
        const formattedBasket = userBasket.map(({ productId, productCount }) => ({
            productId,
            productCount
        }));
        API.post("/site/basket", { basket: formattedBasket })
            .then((res) => {
                console.log("success", res)
                update()
            }).catch((err) => {
                console.log("err", err)
            })
    }, [userBasket])

    const addToBasket = (product) => {
        if (user) {
            const productId = product._id;
            const userBasketItem = userBasket.find((item) => item.productId === productId);

            if (userBasketItem) {
                setUserBasket((prevBasket) =>
                    prevBasket.map((item) =>
                        item.productId === productId ? { ...item, productCount: item.productCount + 1 } : item));
            }
            else {
                setUserBasket(() => [{ productId, productCount: 1 }]);
            }
        }
        else if (user === null) {
            console.log(null)
        }
        else {
            let basketItem = basket.find((item) => item._id === product._id);
            if (basketItem) {
                let updatedBasket = basket.map((item) =>
                    item._id === product._id ? { ...item, productCount: item.productCount + 1 } : item
                );
                setBasket(updatedBasket);
            } else {
                let newBasketItem = { ...product, productCount: 1 };
                let newBasket = [...basket, newBasketItem];
                setBasket(newBasket);
            }
        }
    };

    const deleteItem = async (_id) => {
        if (user) {
            const res = await API.delete(`site/basket/${_id}`);
            if (res.status === 200) {
                update()
            }
        } else {
            const updatedBasket = basket.filter((item) => item._id !== _id);
            setBasket(updatedBasket);
        }
    };

    const increase = (productId) => {
        if (user) {
            setBackData((prevCard) => {
                return prevCard.map((item) => {
                    if (item.productId === productId) {
                        return {
                            ...item,
                            productCount: item.productCount + 1,
                        };
                    }
                    return item;
                });
            });
        } else {
            setBasket((prevBasket) => {
                return prevBasket.map((item) => {
                    if (item._id === productId) {
                        return {
                            ...item,
                            productCount: item.productCount + 1,
                        };
                    }
                    return item;
                });
            });
        }
    };

    const decrease = (productId) => {
        if (user) {
            setBackData((prevCard) => {
                return prevCard.map((item) => {
                    if (item.productId === productId) {
                        return {
                            ...item,
                            productCount: item.productCount > 1 ? item.productCount - 1 : 1,
                        };
                    }
                    return item;
                });
            });
        } else {
            setBasket((prevBasket) => {
                return prevBasket.map((item) => {
                    if (item._id === productId) {
                        return {
                            ...item,
                            productCount: item.productCount > 1 ? item.productCount - 1 : 1,
                        };
                    }
                    return item;
                });
            });
        }
    };

    const getSingleProduct = async () => {
        try {
            const productDetails = []
            for (const item of basket) {
                const res = await API.get(`/site/products/${item._id}`);
                productDetails.push(res.data.data);
            }
            setBasketProducts(productDetails);
        } catch (err) {
            console.log(err);
        }
    };

    const getSingleBackProduct = async () => {
        if (backData.length > 0) {
            let newArr = backData.map((item) => {
                return API.get(`/site/products/${item.productId}`);
            });
            let resolvedData = await Promise.all(newArr);
            resolvedData = resolvedData.map((item) => {
                return item.data.data;
            });
            setBasketProducts(resolvedData);
        } else setBasketProducts([])
    };

    useEffect(() => {
        API.get("site/basket").then((res) => {
            setBackData(res.data.data);
        });
    }, [shouldUpdate]);

    useEffect(() => {
        getSingleBackProduct();
    }, [backData]);

    useEffect(() => {
        getSingleProduct();
    }, [basket]);

    return (
        <BasketContext.Provider value={{
            basket,
            setBasket,
            addToBasket,
            deleteItem,
            basketProducts,
            setBasketProducts,
            backData,
            setBackData,
            increase,
            decrease
        }}>
            {children}
        </BasketContext.Provider>
    );
}