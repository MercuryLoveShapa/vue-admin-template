<template>
  <div class="app-container">
    <h1 class="lines">个人中心</h1>
    <br />
    <div>
      <div class="line">
        <el-descriptions direction="vertical" :column="3" border>
          <el-descriptions-item label="姓名">{{true_name }}</el-descriptions-item>
          <el-descriptions-item label="账号">{{name}}</el-descriptions-item>
          <el-descriptions-item label="邮箱" :span="2">{{ email }}</el-descriptions-item>
          <el-descriptions-item label="性别">
            <!-- <el-tag v-if=" gender==1">男</el-tag>
            <el-tag v-if=" gender==0">女</el-tag>-->
            <el-tag :type="gender==0?'danger':''">{{gender==0?"女":"男"}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="身份证号">{{ card_number }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ number }}</el-descriptions-item>
          <el-descriptions-item label="说明">{{ desc }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <br />

    <div class="lines">
      <router-link to="/user/change">
        <el-button type="primary">修改信息</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      true_name: "",
      card_number: "",
      name: "",
      number: "",
      gender: 0,
      email: "",
      desc: ""
    };
  },
  mounted() {
    // 调用接口
    this.axios
      .get("http://192.168.33.110:3000/api/userinfo")
      .then(res => {
        console.log(res);
        if (res.data.code == 0){
          this.true_name = res.data.data.true_name;
          this.card_number = res.data.data.card_number;
          this.name = res.data.data.name;
          this.email = res.data.data.email;
          this.number = res.data.data.number;
          this.gender = res.data.data.gender;
          this.desc = res.data.data.desc;
        }
        else if (res.data.code == 401){
        localStorage.removeItem('token')
        this.$message(res.data.msg);
        this.$router.push(`/login`)
        }else{
        this.$message(res.data.msg);
        }
      })
      
  },

  methods: {}
};
</script>

<style scoped>
.line {
  width: 75%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.lines {
  margin-top: 30px;
  position: relative;
  left: 48%;
}
</style>

