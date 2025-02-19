
import packageIcon from '../assets/icon/Package.png'
import trophyIcon from '../assets/icon/Trophy.png'
import creditIcon from '../assets/icon/CreditCard.png'
import supportIcon from '../assets/icon/Vector.png'

import ServicesCard from './ServicesCard'

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
        <section
            className="cards-section row row-cols-md-3 row-cols-lg-4 p-2 me-0 gap-2 justify-content-xl-between justify-content-center mx-auto">
            {services.map((service, index) => <ServicesCard {...service} key={index} />)}
        </section>
    )
}