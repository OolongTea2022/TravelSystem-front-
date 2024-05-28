<!-- //TODO 定金支付和余款支付先后顺序逻辑待改！ -->


<template>

    <div>
        <div style="margin-bottom: 10px;">
            <el-input v-model="param" style="width: 240px" placeholder="请输入申请人姓名" @keyup.enter="handleSearch()" />
            <el-button type="warning" style="margin-left: 5px;" @click="handleSearch()">Search</el-button>

            <el-button type="primary" style="margin-left: 5px;" @click="handleReset()">Reset</el-button>

            <el-button type="success" style="margin-left: 5px;" @click="handleAdd()">Add</el-button>
        </div>

        <div>
            <el-table :data="tableData" style="width: 100%" :row-style="tableRowStyleName">
                <!-- <el-table-column prop="id" label="ID" width="50" /> -->

                <!-- <el-table-column prop="applyBookId" fixed label="申请书ID" width="100" /> -->

                <el-table-column fixed prop="principalName" label="姓名" width="180" />


                <el-table-column prop="deposit" label="订金" width="180" />

                <el-table-column prop="totalPrice" label="总价" width="180" />

                <el-table-column prop="depositStatus" label="订金状态（0-未交订金, 1-已交订金）" width="180" />
                <el-table-column prop="cancelStatus" label="申请取消状态（0-未取消, 1-已取消）" width="180" />


                <el-table-column prop="payDeadline" label="支付截止日期" width="180" />
                <el-table-column prop="paymentSendDate" label="余款发送日期" width="180" />

                <el-table-column prop="balanceStatus" label="余款支付情况（0-未支付   1-已支付）" width="180" />

                <el-table-column prop="depositRatio" label="订金比例" width="180" />
                <el-table-column prop="updateTime" label="数据更新时间" width="180" />



                <el-table-column label="Operation" width="350px">

                    <template v-slot="{row}">
                                            <!-- <el-button type="primary">Edit</el-button> -->

                    <el-button type="info" @click="handlePayDeposit(row)">PayDeposit</el-button>
                    <el-button type="info" @click="handlePayBalance(row)">PayBalance</el-button>

                    <el-button type="danger" @click="handleCancel(row)">Cancel</el-button>

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

            <el-dialog v-model="dialogFormVisible" title="添加或更改申请" width="500">
                <el-form :model="dialogFormData">
                    <el-form-item label="申请人姓名" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.principalName" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="申请路径" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.pathNumber" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.phone" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="成人数量" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.adultNumber" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="儿童数量" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.childNumber" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="出发日期" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormData.departureDate" autocomplete="off" />
                    </el-form-item>

                </el-form>


                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false, handleConfirm()"> Confirm
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
    "principalName": "",
    "phone": "",
    "adultNumber": null,
    "childNumber": null,
    "pathId": null,
    "departureDate": ""
});

const formLabelWidth = '20%';


function handleSearch() {
    let url = "/applyinfo/page";
    request.post(url, {
        pageNum: pageNumber.value,
        pageSize: pageSize.value,
        param: param.value,

    }).then(res => {

        console.log(res);

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
        "principalName": "",
        "phone": "",
        "adultNumber": null,
        "childNumber": null,
        "pathId": null,
        "departureDate": ""
    };

    dialogFormVisible.value = true;

}

function handleConfirm() {
    let url = "/applyinfo/firstapply";

    request.post(url, dialogFormData.value).then(res => {
        if (res.code == '0') {

            console.log("confirm成功提交");
            handleSearch();

        } else {
            alert("提交无效，请注意输入是否有误，或所选择的路径编号是否逻辑存在！！！");
            console.log("confirm提交有问题！！！");
        }
    })


}

function handlePayDeposit(obj){
    let url = "/applyinfo/paydeposit" + "?id=" + obj.id;

    request.put(url).then(res=>{
        if(res.code == '0'){
            console.log("paydeposit成功提交");
            handleSearch();
        } else {
            alert("订金提交失败！");
            console.log("paydeposit有问题！");
        }
    })

}

function handlePayBalance(obj){
    let url = "/applyinfo/paybalance" + "?id=" + obj.id;

    request.put(url).then(res=>{
        if(res.code == '0'){
            console.log("paybalance成功提交");
            handleSearch();
        } else {
            alert("余款提交失败！");
            console.log("paybalance有问题！");
        }
    })
}

function handleCancel(obj){

    let url = "/applyinfo/cancel" + "?id="+obj.id;


    request.put(url).then(res=>{
        if(res.code == '0'){
            console.log("cancel成功提交");
            handleSearch();
        } else {
            alert("取消失败！");
            console.log("cancel有问题！");
        }
    })
};


function tableRowStyleName({row,rowIndex}){
    if(row.cancelStatus == 1){
        // console.log(rowIndex);
        return {
            "--el-table-tr-bg-color": "rgb(126 84 84 / 60%)",
        }
    }
};


handleSearch();


</script>