<!-- //TODO 改placeholder -->
<!-- //TODO 后端确定关键字并修改查询接口 -->
<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入订单关键字" @keyup.enter="handleSearch()"/><!--TODO根据后端更改placeholder-->
            <el-button type="warning" style="margin-left: 5px;"  @click="handleSearch()">Search</el-button>
            <!-- <el-button type="success" style="margin-left: 5px;">Add</el-button> -->
            <el-button type="primary" style="margin-left: 5px;" @click="handleReset()">Reset</el-button>

        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID" width="50" />
                <el-table-column prop="amount" label="金额" width="180" />
                <el-table-column prop="type" label="类型（0: 订金支付, 1: 余款支付, 2: 退款）" width="180" />

                <el-table-column prop="updateTime" label="生成时间" width="180" />
                <el-table-column prop="applyInfoId" label="对应订单ID" width="180" />


                <!-- <el-table-column label="Operation">
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
    let url = "/financebook/page";
    request.post(url,{
        pageNum:pageNumber.value,
        pageSize:pageSize.value,
        param:param.value,

    }).then(res=>{
        if(res.code =='0'){
            totalNumber.value = res.data.total;
            tableData.value = res.data.records;
        }else{
            alert("财务报表获取失败！！！");
            console.log("财务报表获取失败！！！")
        }
    })

}



function handleReset(){
    param.value = "";
    search();
}

handleSearch();

</script>