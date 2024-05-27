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

const input = ref("");

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>