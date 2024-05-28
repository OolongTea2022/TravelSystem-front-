
<template>

<div id="app">
    <el-container>
        <el-header style="background-color: #333333;">
            <img src="./assets/vue.svg" alt="图标" style="position: relative;top: 10px; ">
            <span style="font-size: 20px;margin-left: 15px;color: white;">旅游管理系统</span>
        </el-header>

    </el-container>

    <el-container>
        <el-aside style="overflow: hidden;min-height: 100vh;background-color: #555555;  width: 200px;">
            <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#555555"
        class="el-menu-vertical-demo"
        :default-active="$router.path"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >

        <el-menu-item index="/">
          <el-icon><HomeFilled  /></el-icon>
          <span>系统首页</span>
        </el-menu-item>

        <el-sub-menu index="">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>信息管理</span>
          </template>
          <el-menu-item-group title="信息表 ">
            <el-menu-item index="/PathBookView">旅游路线</el-menu-item>
            <el-menu-item index="/ApplyInfoView">旅游申请</el-menu-item>
            <el-menu-item index="/ApplyBookView">旅游申请书</el-menu-item>
            <el-menu-item index="/FinanceBookView">财务报表</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>

<!-- 
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
 -->

      </el-menu>
        </el-aside>




        <!-- TODO 主页面设计 -->
        <el-main>
          <router-view/>
        </el-main>
    </el-container>



</div>

</template>
 
<script>
  export default {
    
  }
</script>
 
<style scoped>
.el-menu{
    border-right: none !important;
}
</style>