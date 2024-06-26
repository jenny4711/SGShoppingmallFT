import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";

import "../style/cart.style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice, totalDisPrice } = useSelector(
    (state) => state.cart
  );
 

  console.log(totalPrice,'totalPRice')


  useEffect(() => {
    dispatch(cartActions.getCartQty());
  }, []);

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, []);

 

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {cartList && cartList?.length > 0 ? (
            cartList && cartList?.map((item) => <CartProductCard item={item} />)
          ) : (
            <div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Col>

        <Col xs={12} md={5}  className={totalPrice ==='0.00'?'none':''}>
        <OrderReceipt
            cartList={cartList}
            totalPrice={totalPrice}
            
          />
        </Col>
      </Row>
      
    </Container>
  );
};

export default CartPage;
