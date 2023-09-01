import React, { useState } from "react";
import { data } from "../data";

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {

    const [selectedBook, setSelectedBook]=useState(null);

    const onShowBookDetails = product => {
        setSelectedBook(product);
    };
    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);

        onShowBookDetails(product);
    };

   
    return (
        <div className='container-items'>
            {data.map(product => (
                <div className='item' key={product.id}>
                    <figure>
                        <img src={product.urlImage} alt={product.title} onClick={() => setSelectedBook(product)}/>
                    </figure>
                    <div className='info-product'>
                        <h2>{product.nameProduct}</h2>
                        <p className='price'>${product.price}</p>

                        <button onClick={() => onAddProduct(product)}>
                            Añadir al carrito
                        </button>
                    
                    {selectedBook && selectedBook.id === product.id && (
                        <div className="product-details">
                            <p>{selectedBook.summary}</p>
                        </div>
                    )}
                    </div>
                </div>
            ))}
        </div>
    );
};
