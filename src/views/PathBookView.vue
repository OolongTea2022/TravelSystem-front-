<!-- //TODO 增删改 -->
<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入路线编号关键字" @keyup.enter="handleSearch()" />
            <el-button type="warning" style="margin-left: 5px;" @click="handleSearch()">Search</el-button>

            <el-button type="primary" style="margin-left: 5px;" @click="handleReset()">Reset</el-button>

            <el-button type="success" style="margin-left: 5px;" @click="handleAdd()">Add</el-button>

        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="pathNumber" label="路线编号" width="180" />
                <el-table-column prop="path" label="路径" width="180" />
                <el-table-column prop="adultPrice" label="成人价格" width="180" />

                <el-table-column prop="childPrice" label="儿童价格" width="180" />
                <el-table-column prop="discount" label="打折" width="180" />

                <el-table-column prop="updateTime" label="数据更新时间" width="180" />


                <el-table-column label="Operation" width="180">
                    <el-button type="primary" @click="handleEdit()">Edit</el-button>
                    <el-button type="danger" @click="handleDelete()">Delete</el-button>
                </el-table-column>
            </el-table>

        </div>



        <div style="margin-top: 10px;">
            <el-pagination v-model:current-page=pageNumber v-model:page-size=pageSize
                :page-sizes="[5, 10, 50, 100, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total=totalNumber @size-change="handleSearch()"
                @current-change="handleSearch()" />
        </div>


        <!-- add对话框 -->

        <div>

            <el-dialog v-model="dialogFormVisible" title="添加或更改路线" width="500">
                <el-form :model="dialogFormData">
                    <el-form-item label="路线编号" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.pathNumber" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="路线" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.path" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="成人价格" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.adultPrice" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="儿童价格" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.childPrice" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="打折" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.discount" autocomplete="off" />
                    </el-form-item>



                    <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                        </el-select>
                    </el-form-item> -->
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false,handleConfirm()"> Confirm
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>

    </div>





</template>

<script setup>
import { ref, setTransitionHooks } from 'vue';

import request from "../utils/request";

const input = ref("");

//分页查询参数
const pageNumber = ref(1);
const totalNumber = ref(0);
const pageSize = ref(10);



const tableData = ref([]);
const param = ref("");


//add对话框参数
const dialogFormVisible = ref(false);
const dialogFormData = ref({
    "adultPrice": 0,
    "childPrice": 0,
    "discount": "string",
    "id": 0,
    "path": "string",
    "pathNumber": "string"
});

const formLabelWidth = '20%';



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

function handleSearch() {
    let url = "/pathbook/page";
    request.post(url, {
        pageNum: pageNumber.value,
        pageSize: pageSize.value,
        param: param.value,

    }).then(res => {
        if (res.code == '0') {
            totalNumber.value = res.data.total;
            tableData.value = res.data.records;
        } else {

        }
    })

}



function handleReset() {
    param.value = "";
    handleSearch();
}

function handleAdd() {

    dialogFormVisible.value = true;
    
}

function handleConfirm() {
    let url = "/pathbook/save";

    console.log(dialogFormData.value);

    request.post(url, dialogFormData.value).then(res => {
        if (res.code == '0') {

            console.log("confirm成功提交");
            search();

        } else {
            console.log("confirm提交有问题！！！");
        }
    })
}


handleSearch();

</script>