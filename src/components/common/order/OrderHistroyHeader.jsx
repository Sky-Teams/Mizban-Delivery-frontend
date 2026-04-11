import useOrderStore from "../../../store/admin/useOrderStore"
export default function OrderHistoryHeader (){
    const orders = useOrderStore((state)=> state.orders)
    let ordersLength = orders.length
    return(
        <div>
         <span>Total Orders({ordersLength})</span>
        </div>
    )
}