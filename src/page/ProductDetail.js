import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const {user}=useSelector((state)=>state.user)
const{ productDetail }= useSelector((state) => state.product);
console.log(user,'user')
  const navigate = useNavigate();


  useEffect(()=>{
    dispatch(productActions.getProductDetail(id))
  },[])

  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true);
      return;
    }

    if (user === null) {
      navigate("/login");
    }

    dispatch(cartActions.addToCart({ id, size }));
  };
  const selectSize = (value) => {
    if(sizeError){
      setSizeError(false)
    }
    setSize(value);
    // 사이즈 추가하기
  };

  //카트에러가 있으면 에러메세지 보여주기

  //에러가 있으면 에러메세지 보여주기

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
    //상품 디테일 정보 가져오기
  }, [id]);

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img
            src={productDetail?.image}
            className="w-100"
            alt="image"
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div style={{fontWeight:'bold'}} className="product-info">{productDetail?.name}</div>
          <div className="product-info">$ {productDetail?.price}</div>
          <div style={{fontSize:'13px'}} className="product-info">{productDetail?.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
            {productDetail &&
              productDetail.stock &&
              Object.keys(productDetail.stock).length > 0 ? (
             
                Object.keys(productDetail.stock).map((item, idx) => (

             
                  <Dropdown.Item key={idx} eventKey={item}>
                    {item}-{productDetail.stock[item] !== null?productDetail.stock[item]:0 }
                
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled={true}>사이즈 없음</Dropdown.Item>
              ) }
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
