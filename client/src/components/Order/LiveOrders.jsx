import React from "react";

function LiveOrders(){
    return(
    <>
    <div className="everything">
        <div className="orderinfocontainer">

            <div className="header">
            <h1>Your Live Orders</h1>
            </div>

            <div className="orderitems">
                
            <div className="indi-order">

                <div>
                <b><label>Order Status</label></b><br/>
                <label>Pending</label>
                </div>

                <div>
                <b><label>Order ID</label></b><br/>
                <label>5</label>
                </div>

                <div>
                <b><label>Order Total</label></b><br/>
                <label>Rs. 6000</label>
                </div>

                <div>
                <b><label>Order Items</label></b><br/>
                <label>Items</label>
                </div>

            </div>

            </div>
        </div>
    </div>
    </>

    );
}

export default LiveOrders;