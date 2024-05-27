<!-- //TODO 新增表单，更改表单 -->
<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入路线编号关键字" @keyup.enter="search()"/>
            <el-button type="warning" style="margin-left: 5px;"  @click="search()">Search</el-button>
            <el-button type="success" style="margin-left: 5px;">Add</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="reset()">Reset</el-button>

        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="pathNumber" label="路线编号" width="180" />
                <el-table-column prop="path" label="路径" width="180" />
                <el-table-column prop="adultPrice" label="成人价格" width="180" />

                <el-table-column prop="childPrice" label="儿童价格" width="180" />
                <el-table-column prop="discount" label="打折" width="180" />

                <el-table-column prop="updateTime" label="数据更新时间" width="180" />


                <el-table-column label="Operation">
                    <el-button type="primary">Edit</el-button>
                    <el-button type="danger">Delete</el-button>
                </el-table-column>
            </el-table>

        </div>



        <div style="margin-top: 10px;">
            <el-pagination 
            v-model:current-page=pageNumber
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 50, 100,400]" 
            :small="small" :disabled="disabled" 
            :background="background"
            layout="total, sizes, prev, pager, next, jumper" 
            :total=totalNumber 
            @size-change="search()"
            @current-change="search()" />
        </div>  

    </div>





</template>

<script setup>
import { ref } from 'vue';

import request from "../utils/request";

const input = ref("");

//分页查询参数
const pageNumber = ref(1);
const totalNumber = ref(0);
const pageSize = ref(10);



const tableData = ref([]);
const param = ref("");

// //TODO 记得改为搜索函数
// function loader() {
//     let url = "/pathbook/page?pageNum=" + pageNumber.value 
//     + "&pageSize=" + pageSize.value;

//     request.get(url).then(res => {
//         console.log(res);

//         if (res.code === 0) {
//             totalNumber.value = res.data.total;
//             tableData.value = res.data.records;

//             console.log(totalNumber.value);
//             console.log(tableData.value);

//         } else {
//             console.log(res.msg);
//         }

//     })

// };

// loader();

function search() {
    let url = "/pathbook/page";
    request.post(url,{
        pageNum:pageNumber.value,
        pageSize:pageSize.value,
        param:param.value,

    }).then(res=>{
        if(res.code =='0'){
            totalNumber.value = res.data.total;
            tableData.value = res.data.records;
        }else{

        }
    })

}



function reset(){
    param.value = "";
    search();
}

search();

</script>