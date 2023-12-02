import React from "react";
import { Progress } from "reactstrap";

export default function ProgressBar(progress:number|undefined){
  
    if(progress == undefined)
    return(
            <></>
    );
    return(
        <>
        <Progress multi striped>
            { progress >= 0 &&
            <Progress bar animated color="primary" value="25">New</Progress> 
            }
            { progress > 0 &&
            <Progress bar animated color="info" value="25">In Process</Progress>
            }
            { progress > 1 &&
            <Progress bar animated color="success" value="25">Shipped</Progress>
            }   
            { progress > 2 &&
            <Progress bar animated color="danger" value="25">Delivered</Progress>
            }
        </Progress> 
        </>
    )
}