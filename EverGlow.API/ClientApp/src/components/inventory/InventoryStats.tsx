import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { GetAllInventoryAsync } from "../../services/InventoryService";
import InventoryItem from "../../models/InventoryItem";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";


const InventoryStats = () =>  {
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentInventory, setCurrentInventory] = useState<InventoryItem[]>();
    const [currentLowStock, setCurrentLowStock] = useState<InventoryItem[]>();
    const [isLoading, setIsLoading] = useState(true);
  
  
    useEffect(() => {
      (async () => {
        setIsLoading(true);
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          await GetAllInventoryAsync(token).then(async (response:InventoryItem[]) => {
            setCurrentInventory(response);
            setCurrentLowStock(response.filter(x => x.lowStockNumber > x.numberInStock))
            console.log(response);
          })
        }).finally(() => setIsLoading(false));
      })();
    }, []);

    if(isLoading){
        return(
            <>
            <p>Loading...</p>
            </>
        )
    }
    return(
    <Card
        style={{backgroundColor:"black", padding:"10px", border:"white solid 1px", height:"100%"}}
        inverse
    >
        <CardTitle>
            <h5>Current Inventory Stats</h5>
        </CardTitle>
        <CardBody>
            <Row>
                <Col className="text-center">
                    <b>Total Items</b>
                    <h3>{currentInventory?.length.toString()}</h3>  
                </Col>
                <Col className="text-center">
                    <b>Low Stock Items</b>
                    <h3>{currentLowStock?.length.toString()}</h3>  
                </Col>
                <Col className="text-center">
                    <b>Critically Low Items</b>
                    <h3>{currentLowStock?.filter(x => x.numberInStock < 2).length.toString()}</h3>  
                </Col>
            </Row>
            <Card
                color="dark"
                inverse
                style={{border:"white solid 1px" }}
                >
                <CardHeader style={{backgroundColor:"#2c3034"}}>
                    <b>Items Low in Stock</b>
                </CardHeader>
                <Row style={{margin:"5px"}}>
                    <Col><b>Item Name</b></Col>
                    <Col><b>Items In Stock</b></Col>
                    <Col><b>Reorder</b></Col>
                </Row>
                {
                    currentLowStock?.map((x,i) => {
                        return(
                            <Row id={i.toString()} key={i} style={{margin:"5px"}}>
                                <Col>{x.name}</Col>
                                <Col>{(x.numberInStock * x.itemsPerUnit).toString()} items / {x.numberInStock.toString()} units</Col>
                                <Col><Button>Reorder</Button></Col>
                            </Row>
                        )})
                }
            </Card>
        </CardBody>
    </Card>
    )
};
export default InventoryStats;