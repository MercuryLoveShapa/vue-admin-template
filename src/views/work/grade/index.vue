<template>
  <div>
    <div class="dashboard-text">请您为以下赛事打分</div>
    <hr />

    <!-- card -->
    <div class="card-container">
      
      <el-card v-for="(item, index) in cardData" :key="index" class="card-item">
        <!-- card 的插槽 -->
        <template #header>
          <router-link to="/work/grade/index">
          <img :src="item.img_http" alt="Card image" />
          </router-link>
        </template>
        <!-- card 的内容 -->
        <div>
          <h3>{{ item.name }}</h3>
          <div>
            <p>负责人：{{ item.leader }}</p>
            <p>参赛组织：{{ item.organization }}</p>
          </div>
        </div>
      </el-card>
    </div>


  </div>
</template>

<script>
export default {
  name: "Event",
  data() {
    return {
      cardData: []
    };
  },
  mounted(){
    this.axios
    .get('http://192.168.33.110:3000/api/scoreList')
    .then(res=>{
      if (res.data.code == 0) {
          this.cardData = res.data.data
          this.$forceUpdate();
        } else if (res.data.code == 401) {
          localStorage.removeItem("token");
          this.$message(res.data.msg);
          this.$router.push(`/login`);
        } else {
          this.$message(res.data.msg);
        }


    })
  },
  computed: {
    selectedEvent() {
      return this.events[this.activeTab];
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  position: relative;
  width: 100%;
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin: 15px auto 20px 15px;
  }
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
}

.card-item {
  // width: calc(25% - 20px); /* 计算每个卡片的宽度，20px 是 card 的 margin */
  width: 23%;
  margin-left: 20px;
  margin-top: 20px;
}


.card-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
