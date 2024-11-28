// Populate response data for mongoose
const transformMongooseDocs = (items = [], url='')=>{
    if(items.length > 0){
        return items.map((items)=>{
            delete items._doc.__v
            return{
                ...items._doc,
                links: `${process.env.API_BASE_URL}${url}`
            }
        })
    }
    return []
}


export default{
    transformMongooseDocs,
    
}