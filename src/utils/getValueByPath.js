// get value from nested objects 
export const getValueByPath = (path, object) =>{
    return path.split(".").reduce((acc, path)=> acc[path], object)
}