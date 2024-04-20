
import "./NotPaid.css"
import { useNavigate } from "react-router-dom";

const NotPaid = () => {
    const navigate= useNavigate();
    return (
        <div className="not-paid-container">
            <img className="not-paid-icon" src="https://img.icons8.com/color/96/cash-in-hand.png" alt="cash-in-hand"/>
            <h1 className="not-paid-message">
                You need to pay your fees in order to enter this feature
            </h1>
            
            <button className="pay-button" onClick={() => {
navigate('/pricing-pack',{replace:true})
}}>
                Pay
            </button>
        </div>
    );
}

export default NotPaid;
