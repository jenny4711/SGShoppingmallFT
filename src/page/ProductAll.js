import React, { useEffect ,useState} from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const {error,productList}= useSelector((state) => state.product);
  const [showProduct,setShowProduct]=useState([])
console.log(error,'error!!!!')
  // 처음 로딩하면 상품리스트 불러오기
useEffect(()=>{
  dispatch(productActions.getProductList())
},[])

useEffect(()=>{
  const filteredProduct=productList.filter((item)=>item.isDeleted === false)
  setShowProduct(filteredProduct)
},[productList])


  return (
    <Container>
      <Row>
        
        {
       
          
          showProduct?.map((item)=>( 
            <Col md={3} sm={12} >
            <ProductCard img={item.image} name={item.name} price={item.price} id={item._id}/>
            </Col>
            ))
          
        }
         
        
      </Row>
    </Container>
  );
};

export default ProductAll;
