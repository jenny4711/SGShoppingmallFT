import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import { showCreateAt } from '../utils/number';
const OrderStatusCard = ({orderNum,item,price,createAt,status}) => {
  const name =item[0].productId.name
  const img=item[0].productId.image
  const qty =item.length
  const date = showCreateAt(createAt)


  console.log(item.length,'item')
  console.log()
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={img}
            alt=""
            height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {orderNum}</strong>
          </div>

          <div className="text-12">{date}</div>

          <div>{qty>1?`${name}외 ${qty-1}개`:`${name}`}</div>
          <div>$ {price}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg="warning">{status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
