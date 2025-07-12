import { useParams } from'react-router-dom';
const ProductDetails = () => {
    const {productId} = useParams(); // 从路由参数中获取productId
    console.log(productId);
    return (
        <>
            <h2>ProductDetails{productId}</h2>
        </>
    )
}
export default ProductDetails