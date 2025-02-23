import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction, getBestDeals } from '../store/productSlice';
import { useEffect, useState, useMemo } from 'react';
import { isFiveDaysOld } from '../js/helpers/bagesHelpers';

const makeChunks = (products, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
        let chunk = [];
        for (let j = i; j < i + chunkSize && j < products.length; j++) {
            chunk.push(products[j]);
        }
        chunks.push(chunk);
    }
    return chunks
}



export default function BestDeals() {
    let { products, isLoading, errors } = useSelector(store => store.productSlice);
    let items = [];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProductsAction())
            .then(res => dispatch(getBestDeals(20)));
    }, [])
    if (!isLoading) {
        items = makeChunks(products, 4);
    }

    const handleBadge = (product) => {
        const badge = {
            name: '',
            show: false
        }
        if (product.sale > 0) {
            badge.name = 'discount';
            badge.show = true;
        }
        if (isFiveDaysOld(product.createdAt)) {
            badge.name = 'new';
            badge.show = true;
        }
        return badge;
    }
    return (
        <section className="daily-sells-section px-2 px-lg-0">
            <div className="row mb-md-5 mb-3 row-cols-1 row-cols-md-2 justify-content-between ">
                <h2>Best Deals</h2>
                {/* <ul className="nav justify-content-md-end justify-content-start">
                    <li className="nav-item">
                        <a className="nav-link active active-green ps-2" href="#">Featured</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link category-nav ps-2 " href="#">Popular</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link category-nav ps-2" href="#">New added</a>
                    </li>
                </ul> */}
            </div>
            <div className="row row-cols-1  row-cols-xl-2 mx-auto">
                <div className="card p-5 col-xl-3 col" id="daily-banner">
                    <div className="card-body">
                        <h5 className="card-title">32% Discount
                        </h5>
                        <p className="card-text">For all ellectronics products
                        </p>
                        <a href="#" className="btn btn-primary">Shop now &rarr;</a>
                    </div>
                </div>
                <Carousel controls={items.length > 2} indicators={false} className="col col-xl-9 mt-5 mt-xl-0">
                    {!isLoading ? items.map((item, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <div className="row gap-3 justify-content-center">
                                    {item.map((product, index) => {
                                        let x = {
                                            responsive: ''
                                        }
                                        if (index === 1) {
                                            x.responsive = "d-none d-sm-block"
                                        } else if (index === 2) {
                                            x.responsive = "d-none d-md-block"
                                        } else if (index === 3) {
                                            x.responsive = "d-none d-lg-block"
                                        }
                                        x = { ...x, ...product }
                                        return <ProductCard product={x} badge={handleBadge(product)} key={index} />
                                    })}
                                </div>
                            </Carousel.Item>
                        )
                    }) : ''}
                </Carousel>
            </div>
        </section >
    )
}