import {
    useState,
} from 'react'
import styles from './box.module.css'
const Box = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button onClick={() => setOpen(!open)}>
                {open ? 'Close' : 'Open'}
                <div className={`${styles.box} ${open?styles.open:''}`}></div>
            </button>
        </div>
    )
}

export default Box