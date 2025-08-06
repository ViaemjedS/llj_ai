import useTitle from '@/hooks/useTitle'
import {
    Button,
} from 'react-vant'
import { showToast } from '@/components/Toast/ToastController'
const Home = () => {
    useTitle('轻装出行')
    return (
        <>
            Home
            <Button 
                type="primary"
                onClick={() => showToast(3, 6, 9)}
            >showToast</Button>
        </>
    )
}
export default Home