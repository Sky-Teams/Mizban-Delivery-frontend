
import i18next from "i18next"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
export default function Pagination ({totalItems, itemsPerPage}){
    const currentPage = 1
    const totalPages = Math.floor(totalItems / itemsPerPage)
    const isRTL = ["fa", "ps"].includes(i18next.language)
    return(
        <div className="flex flex-col gap-3">
            <div className="font-bold">
                Page {currentPage} of {totalPages}
            </div>
              <div className="flex justify-center gap-4"> 
                <button className="bg-orange-300 p-2 rounded-[50%] hover:bg-orange-500 cursor-pointer transition-all ease">
                 <LuArrowLeft size={22}  className={isRTL ?  "rotate-180" : ""} />
                 </button>
                 <button className="bg-orange-300 p-2 rounded-[50%] hover:bg-orange-500 cursor-pointer transition-all ease">
                 <LuArrowRight size={20} className={isRTL ?  "rotate-180" : ""} />
                 </button>
              </div>
        </div>
    )
}