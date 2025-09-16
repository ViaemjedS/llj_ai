// 编辑区域的数据由store管理
import { create } from 'zustand';

// parentId + children 可以构建一个树结构
export interface Component {
    id: number;
    name: string;
    children?: Component[];
    parentId?: number;
}

interface State {
    components: Component[];
}

// store 主要提供State & Actions 
interface Action {
    
}