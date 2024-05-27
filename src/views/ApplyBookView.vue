<!--未开始-->
<!-- //TODO 待改 -->
<!-- //TODO 表格结构要改！！！ -->
<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="input" style="width: 240px" placeholder="Please input" />
            <el-button type="warning" style="margin-left: 5px;">Search</el-button>
            <el-button type="success" style="margin-left: 5px;">Add</el-button>

        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />

                <el-table-column label="Operation">
                    <el-button type="primary">Edit</el-button>
                    <el-button type="danger">Delete</el-button>
                </el-table-column>
            </el-table>

        </div>

        <div style="margin-top: 10px;">
            <el-pagination 
            v-model:current-page="currentPage4" 
            v-model:page-size="pageSize4"
            :page-sizes="[10, 50, 100, 400]"
            :small="small" :disabled="disabled" 
            :background="background"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="400" 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>

    </div>





</template>

<script setup>
import { ref } from 'vue';
import request from "../utils/request";

const input = ref("");

const tableData = ref([]);

//TODO 尝试接收后端order_info数据库代码
function loader(){
    request.get("/pathbook/page?pageNum=0&pageSize=2").then(res=>{
        console.log(res);

        if(res.code === 0){
            console.log(res.data);
        } else {
            console.log("wrong!!!!!");
        }

    })

};

loader();




</script>