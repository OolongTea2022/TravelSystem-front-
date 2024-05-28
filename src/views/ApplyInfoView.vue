
<!-- //TODO 增删改 -->

<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入申请人姓名" @keyup.enter="handleSearch()"/><!--TODO根据后端更改placeholder-->
            <el-button type="warning" style="margin-left: 5px;"  @click="handleSearch()">Search</el-button>

            <el-button type="primary" style="margin-left: 5px;" @click="handleReset()">Reset</el-button>

            <el-button type="success" style="margin-left: 5px;">Add</el-button>
        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="id" label="ID" width="50" /> -->

                <!-- <el-table-column prop="applyBookId" fixed label="申请书ID" width="100" /> -->

                <el-table-column fixed prop="principalName" label="姓名" width="180" />
                

                <el-table-column prop="deposit" label="订金" width="180" />

                <el-table-column prop="totalPrice" label="总价" width="180" />

                <el-table-column prop="depositStatus" label="订金状态（0-未交订金, 1-已交订金）" width="180" />
                <el-table-column prop="cancelStatus" label="申请取消状体（0-未取消, 1-已取消）" width="180" />


                <el-table-column prop="payDeadline" label="支付截止日期" width="180" />
                <el-table-column prop="paymentSendDate" label="支付截止日期" width="180" />

                <el-table-column prop="balanceStatus" label="余款支付情况（0-未支付   1-已支付）" width="180" />


                <!-- <el-table-column label="Operation" width="180">
                    <el-button type="primary">Edit</el-button>
                    <el-button type="danger">Delete</el-button>
                </el-table-column> -->
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
            @size-change="handleSearch()"
            @current-change="handleSearch()" />
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


function handleSearch() {
    let url = "/applyinfo/page";
    request.post(url,{
        pageNum:pageNumber.value,
        pageSize:pageSize.value,
        param:param.value,

    }).then(res=>{

        console.log(res);

        if(res.code =='0'){
            totalNumber.value = res.data.total;
            tableData.value = res.data.records;
        }else{

        }
    })

}



function handleReset(){
    param.value = "";
    handleSearch();
}

handleSearch();

</script>