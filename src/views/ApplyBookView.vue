<!-- //TODO 删除双重确认的提示对话框待加 -->
<!-- //TODO add时弹出的对话框，对日期部分进行约束 -->
<!-- //TODO add和change逻辑待改 -->


<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入申请人姓名" @keyup.enter="handleSearch()" />
            <el-button type="warning" style="margin-left: 5px;" @click="handleSearch()">Search</el-button>

            <el-button type="primary" style="margin-left: 5px;" @click="handleReset()">Reset</el-button>

            <el-button type="success" style="margin-left: 5px;" @click="handleAdd()">Add</el-button>

        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="id" label="ID" width="50" /> -->


                <el-table-column fixed prop="applyInfoId" label="申请ID" width="100" />

                <el-table-column prop="tourCode" label="旅游团编码" width="180" />
                <el-table-column prop="departDate" label="出发日期" width="180" />
                <el-table-column prop="pathNumber" label="路线编号" width="180" />

                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="gender" label="性别  （0-女，1-男）" width="180" />

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

                    <template v-slot="{ row }">
                        <el-button type="primary" @click="handleEdit(row)">Edit</el-button>
                        <el-button type="danger" @click="handleDelete(row)">Delete</el-button>
                    </template>

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

            <el-dialog v-model="dialogFormVisible" title="添加或更改申请书" width="1000">
                <el-form :model="dialogFormData">

                    <el-form-item label="申请书ID" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.applyInfoId" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="旅游团编码" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.tourCode" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="出发日期" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.departDate" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="路线编号" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.pathNumber" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.name" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="性别（0-女，1-男）" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.gender" autocomplete="off" />
                    </el-form-item>


                    <el-form-item label="出生日期" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.birthday" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="电话号码" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.phone" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="联系地址" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.address" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="Email" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.email" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="邮政编码" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.postalCode" autocomplete="off" />
                    </el-form-item>



                    <el-form-item label="紧急联系人姓名" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.nameVice" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="紧急联系人与本人关系" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.relationship" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="紧急联系人地址" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.addressVice" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="紧急联系人电话" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.phoneVice" autocomplete="off" />
                    </el-form-item>


                </el-form>


                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button v-if="addFlag" type="primary" @click="handleConfirm()"> Confirm
                        </el-button>

                        <el-button v-if="changeFlag" type="primary" @click="handleChange()"> Change
                        </el-button>

                    </div>
                </template>
            </el-dialog>
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


//add对话框参数
const dialogFormVisible = ref(false);
const dialogFormData = ref({
    "tourCode": "",
    "departDate": "",
    "pathNumber": "",
    "name": "",
    "gender": null,
    "birthday": "",
    "phone": "",
    "address": "",
    "email": "",
    "postalCode": "",
    "nameVice": "",
    "relationship": "",
    "addressVice": null,
    "phoneVice": "",
    "applyInfoId": null
});

const formLabelWidth = '20%';


//新增还是更改
const addFlag = ref(false);//0不存在，1是存在
const changeFlag = ref(false);//0不存在，1是存在

function handleSearch() {
    let url = "/applybook/page";
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


    dialogFormData.value = {
        "tourCode": "",
        "departDate": "",
        "pathNumber": "",
        "name": "",
        "gender": null,
        "birthday": "",
        "phone": "",
        "address": "",
        "email": "",
        "postalCode": "",
        "nameVice": "",
        "relationship": "",
        "addressVice": null,
        "phoneVice": "",
        "applyInfoId": null
    };

    addFlag.value = true;
    changeFlag.value = false;

    dialogFormVisible.value = true;

}


function handleConfirm() {
    let url = "/applybook/save";

    request.post(url, dialogFormData.value).then(res => {
        if (res.code == '0') {

            console.log("confirm成功提交");
            handleSearch();

        } else {
            alert("提交无效，请注意输入格式是否有误！！！");
            console.log("confirm提交有问题！！！");
        }
    });

    dialogFormVisible.value = false;
};

function handleEdit(obj) {
    Object.assign(dialogFormData.value, obj);

    addFlag.value = false;
    changeFlag.value = true;

    dialogFormVisible.value = true;

}

function handleChange() {
    let url = "/applybook/alter";

    request.post(url, dialogFormData.value).then(res => {
        if (res.code == '0') {

            console.log("change成功提交");
            handleSearch();

        } else {
            alert("提交无效，请注意输入格式是否有误！！！");
            console.log("change提交有问题！！！");
        }
    });

    dialogFormVisible.value = false;
}

function handleDelete(obj) {
    let url = "/applybook/cancel" + "?" + "id=" + obj.id;
    request.put(url).then(res => {
        if (res.code == '0') {
            console.log("delete成功提交");
            handleSearch();
        } else {
            alert("删除失败！！！");
            console.log("delete提交有问题！！！");
        }
    })
}


handleSearch();

</script>