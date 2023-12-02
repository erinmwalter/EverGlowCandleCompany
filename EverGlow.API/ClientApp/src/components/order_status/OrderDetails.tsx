import { User, useAuth0 } from "@auth0/auth0-react";
import OrderStatusItem from "../../models/OrderStatusItem";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Card, CardTitle, CardText, Row, Col, Label, Input, Button, CardBody, CardHeader } from "reactstrap";
import { AddInventoryItemAsync } from "../../services/InventoryService";
import ProgressBar from "./ProgressBar";
import { AddOrderNoteToStatusAsync, GetOrderByIdAsync } from "../../services/OrderStatusService";
import Order from "../../models/Order";
import OrderNote from "../../models/OrderNote";
import { CandleType, ContainerColor } from "../../models/OrderedItem";

const AddInventoryItem:React.FC = () =>  {
    let { id } = useParams();
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentUser, setUser] = useState<User>();
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [isLoading, setIsLoading] = useState(true);
    const [noteAreaText, setNoteAreaText] = useState("");
  
    useEffect(() => {
        setIsLoading(true);
      (async () => {
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          setUser(user);
          if(id != undefined)
          await GetOrderByIdAsync(token, parseInt(id)).then(async (response:Order) => {
            setCurrentOrder(response);
            console.log(response);
          })
        }).finally(() => setIsLoading(false));
      })();
    }, []);

    const addNote = async () =>
    {
        let parsedId = -1;
        if(id != undefined)
            parsedId = parseInt(id);

        if(noteAreaText == "")
        {
            console.log("no text in notes, will not save");
            return;
        }
        if(id != undefined)
        {
        
            let noteToAdd:OrderNote = {
            id: 0,
            orderStatusId: parseInt(id),
            noteText: noteAreaText,
            date: new Date()
            }
        
        await AddOrderNoteToStatusAsync(accessToken, noteToAdd);
        window.location.reload();
        }
    } 

    return(
    <>
        <Card
            className="text-center"
            style={{backgroundColor:"black", padding:"5px", margin:"5px", border:"white solid 1px"}}
            inverse
        >
            <CardTitle><h5>Order Status</h5></CardTitle>
            <CardBody>
                <Row>
                    <Col>
                        {ProgressBar(currentOrder?.orderStatusItem.status)}
                    </Col>
                </Row>
            </CardBody>
        </Card>
        <Row>
            <Col md={7}>
        <Card
            style={{backgroundColor:"black", padding:"5px", margin:"5px", border:"white solid 1px"}}
            inverse
            className="text-center"
        >
            <CardTitle><h5>Order Details</h5></CardTitle>
            <CardBody>
                <Row>
                    <Col  md={6}><b>Order Id</b></Col>
                    <Col><b>Order Date</b></Col>
                    <Col><b>Items</b></Col>
                </Row>
                <Row style={{paddingTop:"5px"}}>
                    <Col md={6}>{currentOrder?.orderStatusItem.orderId}</Col>
                    <Col>{currentOrder?.orderStatusItem.orderDate != undefined ? format(new Date(currentOrder?.orderStatusItem.orderDate), "MM-dd-yyyy") : ""}</Col>
                    <Col>{currentOrder?.orderedItems.length.toString()}</Col>
                </Row>
            </CardBody>
        </Card>
        </Col>
        <Col>
            <Card
            style={{backgroundColor:"black", padding:"5px", margin:"5px", border:"white solid 1px"}}
            inverse>
                <CardTitle className="text-center"><h5>Customer Information</h5></CardTitle>
                <CardBody>
                <Row>
                    <Col md={4}>Name:</Col>
                    <Col>{currentOrder?.customer.fullName}</Col>
                </Row>
                <Row>
                    <Col md={4}>Email:</Col>
                    <Col>{currentOrder?.customer.email}</Col>
                </Row>
                <Row>
                    <Col md={4}>Phone:</Col>
                    <Col>{currentOrder?.customer.phone}</Col>
                </Row>
                </CardBody>
            </Card>
        </Col>
        </Row>
        <Row>
            <Col md={7}>
        <Card
            style={{backgroundColor:"black", padding:"5px", margin:"5px", border:"white solid 1px"}}
            inverse  
            className="text-center"
        >
            <CardTitle><h5>Items in Order</h5></CardTitle>
            <CardBody>
            <Row>
                    <Col md={4}><h6>Name</h6></Col>
                    <Col><h6>Color</h6></Col>
                    <Col><h6>Size</h6></Col>
                    <Col><h6>Type</h6></Col>
                    <Col><h6>Price</h6></Col>
                </Row>
            {

                currentOrder?.orderedItems.map( (x,i) => {
                    return(
                       <Row key={i} id={i.toString()}>
                            <Col md={4}>{x.storefrontItem?.name}</Col>
                            <Col>{ContainerColor[x.containerColor]}</Col>
                            <Col>{x.candleSize.toString()} oz</Col>
                            <Col>{CandleType[x.candleType]}</Col>
                            <Col>${x.itemPrice.toString()}</Col>
                       </Row>
                    )
                })
            }
            </CardBody>
            </Card>
            </Col>
            <Col>
        <Card
            style={{backgroundColor:"black", padding:"5px", margin:"5px", border:"white solid 1px"}}
            inverse  
        >
            <CardTitle><h5>Notes</h5></CardTitle>
            <textarea id="noteAddArea" value={noteAreaText} style={{borderRadius:"3px", margin:"3px"}}
                        onChange={(e) =>
                            setNoteAreaText(e.target.value)}></textarea>
            <Row>
                <Col md={4}></Col>
                <Button type="submit" onClick={addNote}  style={{width:"30%"}} color="primary">Add</Button>
            </Row>
            <CardBody>
            {
                currentOrder?.orderNotes.map( (x,i) => {
                    return(
                        <Card color="secondary" inverse key={i} id={i.toString()} style={{margin:"3px"}}>
                            <CardHeader><b>{format(new Date(x.date), 'MM-dd-yyyy')}</b></CardHeader>
                            <CardBody>{x.noteText}</CardBody>
                       </Card>
                    )
                })
            }    
            </CardBody>
            </Card>
            </Col>
        </Row>    
    </>
    )
};
export default AddInventoryItem;