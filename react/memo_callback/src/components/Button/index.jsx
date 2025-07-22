import {  
    useEffect,
    memo
} from'react'
const Button = ({num}) => {
    useEffect(() => {
        console.log('button useEffect')
    },[])
    console.log('Button render')
    return <button>{num}Click Me</button>
}

export default memo(Button)