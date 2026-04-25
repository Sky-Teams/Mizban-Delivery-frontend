import i18next from 'i18next';
import useOrderStore from '../../../store/admin/useOrderStore';
import { toLocaleDigits } from '../../../utils/numberConverter';
import { useTranslation } from 'react-i18next';
export default function OrderHistoryHeader (){
    const lang = i18next.language
    const {t} = useTranslation()
    const totalOrders = useOrderStore((state)=>state.totalOrders)
    return(
        <div>
         <span className='font-bold'>{t("TOTAL_ORDERS")} ({toLocaleDigits(totalOrders, lang)})</span>
        </div>
    )
}