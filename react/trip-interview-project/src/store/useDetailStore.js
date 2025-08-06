import {
    create
} from 'zustand'
import { getDetail } from '@/api/detail';

const useDetailStore = create((set) => ({
    detail: {
        title: '',
        desc: '',
        images: [
            {
                url: 'https://th.bing.com/th/id/R.db6b642818bc1d1a1cc16d2bc3ad2536?rik=dhChgnt8EoVrbg&riu=http%3a%2f%2f3580.wangid.com%2ftemplate_xin%2fmingxingbao%2fimg%2fmxb.gif&ehk=FBD17RhrJnquCJAEbKBkQFPVcgBYxHBAQElgVDq1HiU%3d&risl=&pid=ImgRaw&r=0',
                alt: 'loading',
            },
        ],
        price: ''
    },
    loading: false,
    setDetail: async () => {
        set({loading: true})
        const res = await getDetail();
        // console.log(res)
        set({
            loading: false,
            detail: res.data,
        });
    }

}));

export default useDetailStore