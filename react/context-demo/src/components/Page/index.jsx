import Child from '../Child';
import { useTheme } from '../../hooks/useTheme';
import { use } from 'react';
const Page = () => {
    const theme = useTheme();
    return (
        <>
            {theme}
            <Child />
        </>
    )
}

export default Page;