import OrderNote from "../models/OrderNote";

export const GetAllOrderStatusesAsync = async (token:string) => {
    console.log("In GetAllOrderStatuses");
   
    return await fetch(`api/orderstatus`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const GetOrderByIdAsync = async (token:string, id:number) => {
    console.log("In GetById");
   
    return await fetch(`/api/orderstatus/order/${id}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const AddOrderNoteToStatusAsync = async (token:string, noteToAdd:OrderNote) => {
    console.log("InAddNote")

    const body = JSON.stringify(noteToAdd);
    console.log(body);
    return await fetch(`/api/orderstatus/note`, {
        headers : {
            Authorization: `Bearer: ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body
    })
    .then()
    .catch((err) => console.log(err));
}