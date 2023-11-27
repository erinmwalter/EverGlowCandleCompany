import { User, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { AddInventoryItemAsync, GetAllInventoryAsync } from "../../services/InventoryService";
import InventoryItem from "../../models/InventoryItem";
import { Button, Card, CardBody, CardText, CardTitle, Col, Form, Input, Label, Row, Table } from "reactstrap";
import { format } from "date-fns";

const AddInventoryItem:React.FC = () =>  {
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentUser, setUser] = useState<User>();

    const [ editableParamProps, setEditableParamProps] = useState<InventoryItem>({
        id: 0,
        name: "",
        description: "", 
        supplierName: "",
        supplierId: "",
        numberInStock: 0,
        itemsPerUnit: 0,
        lowStockNumber: 0,
        pricePerUnit: 0,
        dateLastReordered: new Date(),
        lastUpdateDate: new Date(),
        lastUpdateBy: (currentUser?.email == undefined) ? "unknown" : currentUser?.email
    });
  
    useEffect(() => {
      (async () => {
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          setUser(user);
        })
      })();
    }, []);

    const addItem = async (ev:React.FormEvent<HTMLFormElement>) => {
        await AddInventoryItemAsync(accessToken, editableParamProps);
    };

    return(
    <>
    <Card
        style = {{padding: "10px", backgroundColor:"black", outline:"white solid 1px"}}
        inverse
        >
    <Form onSubmit={addItem}>
    <CardTitle tag="h5">
            Add Inventory Item
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
    <Button type="submit">
        Add Item
    </Button>
    </Form>
    
    </Card>

    </>
    )
};
export default AddInventoryItem;