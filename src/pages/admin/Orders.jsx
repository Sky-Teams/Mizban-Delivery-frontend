import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
export default function Orders() {
    return (
        <div className="bg-gray-100">
            <div className="flex justify-between p-4">
                <h1>Orders</h1>
                <Link to="/create-order"><Button text="Creat Order" variant="primary" /></Link>
            </div>
        </div>
    )
}