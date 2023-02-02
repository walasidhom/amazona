import { Spinner } from "react-bootstrap"

const LoadingBox = () => {
  return (
      <Spinner animation="boder" role="status">
          <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default LoadingBox