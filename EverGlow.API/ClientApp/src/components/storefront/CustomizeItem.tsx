import { User, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle, Col, Form, Input, Label, Row, Table } from "reactstrap";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import StorefrontItem from "../../models/StorefrontItem";
import OrderedItem, { CandleType, ContainerColor } from "../../models/OrderedItem";
import candlePic from "../../../public/assets/candleimage.png"
import { GetStorefrontItemByIdAsync } from "../../services/StorefrontService";
import { JarDecorator, SimpleCandle, SizeDecorator, WickDecorator } from "./ItemPriceBuilder";

const CuztomizeItem:React.FC = () =>  {
    let { id } = useParams();
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [baseItem, setCurrentItem] = useState<StorefrontItem>();
    const [cartItems, setCartItems] = useState<OrderedItem[]>([]);

    const [ editableParamProps, setEditableParamProps] = useState<OrderedItem>({
        id: 0,
        orderStatusId: 0,
        storefrontItem: baseItem,
        itemPrice: 0,
        candleType: 0,
        candleSize: 8,
        containerColor: 0
    });
  
    useEffect(() => {
      (async () => {
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          if (id != null){
          await GetStorefrontItemByIdAsync(accessToken, parseInt(id)).then(async (returnedItem: StorefrontItem) => {
            console.log(returnedItem);
            setCurrentItem(returnedItem);
            setEditableParamProps({
                id: 0,
                orderStatusId: 0,
                storefrontItem: returnedItem,
                itemPrice: 0,
                candleType: 0,
                candleSize: 8,
                containerColor: 0
            })
            });
      }})
      })();
    }, []);

    const addToCart = (ev:React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        let item:OrderedItem = editableParamProps;
        let candle:SimpleCandle = new SimpleCandle();
        if(item.candleType == CandleType.WoodWick)
        {
            candle = new WickDecorator(candle);
        }
        if(item.candleSize == 12)
        {
            candle = new SizeDecorator(candle);
        }
        if(item.containerColor == ContainerColor.Amber || item.containerColor == ContainerColor.Green )
        {
            candle = new JarDecorator(candle);
        }
        if(baseItem != undefined)
            item.itemPrice = baseItem?.price + candle.price();
        
        
        console.log(candle.description());
        console.log(`Total Price: $${item.itemPrice}`);

    }

    return(
    <>
    <Col md={8}>
    <Card
        style = {{padding: "15px", backgroundColor:"black", outline:"white solid 1px"}}
        inverse
        >
    <Card
     style = {{padding: "20px", backgroundColor:"gray", outline:"white solid 1px"}}
     inverse
    >
        <CardTitle tag="h3">{baseItem?.name}</CardTitle>
        <CardBody>
            <Row>
                <Col>
                    <img src={candlePic} />
                </Col>
                <Col>
                    {baseItem?.description}
                </Col>
            </Row>
            <Row style ={{marginTop:"15px"}}>
                <Col className="text-center" tag="h4">Base Price:</Col>
                <Col tag="h3">${baseItem?.price.toString()}</Col>
            </Row>
        </CardBody>
    </Card>
    <Form onSubmit={addToCart}>
    <CardTitle tag="h5" style={{margin:"10px"}}>
           Customize Item
    </CardTitle>
    <CardText>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iSize">Size</Label>
        </Col>
        <Col  md={4}>
            <select
                id="iSize"
                name="size"
                required
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ candleSize: parseInt(e.target.value) },
              }))
            }
            >
                <option defaultValue="8">
                </option>
                <option key="regular" value="8">
                    8 oz
                </option>
                <option key="large" value="12">
                    12 oz (+$5)
                </option>
            </select>
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iSize">Jar Color</Label>
        </Col>
        <Col md={4}>
            <select
                id="iSize"
                name="size"
                required
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ containerColor: parseInt(e.target.value) },
              }))
            }
            >
                <option defaultValue="0">
                </option>
                <option key="clear" value="0">
                    {ContainerColor[0]}
                </option>
                <option key="green" value="1">
                    {ContainerColor[1]} (+$2)
                </option>
                <option key="amber" value="2">
                    {ContainerColor[2]} (+$2)
                </option>
            </select>
        </Col>
    </Row>
    <Row style={{padding:"3px"}}>
        <Col md={3}>
            <Label for="iWickType">Wick Type</Label>
        </Col>
        <Col  md={4}>
            <select
                id="iWickType"
                name="candleType"
                required
                onChange={(e) =>
                setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ candleType: parseInt(e.target.value) },
              }))
            }
            >
                <option defaultValue="0">
                </option>
                <option key="regular" value="0">
                    {CandleType[0]}
                </option>
                <option key="WoodWick" value="1">
                {CandleType[1]} (+$1)
                </option>
            </select>
        </Col>
    </Row>
    
    </CardText>
    <Row>
        <Col md={2}>
            <Button color="primary" type="submit">
                Add to Cart
            </Button>
        </Col>
        <Col md={8}>
            <Button onClick={() => navigate(-1)}>
                Cancel
            </Button>
        </Col>
    </Row>
    </Form>
    
    </Card>
    </Col>
    </>
    )
};
export default CuztomizeItem;