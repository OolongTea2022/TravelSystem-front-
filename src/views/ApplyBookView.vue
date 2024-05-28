<!-- //TODO 待改 -->

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

                
                <el-table-column prop="applyInfoId" label="申请ID" width="100" />

                <el-table-column prop="tourCode" label="旅游团代码" width="180" />
                <el-table-column prop="departDate" label="出发日期" width="180" />
                
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="gender" label="性别" width="180" />
                
                <el-table-column prop="birthday" label="出生日期" width="180" />
                <el-table-column prop="phone" label="电话号码" width="180" />
                
                <el-table-column prop="address" label="联系地址" width="180" />
                <el-table-column prop="email" label="Email" width="180" />
                
                <el-table-column prop="postalCode" label="邮政编码" width="180" />
                <el-table-column prop="nameVice" label="紧急联系人姓名" width="180" />
                
                <el-table-column prop="relationship" label="紧急联系人与本人关系" width="180" />
                <el-table-column prop="addressVice" label="紧急联系人地址" width="180" />

                <el-table-column prop="phoneVice" label="紧急联系人电话" width="180" />
                <el-table-column prop="updateTime" label="数据更新时间" width="180" />




                <el-table-column label="Operation" width="180">
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
    let url = "/applybook/page";
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



function handleReset(){
    param.value = "";
    handleSearch();
}

handleSearch();

</script>