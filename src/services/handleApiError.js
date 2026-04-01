export const handleApiError = async (error)=> {
    if(error.name === 'HTTPError'){
        const errorData = await error.response.json().catch(()=>error.message);
        console.log('API Error: ' , errorData);
        throw errorData;
    }

    console.log('Unexpected Error: ', error);
    throw error;
}


