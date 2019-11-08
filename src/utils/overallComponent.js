import Vue from 'vue';

// 分页组件
import Pagination from '@/components/Pagination';


let c = [

    {
        name: 'Pagination',
        component: Pagination
    }
];

for (const component of c) {
    Vue.component(component.name, component.component);
}
