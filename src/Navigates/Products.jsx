
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextAuth } from "../context/Context";
import { Spinner } from "../components/Spinner";
import { Pagination } from "../components/Pagination";
import { SearchComponent } from "../components/SearchComponent";


export const Products = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { state, dispatch } = useContextAuth();
  
  useEffect(() => {
    async function getProducts() {
      let url = searchQuery
        ? "https://dummyjson.com/products/search"
        : `https://dummyjson.com/products`;
      const params = new URLSearchParams();
      if (skip) params.append("skip", skip.toString());
      if (searchQuery) params.append("q", searchQuery.toString());
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      try {
        setIsLoading(true)
        setIsError(false)
        const response = await fetch(`${url}`);
        const res = await response.json();
        setData(res);
      } catch (e) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getProducts();
  }, [skip, searchQuery]);

  const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handlePagination = (num) => {
    setSkip(num);
  };

  if (state.isLoading) {
    return <Spinner />;
  }

    const handleSearch = (value) => {
    setSkip(null);
    setSearchQuery(value);
  };

  return (
    <div className="productsContainer">
      <h2>Products</h2>
      <SearchComponent onSearch={handleSearch} />
      <div className="productsContent">
        {data?.products?.map((product) => (
          <div onClick={() => handleClickProduct(product.id)} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
              <p style={{ paddingBottom: "12px",height: '100%' }}>{product.price}</p>
              
          </div>
        ))}
      </div>

      <Pagination
        total={data?.total}
        limit={30}
        skip={data?.skip}
        onChange={handlePagination}
      />
    </div>
  );
};
