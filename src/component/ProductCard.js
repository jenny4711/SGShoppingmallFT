import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({img,name,price,id}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
    // 상품 디테일 페이지로 가기
  };
  return (
    <>
    <div className="card" onClick={() => showProduct(id)}>
      <img
        src={img}
        alt=""
      />
      <div>{name}</div>
      <div>$ {price}</div>
    </div>
    </>
  );
};

export default ProductCard;
