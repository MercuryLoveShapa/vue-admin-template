<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/logo.gif" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>-->
          <router-link to="/user/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <el-dropdown-item @click.native="verificationWindows = true">修改密码</el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改验证弹窗 -->
    <el-dialog
      title="请验证您的密码"
      :visible.sync="verificationWindows"
      center="true"
      destroy-on-close="true"
      :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="密码：" :label-width="formLabelWidth" @keyup.enter.native="verification">
          <el-input v-model="verificationform.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="verificationCancel">取 消</el-button>
        <el-button type="primary" @click="verification">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      title="请验证您的密码"
      :visible.sync="changePasswordWindows"
      center="true"
      :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="请输入您的新密码：" :label-width="formLabelWidth" @keyup.enter.native="changePWD">
          <el-input v-model="changeform.newPassword" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="请确认您的新密码：" :label-width="formLabelWidth">
          <el-input v-model="changeform.newPasswordVerification" autocomplete="off" type="password" @keyup.enter.native="changePWD"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePWDCancel">取 消</el-button>
        <el-button type="primary" @click="changePWD">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  data() {
    return {
      verificationform: {
        password: ""
      },
      changeform:{
        newPassword:"",
        newPasswordVerification:""
      },
      // 用于判断验证窗口是否打开
      verificationWindows: false,
      // 判断修改密码窗口打开
      changePasswordWindows: false
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },


  
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      localStorage.removeItem("token");
      this.$message("账号已退出");
      this.$router.push(`/login`);
    },
    // 验证事件
    verification() {
      this.axios
        .post("http://192.168.33.110:3000/api/verification", {
          // username:this.form.username,
          password: this.verificationform.password
        })
        .then(res => {
          if (res.data.code == 0) {
            this.verificationWindows = false
            this.changePasswordWindows = true
            this.verificationform.password = ""
          } else {
            alert(res.data.msg);
          }
        });
    },
    // 验证取消事件
    verificationCancel(){
      this.verificationWindows = false;
      this.verificationform.password = ""
    },
    // 修改密码事件
    changePWD(){
      if (this.changeform.newPassword == this.changeform.newPasswordVerification){
        this.axios
        .post("http://192.168.33.110:3000/api/changepwd",{
          password: this.changeform.newPassword
        })
        .then(res => {
          if(res.data.code == 0){
            this.$message({
                message: res.data.msg,
                type: 'success'
            });
            this.changePasswordWindows = false
            this.changeform.newPassword = ""
            this.changeform.newPasswordVerification = ""
          }else{
            alert(res.data.msg)
          }

        })

      }else{
        alert("两次输入的密码不一致")
      }

    },
    // 修改密码退出事件
    changePWDCancel(){
      this.changePasswordWindows = false
      this.changeform.newPassword = ""
      this.changeform.newPasswordVerification = ""
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
