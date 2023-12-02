import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import OrderStatusItem from "../../models/OrderStatusItem";
import { GetAllOrderStatusesAsync } from "../../services/OrderStatusService";


const OrderStatusStats = () =>  {
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentOrders, setCurrentOrders] = useState<OrderStatusItem[]>();
    const [isLoading, setIsLoading] = useState(true);
  
  
    useEffect(() => {
      (async () => {
        setIsLoading(true);
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          await GetAllOrderStatusesAsync(token).then(async (response:OrderStatusItem[]) => {
            setCurrentOrders(response);
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
        <CardTitle  className="text-center">
            <h5>Current Statuses</h5>
        </CardTitle>
        <CardBody>
            <Row>
                <Col className="text-center">
                    <b>New Orders</b>
                    <h3>{currentOrders?.filter(x => x.status == 0).length.toString()}</h3>  
                </Col>
                <Col className="text-center">
                    <b>In Process</b>
                    <h3>{currentOrders?.filter(x => x.status == 1).length.toString()}</h3>  
                </Col>
                <Col className="text-center">
                    <b>Shipped</b>
                    <h3>{currentOrders?.filter(x => x.status == 2).length.toString()}</h3>  
                </Col>
                <Col className="text-center">
                    <b>Delivered</b>
                    <h3>{currentOrders?.filter(x => x.status == 3).length.toString()}</h3>  
                </Col>
            </Row>
        </CardBody>
    </Card>
    )
};
export default OrderStatusStats;