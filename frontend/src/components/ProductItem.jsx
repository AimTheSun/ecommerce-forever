import { React, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';


const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);
  
    return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}> {/* Anyone that click on the Link goes to the product details page */}
        <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />

        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p> {/* currency and price display that comes from the ShopContext */}
    </Link>
  )
}

export default ProductItem