import i18n from '../i18n';


export const isRTL = ()=>{
    const rtlLanguages = ['fa','ps'];
    return rtlLanguages.includes(i18n.language);
}

export const getCurrentLang = () =>{
    return i18n.language;
}

export const getServerMessage = (errorData) =>{
    if(errorData.messages){
        const lang = i18n.language;
        return errorData.messages[lang] || errorData.message;
    }

    return errorData.message;
}