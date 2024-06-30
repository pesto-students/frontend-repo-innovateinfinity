import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";


const OrderDetailsPopup = ({ onClose, open, orderDetails }) => {

    return (
        <Dialog
            onClose={onClose}
            open={open}
            maxWidth={"lg"}
            sx={{
                borderRadius: '10px',
            }}
        >
            <Box display={'flex'} justifyContent="center" alignItems="center" container spacing={{ xs: 2, md: 4 }} sx={{
                minHeight: '50vh',
                minWidth : '50vw'
            }}>
                <Typography color={'text.secondary'}>
                    Order Id :  <span style={{ color: 'red' }}> {orderDetails?.id} </span> <br />
                    Total Amount : <span style={{ color: 'red' }}> {orderDetails?.amount} </span> <br />
                    Mode of Payment : <span style={{ color: 'red' }}> {orderDetails?.onlinePayment === 1 ? 'Online' : 'Cash'} </span> <br />
                    User : <span style={{ textTransform: 'capitalize', color: 'red' }}>{orderDetails?.user?.name} - {orderDetails?.user?.phoneNumber} - {orderDetails?.user?.email} </span> <br />
                    Tests : <span style={{ color: 'red' }}> {orderDetails?.tests} </span> <br />
                    Patients : <span style={{ color: 'red' }}> {orderDetails?.patient?.map(d => `${d.name} `)} </span> <br />
                    Address : <span style={{ textTransform: 'capitalize', color: 'red' }}>{orderDetails?.address?.address}, {orderDetails?.address?.city} -{orderDetails?.address?.pincode} - {orderDetails?.address?.state}   </span> <br />
                    Booking Status : <span style={{ textTransform: 'capitalize', color: 'red' }}> {orderDetails?.status?.toLowerCase()} </span><br />
                    Booking Made on : <span style={{ color: 'red' }}> {orderDetails?.placedAt} </span><br />
                    Scheduled Test Date : <span style={{ color: 'red' }}> {orderDetails?.BookingTimeSlot} </span><br />
                    Payment Date : <span style={{ color: 'red' }}>  {orderDetails?.paymentMadeAt ? orderDetails?.paymentMadeAt : 'Not Paid Yet'} </span>
                </Typography>
            </Box>
        </Dialog>
    );
};

export default OrderDetailsPopup;
