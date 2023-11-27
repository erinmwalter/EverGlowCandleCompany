import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { GetAllInventoryAsync } from "../../services/InventoryService";
import InventoryItem from "../../models/InventoryItem";
import { Button, Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";


const InventoryList = () =>  {
    let navigate = useNavigate();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentInventory, setCurrentInventory] = useState<InventoryItem[]>();
    const [isLoading, setIsLoading] = useState(true);
  
  
    useEffect(() => {
      (async () => {
        setIsLoading(true);
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          await GetAllInventoryAsync(token).then(async (response:InventoryItem[]) => {
            setCurrentInventory(response);
            console.log(response);
          })
        }).finally(() => setIsLoading(false));
      })();
    }, []);

    const routeChange = (id: number) => {
        navigate(`/inventory/${id}`);
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
            <Col md={11}>
            <h5>Current Inventory</h5>
            </Col>
            <Col>
            <Button onClick={() => navigate("/inventory/add")}>Add</Button>
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
                    <th>Name</th>
                    <th>Description</th>
                    <th>Units In Stock</th>
                    <th>Items In Stock</th>
                    <th>Price Per Unit</th>
                    <th>Items Per Unit</th>
                    <th>Supplier</th>
                    <th>SupplierId</th>
                    <th>Last Reordered</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {currentInventory?.map((x,i) => {
                    return(
                        <tr key={i} id={i.toString()}>
                            <td>{x.name}</td>
                            <td>{x.description}</td>
                            <td>{x.numberInStock.toString()}</td>
                            <td>{(x.numberInStock * x.itemsPerUnit).toString()}</td>
                            <td>${x?.pricePerUnit?.toString()}</td>
                            <td>{x.itemsPerUnit.toString()}</td>
                            <td>{x.supplierName}</td>
                            <td>{x.supplierId}</td>
                            <td>{format(new Date(x?.dateLastReordered), "MM-dd-yyyy")}</td>
                            <td><Button onClick={() => routeChange(x?.id)}>Edit</Button></td>

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
export default InventoryList;