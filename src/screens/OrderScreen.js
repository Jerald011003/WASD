import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const { confirm } = window;


    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfWCkVHsxTIHY7IU9rVzqHLAFUcZjU6Lnrqf8h81x7cIdpIJHvomiPo4Vr_RqlayO56tCESJ9D0r6ldo'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const download = async () => {
        const response = await fetch(`https://prodjfrance.pythonanywhere.com/api/orders/${match.params.id}/download/`);
        const url = window.URL.createObjectURL(await response.blob());
        const link = document.createElement('a');
        const filename = getFilenameFromResponse(response);
        const filesizeBytes = response.headers.get('Content-Length');
        const filesizeMB = filesizeBytes ? (filesizeBytes / 1048576).toFixed(2) : 'Unknown';
const confirmDownload = confirm(`Download "${filename}" (${filesizeMB} MB)\n\nPress "OK" to proceed with the download, or "Cancel" to abort.`);
        if (confirmDownload) {
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        }
      };
      
      
      
      const getFilenameFromResponse = (response) => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const matches = /filename="(.*)"/.exec(contentDisposition);
        let filename = matches ? matches[1] : 'Application.exe';
        filename = filename.replace(/[^\w.-]/g, '_'); // replace any invalid characters with underscores
        return filename;
      };
      
      
      // email feature

      const sendConfirmationEmail = async (orderId, emailAddress) => {
        try {
          const response = await fetch(`https://prodjfrance.pythonanywhere.com/api/orders/${orderId}/send-confirmation-email/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              emailAddress: emailAddress
            })
          });
          const data = await response.json();
          console.log(data); // log the response data for debugging purposes
        } catch (error) {
          console.error(error); // log any errors that occur during the fetch request
        }
      };
      
      // add this function call inside your existing code, after the order has been paid
      sendConfirmationEmail(match.params.id);
      

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <div>
                    <h1>Order: {order.Id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Contact</h2>
                                    <p><strong>Name: </strong> {order.user.name}</p>
                                    <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                    <p>
                                        <strong>Details: </strong>
                                        {order.shippingAddress.address},  {order.shippingAddress.city}
                                        {'  '}
                                        {order.shippingAddress.postalCode},
                                {'  '}
                                        {order.shippingAddress.country}
                                    </p>

                                    {/* {order.isDelivered ? (
                                                <Message variant='success'>Emailed on {order.deliveredAt}</Message>
                                                ) : (
                                                <div>
                                                    <Button onClick={sendConfirmationEmail}>Email Me</Button>
                                                    {order.isSendingEmail && <Message variant='info'>Sending email...</Message>}
                                                    {order.emailError && <Message variant='danger'>{order.emailError}</Message>}
                                                </div>
                                                )} */}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>Paid on {order.paidAt}</Message>
                                        
                                        
                                    ) : (
                                            <Message variant='warning'>Not Paid</Message>
                                            
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? <Message variant='info'>
                                        Order is empty
                            </Message> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items:</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {/* <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item> */}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>


                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}


               
{order.isPaid && order.paymentMethod === 'PayPal' && (
  <Button onClick={download}>Download</Button>
)}



            
         
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderScreen
