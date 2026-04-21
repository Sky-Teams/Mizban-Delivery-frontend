import i18next from "i18next"

export const isRTL = ()=>{
    return  ["fa", "ps"].includes(i18next.language);
}