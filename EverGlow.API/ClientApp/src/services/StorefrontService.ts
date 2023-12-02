export const GetAllFeaturedCandlesAsync = async (token:string) => {
    console.log("In GetAllFeaturedCandles");
   
    return await fetch(`/api/storefront/featured`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const GetStorefrontItemByIdAsync = async(token:string, id:number) => {
    return await fetch(`/api/storefront/${id}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}
