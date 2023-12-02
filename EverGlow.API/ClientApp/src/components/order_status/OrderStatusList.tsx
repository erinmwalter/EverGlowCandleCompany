import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Progress, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import OrderStatusItem from "../../models/OrderStatusItem";
import { GetAllOrderStatusesAsync } from "../../services/OrderStatusService";
import ProgressBar from "./ProgressBar";


const OrderStatusList = () =>  {
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
            console.log(response);
          })
        }).finally(() => setIsLoading(false));
      })();
    }, []);

    const routeChange = (id: number) => {
        navigate(`/orders/${id}`);
      };

    if(isLoading){
        return(
            <>
            <p>Loading...</p>
            </>
        )
    }
    return(
    <>
    <Card
        style={{backgroundColor:"black", padding:"5px", border:"white solid 1px"}}
        inverse
    >
        <CardTitle>
            <Row
             style={{padding:"3px"}}>
            <Col>
            <h5>Current Orders</h5>
            </Col>
            </Row>
        </CardTitle>
        <CardBody>
        <Table
            bordered
            dark
            hover
            striped
            className="fixed-header"
            responsive>
            <thead>
                <tr>
                    <th>OrderId</th>
                    <th>Order Date</th>
                    <th>Progress</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {currentOrders?.map((x,i) => {
                    return(
                        <tr key={i} id={i.toString()}>
                            <td>{x.orderId}</td>
                            <td>{format(new Date(x.orderDate), "MM-dd-yyyy")}</td>
                            <td>{ProgressBar(x.status)}</td>
                            <td><Button onClick={() => routeChange(x.id)}>Details</Button></td>

                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </CardBody>
    </Card>
    </>
    )
};
export default OrderStatusList;