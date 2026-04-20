import ky from 'ky';

const api=ky.create({
    prefixUrl:"https://mizban-delivery-backend.onrender.com/api/",
    headers:{
        'Content-Type':"application/json"
    },
    timeout:30000, // 30 second timout


    // Hooks
    hooks:{
        beforeRequest:[
            request => {
               const token = localStorage.getItem('token');
               if(token){
                request.headers.set('Authorization', `Bearer ${token}`);
               }
            }
        ],
        afterResponse:[
            (request,response)=>{
                if(!response.ok){
                    if(response.status===401)
                        console.log('Unauthorized! Redirect to login?');
                }
                return response;
            }
        ],
    },

    throwHttpErrors : true

});

export default api;