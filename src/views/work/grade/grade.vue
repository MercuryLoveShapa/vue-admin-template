<template>
  <!-- 项目详情卡片 -->
  <div class="project-card">
    <div class="project-card-header">
      <h3 class="project-title">测试项目1</h3>
      <el-rate v-model="project.rating" disabled allow-half show-score></el-rate>
    </div>

    <div class="project-details">
      <div class="project-info">
        <span class="project-label">项目说明：</span>
        <p class="project-description">{{ project.description }}</p>
      </div>
      <div class="project-info">
        <span class="project-label">所属公司：</span>
        <span class="project-company">{{ project.company }}</span>
      </div>
      <div class="project-info">
        <span class="project-label">负责人：</span>
        <span class="project-leader">{{ project.leader }}</span>
      </div>
      <div class="project-info">
        <span class="project-label">电话：</span>
        <a
          class="project-leader-phone"
          :href="'tel:' + project.leaderPhone"
        >{{ project.leaderPhone }}</a>
      </div>
      <div class="project-card-content">
        <div class="project-image-container" style="width:1000px">
          <el-carousel indicator-position="outside" arrow="never">
            <el-carousel-item
              v-for="(image, index) in project.images"
              :key="index"
              style="left:27%"
              class="images"
            >
              <!-- <span>{{image.url}}</span> -->
              <img :src="image.url" alt="Project Screenshot" style="width:auto;height:100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div>
        <h4>请您为以下赛事打分</h4>
        <el-rate v-model="value1"></el-rate>
        <br />
        <el-button type="primary" round @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ProjectShowcase",

  data() {
    return {
      value1: null,
      cardData: [],
      project: {
        required: true,
        description:
          "login information in the General tab. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab.",
        company: "蔡蔡科技有限公司",
        leader: "蔡徐坤",
        leaderPhone: "124545",
        images: [
          {
            url:
              "https://bs-edu-english.oss-cn-hangzhou.aliyuncs.com/2023/03/30/121/893d1953b8eb44a2bbc1fcb50f41201exxx.png"
          },
          {
            url:
              "https://bs-edu-english.oss-cn-hangzhou.aliyuncs.com/2023/03/30/2/e7c7f63d54164b47b291c7d58d9c7d222.jpg"
          },
          {
            url:
              "https://bs-edu-english.oss-cn-hangzhou.aliyuncs.com/2023/03/30/1/a5674720a7d04fa9af8a4e0519f4c1c51.jpg"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      if (this.value1 == null) {
        this.$message({
          message: "请您进行评分！",
          type: "warring"
        });
      } else {
        this.$message({
          message: "评分成功",
          type: "success"
        });
        this.$router.push("/work/grade");
      }
    }
  }
};
</script>
  
  <style scoped>
/* 项目详情卡片样式 */
.project-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.project-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0;
}

.el-rate__score {
  color: #409eff;
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
}

.el-carousel__item img {
  max-width: 100%;
  height: auto;
}

.project-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-info {
  margin-bottom: 12px;
}

.project-label {
  font-size: 16px;
  font-weight: 700;
  color: #2d2d2d;
}

.project-description {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.project-company {
  font-size: 16px;
  color: #409eff;
  margin-right: 10px;
}

.project-leader {
  font-size: 16px;
  color: #2d2d2d;
  margin-right: 10px;
}

.project-leader-phone {
  font-size: 16px;
  color: #409eff;
  text-decoration: none;
}

.project-leader-phone:hover {
  text-decoration: underline;
}
.images {
  transform: translate(-50%, 0);
}
</style>
  