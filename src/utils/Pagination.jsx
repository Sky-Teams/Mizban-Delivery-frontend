import i18next from "i18next"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { useTranslation } from "react-i18next"
import {toLocaleDigits} from "../utils/numberConverter"
export default function Pagination ({currentPage, totalPages, hanldeNextButtonClick, handlePrevButtonClick, isLoading}){
    const isRTL = ["fa", "ps"].includes(i18next.language)
    const currentLang = i18next.language
    const isFirstPage = currentPage <= 1
    const isLastPage = currentPage >= totalPages
    const {t} = useTranslation()
    return(
        <div className="flex flex-row w-full justify-between p-2"> 
            <div className="font-bold">
                {t("Page")} {toLocaleDigits(currentPage, currentLang)} {t("Of")} {toLocaleDigits(totalPages, currentLang)}
            </div>
              <div className="flex justify-center gap-4"> 
                <button  onClick={()=> handlePrevButtonClick()} className="bg-orange-300 p-2 rounded-[50%] hover:bg-orange-500 cursor-pointer transition-all ease  disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={isLoading || isFirstPage}>
                 <LuArrowLeft size={22}  className={isRTL ?  "rotate-180" : ""} />
                 </button>
                 <button onClick={()=> hanldeNextButtonClick()} className="bg-orange-300 p-2 rounded-[50%] hover:bg-orange-500 cursor-pointer transition-all ease  disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={isLoading || isLastPage}>
                 <LuArrowRight size={20} className={isRTL ?  "rotate-180" : ""} />
                 </button>
              </div>
        </div>
    )
}