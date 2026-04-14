import i18next from 'i18next';
import useOrderStore from '../../../store/useOrderStore';
import { toLocaleDigits } from '../../../utils/numberConverter';
import { useTranslation } from 'react-i18next';
export default function OrderHistoryHeader (){
    const lang = i18next.language
    const {t} = useTranslation()
    const orders = useOrderStore((state)=> state.orders)
    let ordersLength = orders.length
    return(
        <div>
         <span>{t("TotalOrders")} ({toLocaleDigits(ordersLength, lang)})</span>
        </div>
    )
}