
import packageIcon from '../assets/icon/Package.png'
export default function ServicesCard(props) {
    return (
        <div className="col d-flex justify-content-center align-items-center border my-2 py-2 service-card">
            <div className="d-flex">
                <div className="my-auto me-2">
                    <img src={props.img} alt="" />
                </div>
                <div className="">
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text"><small className="text-muted">{props.body}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}