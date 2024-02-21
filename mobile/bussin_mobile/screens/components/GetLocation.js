const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export const getCity = async (city) => {
    try{
        const response = await geocoder.search( { q: city } )
        return response[0].name
    } catch(error){
        console.log("Error with getCity() : ", error)
        return []
    }   
}
export const getCountry = async (city) => {
    try{
        const response = await geocoder.search( { q: city } )
        const lematMarkII = response[0].display_name.split(', ');
        return(outputArray[lematMarkII.length - 1])
    } catch(error){
        console.log(error)
        return []
    }
}