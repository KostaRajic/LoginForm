/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useContextAuth } from "../context/Context";
import { Spinner} from '../components/Spinner'
import { Pagination } from "../components/Pagination";
import { SearchComponent } from "../components/SearchComponent";

export const Products = () => {
    const [ data, setData ] = useState(null);
    const navigate = useNavigate();
    const [ skip, setSkip ] = useState(0);
    const [ searchQuery, setSearchQuery ] = useState('')
    const { state, dispatch } = useContextAuth()


    useEffect(() => {
        async function getProducts() {
            let url = searchQuery ?  'https://dummyjson.com/products/search': `https://dummyjson.com/products`
            const params = new URLSearchParams()
            if(skip) params.append('skip', skip.toString())
            if(searchQuery) params.append('q', searchQuery.toString())
            const queryString = params.toString()
            if(queryString){
                url+= `?${queryString}`
            }
          try {
            dispatch({type: 'LOADING', payload: true})
            dispatch({type: 'ERROR', payload: false})
            const response = await fetch(`${url}`);
            const res = await response.json();
            setData(res)
          } catch (e) {
            dispatch({type: 'ERROR', payload: true})
          } finally {
            dispatch({type: 'LOADING', payload: false})
          }
          }
          getProducts();
      }, [skip, searchQuery]);

      const handleClickProduct = (productId) => {
        navigate(`/products/${productId}`)
    }

      const handlePagination = (num) => {
        setSkip(num)
    }

      const handleSearch =(value) => {
        setSkip(null)
        setSearchQuery(value)
    }

      if(state.isLoading){
        return <Spinner/>
    }

      return (
        <div className="productsContainer" >
        <h2>Products</h2>
        <SearchComponent onSearch={handleSearch}/>
        <div className="productsContent">
          {data?.products?.map((product) =>
            <div onClick={() => handleClickProduct(product.id)} key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
              <p>{product.price}</p>
          </div>)}
        </div>
          <Pagination
              total={data?.total}
              limit={30}
              skip={data?.skip}
              onChange={handlePagination}/>
        </div>
    );
}