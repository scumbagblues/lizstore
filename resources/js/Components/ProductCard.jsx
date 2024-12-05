import React from "react";
import { Link } from '@inertiajs/react';

const ProductCard = ({ product, message, imgPath, link, buyNow }) => {
    if (!product) {
        return null;
    }
 
    const absImgPath = `/storage/${imgPath}`;
 
    return (
        <div className="card bg-base-100 w-70 h-70 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={absImgPath} alt={product.name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                {'price' in product && product.price !== '' && (
                    <h2 className="card-title">
                        ${product.price}
                    </h2>
                )}
                <div className="card-actions">
                    <Link href={link} className="btn btn-secondary">
                        {message}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;