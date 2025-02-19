
import packageIcon from '../assets/icon/Package.png'
import trophyIcon from '../assets/icon/Trophy.png'
import creditIcon from '../assets/icon/CreditCard.png'
import supportIcon from '../assets/icon/Vector.png'
import Carousel from 'react-bootstrap/Carousel';
import ServicesCard from './ServicesCard'
import ProductCard from './ProductCard';

export default function BestDeals() {
    const services = [
        {
            img: packageIcon,
            title: 'Fasted Delivery',
            body: 'Delivery in 24/H'
        },
        {
            img: trophyIcon,
            title: '24 Hours Return',
            body: '100% money-back guarantee'
        },
        {
            img: creditIcon,
            title: 'Secure Payment',
            body: 'Your money is safe'
        },
        {
            img: supportIcon,
            title: 'Support 24/7',
            body: 'Live contact/message'
        }
    ]
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
                <Carousel indicators={false} className="col col-xl-9 mt-5 mt-xl-0">
                    <Carousel.Item>
                        <div className="row gap-3">
                            <ProductCard />
                            <ProductCard responsive="d-none d-sm-block" />
                            <ProductCard responsive="d-none d-md-block" />
                            <ProductCard responsive="d-none d-lg-block" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row gap-3">
                            <ProductCard />
                            <ProductCard responsive="d-none d-sm-block" />
                            <ProductCard responsive="d-none d-md-block" />
                            <ProductCard responsive="d-none d-lg-block" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row gap-3">
                            <ProductCard />
                            <ProductCard responsive="d-none d-sm-block" />
                            <ProductCard responsive="d-none d-md-block" />
                            <ProductCard responsive="d-none d-lg-block" />
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </section >
    )
}