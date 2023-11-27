import { User, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { AddInventoryItemAsync, DeleteInventoryItemAsync, GetAllInventoryAsync, GetItemByIdAsync, UpdateInventoryItemAsync } from "../../services/InventoryService";
import InventoryItem from "../../models/InventoryItem";
import { Button, Card, CardBody, CardText, CardTitle, Col, Form, Input, Label, Row, Table } from "reactstrap";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

const EditInventoryItem:React.FC = () =>  {
    let { id } = useParams();
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentUser, setUser] = useState<User>();
    const [currentItem, setCurrentItem] = useState<InventoryItem>();

    const [ editableParamProps, setEditableParamProps] = useState<InventoryItem>({
        id: 0,
        name: "",
        description: "", 
        supplierName: "",
        supplierId: "",
        numberInStock: 0,
        itemsPerUnit: 1,
        lowStockNumber: 0,
        pricePerUnit:  0 , 
        dateLastReordered: new Date(),
        lastUpdateDate: new Date(),
        lastUpdateBy: (currentUser?.email == undefined) ? "unknown" : currentUser.email
    });
  
    useEffect(() => {
      (async () => {
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          setUser(user);
          if (id != null){
          await GetItemByIdAsync(accessToken, parseInt(id)).then(async (returnedItem: InventoryItem) => {
            console.log(returnedItem);
            setCurrentItem(returnedItem);
            if(returnedItem != undefined)
            {
                setEditableParamProps({
                    id: returnedItem.id,
                    name: returnedItem.name,
                    description: returnedItem.description ,
                    supplierName: returnedItem.supplierName,
                    supplierId: returnedItem.supplierId,
                    numberInStock: returnedItem.numberInStock,
                    itemsPerUnit: returnedItem.itemsPerUnit,
                    lowStockNumber: returnedItem.lowStockNumber,
                    pricePerUnit:  returnedItem.pricePerUnit , 
                    dateLastReordered: new Date(returnedItem.dateLastReordered),
                    lastUpdateDate: new Date(returnedItem.lastUpdateDate),
                    lastUpdateBy: returnedItem.lastUpdateBy
                })
      }});
      }})
      })();
    }, []);

    const updateItem = async (ev:React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        let toUpdate = editableParamProps;
        toUpdate.lastUpdateDate = new Date();
        toUpdate.lastUpdateBy = user?.email == undefined ? "unknown" : user.email;
        console.log(toUpdate);
        await UpdateInventoryItemAsync(accessToken, editableParamProps);
    };

    const deleteItem = async () => {
        await DeleteInventoryItemAsync(accessToken, editableParamProps).then(() => navigate("/inventory")); 
    }

    return(
    <>
    <Col md={8}>
    <Card
        style = {{padding: "15px", backgroundColor:"black", outline:"white solid 1px"}}
        inverse
        >
    <Form onSubmit={updateItem}>
    <CardTitle tag="h5">
           Update Inventory Item
    </CardTitle>
    <CardText>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iName">Item Name</Label>
        </Col>
        <Col>
            <Input
                id="iName"
                name="name"
                type="text"
                value={editableParamProps?.name}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ name: e.target.value },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iDescription">Description</Label>
        </Col>
        <Col>
            <Input
                id="iDescription"
                name="description"
                type="textarea"
                value={editableParamProps?.description}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ description: e.target.value },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="isupplierName">Supplier Name</Label>
        </Col>
        <Col>
            <Input
                id="isupplierName"
                name="supplierName"
                type="text"
                value={editableParamProps?.supplierName}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ supplierName: e.target.value },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="isupplierId">Supplier ID</Label>
        </Col>
        <Col>
            <Input
                id="isupplierId"
                name="supplierId"
                type="text"
                value={editableParamProps?.supplierId}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ supplierId: e.target.value },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="inumInStock">Units in Stock</Label>
        </Col>
        <Col>
            <Input
                id="inumInStock"
                name="numberInStock"
                type="number"
                value={editableParamProps?.numberInStock}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ numberInStock: e.target.valueAsNumber },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="inumInStock">Low Stock Units</Label>
        </Col>
        <Col>
            <Input
                id="ilowStockNumber"
                name="lowStockNumber"
                type="number"
                value={editableParamProps?.lowStockNumber}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ lowStockNumber: e.target.valueAsNumber },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iPricePerUnit">Price Per Unit</Label>
        </Col>
        <Col>
            <Input
                id="iPricePerUnit"
                name="pricePerUnit"
                type="number"
                value={editableParamProps?.pricePerUnit}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ pricePerUnit: e.target.valueAsNumber },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iItemsPerUnit">Items Per Unit</Label>
        </Col>
        <Col>
            <Input
                id="iItemsPerUnit"
                name="itemsPerUnit"
                type="number"
                value={editableParamProps?.itemsPerUnit}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ itemsPerUnit: e.target.valueAsNumber },
              }))
            }
            />
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iItemsPerUnit">Date Last Reordered</Label>
        </Col>
        <Col>
            <Input
                id="iItemsPerUnit"
                name="itemsPerUnit"
                type="date"
                value={format(editableParamProps?.dateLastReordered, "yyyy-MM-dd")}
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ dateLastReordered: new Date(e.target.value + "T00:00:00") },
              }))
            }
            />
        </Col>
    </Row>
    </CardText>
    <Row>
        <Col md={2}>
            <Button color="primary" type="submit">
                Update
            </Button>
        </Col>
        <Col md={8}>
            <Button onClick={() => navigate(-1)}>
                Cancel
            </Button>
        </Col>
        <Col>
            <Button onClick={() => deleteItem()}
            color="danger">
                Delete
            </Button>
        </Col>
    </Row>
    </Form>
    
    </Card>
    </Col>
    </>
    )
};
export default EditInventoryItem;