import { useConterStore } from "@/store/count";
const Couner = () => {
    const {
        count,
        increment,
        decrement,
    } = useConterStore()
    return (
        <>
            <h1>Counter {count}</h1> 
            <button onClick={increment}>+</button>
            <button onClick={decrement}>+</button>
        </>
    )
}
export default Couner;