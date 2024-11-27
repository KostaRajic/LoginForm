/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Fragment } from "react";
import { useContextAuth } from "../context/Context";
import { Spinner } from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


export const SingleProducts = () => {
    const { state, dispatch } = useContextAuth()
    const [ product, setProduct ] = useState(null)
    const { productId } = useParams()
    const navigate = useNavigate()
    const [starRating, setStarRating] = useState(5)


    useEffect(() => {
        async function getProducts() {
            try {
                dispatch({type: 'LOADING', payload: true})
                dispatch({type: 'ERROR', payload: false})
                const res = await fetch(`https://dummyjson.com/products/${productId}`);
                const data = await res.json();
                setProduct(data)
            } catch (e) {
                dispatch({type: 'ERROR', payload: true})
            } finally {
                dispatch({type: 'LOADING', payload: false})
            }
        }
        setProduct(null)
        getProducts()
    }, [productId])


    if(state.isLoading){
        return <Spinner />
    }

    return <div className="singleProductClass">
    {product ? <Fragment>
        <h2>{product.title}</h2>
        {product?.thumbnail ? <img src={product?.thumbnail} /> : null}
        <p>{product?.description}</p>
        {product?.brand ? <p>Brand: <span>{product?.brand}</span></p> : ''}
        <div>    
        </div>
        <div className='ratingClass'>
        <p>Rating: </p>
        <div className="progress-bar-container">
            <div
              className="progress-bar-filled"
              style={{ width: `${(product.rating / 5) * 100}%` }}
            />
          </div>
          
        </div>

        <p>Rating: <span>{product?.rating}</span></p>
        <p>Price: <span>{product?.price}</span></p>
        <button onClick={() => navigate(-1)}>Back</button>
    </Fragment> : null}
</div>
}