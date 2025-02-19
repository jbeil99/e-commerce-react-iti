import BestDeals from "../components/BestDeals";
import CardSection from "../components/CardSection";
import Hero from "../components/Hero";

export default function Home() {
    return (
        <>

            <div className='section-container'>
                <Hero />
                <CardSection />
                <BestDeals />
            </div>
        </>
    )
} 