import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';


const Product = ({ product }) => {

  return (
    <Card key={product._id}>
      <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className='card-img-top'/>
          </Link>
          <Card.Body>
            <Link to={`/product/${product._id}`} >
                <Card.Title>{product.name}</Card.Title>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text>${product.price}</Card.Text>
          </Card.Body>
    </Card>
  )
}

export default Product