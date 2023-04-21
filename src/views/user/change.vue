<template>
  <div class="app-container">
    <h3 class="line">请修改您的信息</h3>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="姓名：" prop="true_name">
        <el-input v-model="form.true_name" />
      </el-form-item>

      <el-form-item label="性别：" prop="gender">
        <el-select placeholder="请选择您的性别" v-model="form.gender">
          <el-option label="男性" :value="1" />
          <el-option label="女性" :value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item label="电话号码：" prop="number">
        <el-input v-model="form.number" />
      </el-form-item>

      <el-form-item label="身份证号：" prop="card_number">
        <el-input v-model="form.card_number" />
      </el-form-item>

      <el-form-item label="说明：">
        <el-input type="textarea" v-model="form.desc" />
      </el-form-item>

      <div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>

          <!-- <router-link to="/user/index"> -->
          <el-button type="warning" @click="onCancel">取消</el-button>
          <!-- </router-link> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        true_name: "",
        gender: 0,
        email: "",
        number: "",
        card_number: "",
        desc: ""
      },
      rules: {
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: ["blur", "change"]
          }
        ],
        number: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "请输入正确的手机号格式",
            trigger: "blur"
          }
        ],
        card_number: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
            message: "请输入正确的身份证号格式",
            trigger: "blur"
          }
        ],
        gender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        true_name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 10, message: "姓名长度不能超过10个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 调用接口获取信息
    this.axios.get("http://192.168.33.110:3000/api/userinfo").then(res => {
      if (res.data.code == 0) {
        this.form.true_name = res.data.data.true_name;
        this.form.card_number = res.data.data.card_number;
        this.form.email = res.data.data.email;
        this.form.number = res.data.data.number;
        this.form.gender = res.data.data.gender;
        this.form.desc = res.data.data.desc;
      } else {
        localStorage.removeItem("token");
        this.$message(res.data.msg);
        this.$router.push(`/login`);
      }
    });
  },
  methods: {
    onSubmit() {
      this.axios
        .post("http://192.168.33.110:3000/api/userchange", {
          true_name: this.form.true_name,
          card_number: this.form.card_number,
          email: this.form.email,
          number: this.form.number,
          gender: this.form.gender,
          desc: this.form.desc
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.$router.go(-1);
          } else if (res.data.code == 401) {
            localStorage.removeItem("token");
            this.$message(res.data.msg);
            this.$router.push(`/login`);
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    onCancel() {
      this.$message({
        message: "您取消了修改",
        type: "warning"
      });
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.line {
  margin-bottom: 2rem;
  margin-left: 2rem;
}
</style>
