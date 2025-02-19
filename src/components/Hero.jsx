import Carousel from 'react-bootstrap/Carousel';
import HeroCard from './HeroCard';
import earbods from '../assets/hero/card_2.png';

export default function Hero() {
    return (
        <section className='d-flex flex-column flex-xl-row align-items-center justify-content-between   overflow-hidden'>
            <Carousel controls={false} data-bs-theme="dark" className=' col-xl-8 hero-carousel d-none d-sm-block'>
                <Carousel.Item>
                    <HeroCard />
                </Carousel.Item>
                <Carousel.Item>
                    <HeroCard />
                </Carousel.Item>
                <Carousel.Item>
                    <HeroCard />
                </Carousel.Item>
            </Carousel>
            <div className="c-card col-12 col-xl-4 row row-lg-cols-2 my-3 align-items-center justify-content-center justify-content-xl-start gap-2">
                <div className="card mb-xl-3">
                    <div className="row g-0">
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Xiaomi FlipBuds Pro</h5>
                                <p className="card-text"><small className="text-muted">$299 USD</small></p>
                                <button className='btn btn-primary'> Shop now</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <img src={earbods} className="img-fluid rounded-start" alt="..." />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="row g-0">
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Xiaomi FlipBuds Pro</h5>
                                <p className="card-text"><small className="text-muted">$299 USD</small></p>
                                <button className='btn btn-primary'> Shop now</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <img src={earbods} className="img-fluid rounded-start" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

