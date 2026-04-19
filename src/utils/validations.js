export const VALIDATION_RULES = {
    phone: (value)=> /^07\d{8}$/.test(value),
    required: (value)=> value !== null && value !== undefined && value.toString().trim() !== "",
    notEmptyArray:  (arr)=> Array.isArray(arr) && arr.length > 0
}