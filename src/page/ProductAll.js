import React, { useEffect ,useState} from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { useLocation } from "react-router-dom";

const ProductAll = () => {
  const dispatch = useDispatch();
  const {error,productList}= useSelector((state) => state.product);
  const [showProduct,setShowProduct]=useState([])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsItem = new URLSearchParams(location.search);
  const [query, setQuery] = useSearchParams(); 
 
 
  let name = searchParamsItem.get("name");
  let toLower = name?.toLowerCase();
  

  // 처음 로딩하면 상품리스트 불러오기
useEffect(()=>{
  dispatch(productActions.getProductList())
},[])



//상품리스트가 바뀌면 검색어에 따라 필터링해서 보여주기
useEffect(()=>{
  const filteredProduct=productList.filter((item)=>item.isDeleted === false)
  const findBySearch = filteredProduct?.filter((find) => {
   
    if (find.name && typeof find.name === "string") {
      return find.name.toLowerCase().includes(toLower);
    }
    return false;
  });
  
  if(findBySearch.length ===0){
    if(name){
      dispatch(commonUiActions.showToastMessage("검색결과가 없습니다.", "error"));
    }
    
    setShowProduct(filteredProduct)
  }else{
    setShowProduct(findBySearch)
  }
  
},[productList,setShowProduct,toLower,name])


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
