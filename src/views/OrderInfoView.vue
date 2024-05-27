<!--未开始-->

<!-- //TODO 搜索函数，按钮onclick -->
<!-- //TODO 表格结构要改！！！ -->


<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入姓名关键字" @keyup.enter="search()"/>
            <el-button type="warning" style="margin-left: 5px;"  @click="search()">Search</el-button><!--TODO onclick-->
            <el-button type="success" style="margin-left: 5px;">Add</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="reset()">Reset</el-button>

        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="deposit" label="订金" width="180" />
                <el-table-column prop="applyBookId" label="申请书ID" width="180" />

                <el-table-column prop="totalPrice" label="总金额" width="180" />
                <el-table-column prop="depositStatus" label="订金状态（0未支付 1已支付）" width="180" />

                <el-table-column prop="cancelStatus" label="取消状态（0未取消 1已取消）" width="180" />


                <el-table-column prop="payDeadline" label="支付截至日期" width="180" />
                <el-table-column prop="paymentSendDate" label="余款发送日期" width="180" />

                <el-table-column prop="balanceStatus" label="余款支付情况（0未支付 1已支付）" width="180" />



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


//TODO 记得改为搜索函数
// function loader() {
//     let url = "/pathbook/page?pageNum=" + pageNumber.value 
//     + "&pageSize=" + pageSize.value;

//     request.get(url).then(res => {
//         console.log(res);

//         if (res.code == '0') {
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



</script>