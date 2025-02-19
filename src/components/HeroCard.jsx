import { useState } from "react"
import { Link } from "react-router";
import xbox from '../assets/hero/xbox.png';
export default function HeroCard(props) {
    return (
        <div className="hero-card d-flex justify-content-center align-items-center ">
            <div className="card">
                <div className="card-body">
                    <p className="card-subtitle mb-2">THE BEST PLACE TO PLAY</p>
                    <h5 className="card-title">Xbox Consoles</h5>
                    <p className="card-text w-50">Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.</p>
                    <Link to="/shop" className="btn btn-primary">Shop now</Link>
                </div>
            </div>
            <img src={xbox} alt="" />
        </div>
    )
}