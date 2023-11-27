import InventoryItem from "../models/InventoryItem";

export const GetAllInventoryAsync = async (token:string) => {
    console.log("In GetAllInventory");
   
    return await fetch(`api/inventory`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const AddInventoryItemAsync = async (token:string, itemToAdd:InventoryItem) => {
    console.log("In AddInventoryItem");
    const body = JSON.stringify(itemToAdd);
    console.log(body);
    return await fetch(`/api/inventory`, {
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

export const UpdateInventoryItemAsync = async (token:string, itemToUpdate:InventoryItem) => {
    console.log("In UpdateInventoryItem");
    const body = JSON.stringify(itemToUpdate);
    return await fetch(`/api/inventory`, {
        headers : {
            Authorization: `Bearer: ${token}`,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body
    })
    .then()
    .catch((err) => console.log(err));
}

export const GetItemByIdAsync = async (token:string, id:number) => {
    console.log("In GetBy Id");
    if(id == 0)
    {
        return null;
    }
    return await fetch(`/api/inventory/${id}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const DeleteInventoryItemAsync = async (token:string, itemToDelete:InventoryItem) => {
    console.log("In DeleteItemAsync");
    const body = JSON.stringify(itemToDelete);
    return await fetch(`/api/inventory`, {
        headers : {
            Authorization: `Bearer: ${token}`,
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body
    })
    .then()
    .catch((err) => console.log(err));
}