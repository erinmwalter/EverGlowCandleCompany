import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardImg, CardTitle, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import StorefrontItem from "../../models/StorefrontItem";
import { GetAllFeaturedCandlesAsync } from "../../services/StorefrontService";
import candlePic from "../../../public/assets/candleimage.png"

const FeaturedItemsList = () =>  {
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [featuredCandles, setFeatuedCandles] = useState<StorefrontItem[]>();
    const [isLoading, setIsLoading] = useState(true);
  
  
    useEffect(() => {
      (async () => {
        setIsLoading(true);
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          await GetAllFeaturedCandlesAsync(token).then(async (response:StorefrontItem[]) => {
            setFeatuedCandles(response);
          })
        }).finally(() => setIsLoading(false));
      })();
    }, []);

    const routeChange = (id: number) => {
        navigate(`/storefront/${id}`);
      };

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
            <h5>Featured Candles</h5>
        </CardTitle>
        <CardBody style={{display:"flex", justifyContent:"center", "alignItems":"stretch"}}>
            <CardGroup>
        {
            featuredCandles?.map((x,i) => {
                return(
                    <Card
                        color="secondary"
                        inverse
                        style={{margin:"10px"}}
                        className="text-center"
                        >
                        <CardHeader tag="h6">{x.name}</CardHeader>
                        <CardBody>
                            <Row>
                            <img 
                                alt={x.name}
                                src={candlePic}
                                style={{width:"100%", borderRadius:"5px"}}
                            />
                            </Row>
                            <Row>
                                {x.description}
                            </Row>
                        </CardBody>
                        <CardFooter>            
                        <Row>
                                <Col>
                                Starting at ${x.price}
                                </Col>
                                <Col>
                                    <Button onClick={() => routeChange(x.id)} color="primary">Customize</Button>
                                </Col>
                            </Row>
                        </CardFooter>   
                    </Card>
                );
            })
        }
        </CardGroup>
        </CardBody>
    </Card>
    )
};
export default FeaturedItemsList;