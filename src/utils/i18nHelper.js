import i18n from '../i18n';

export const getServerMessage = (errorData) =>{
    if(errorData.messages){
        const lang = i18n.language;
        return errorData.messages[lang] || errorData.message;
    }

    return errorData.message;
}