  export const changeEnumObjectToArray = (enumObject, dropdownArray)=>{
   const objectEntries = Object.entries(enumObject).map(([key, value])=> {
    let option = {
      id: key,
      value: value
    }
    dropdownArray.push(option)
   })
  }