<template>
  <div class="competition-info">
    
    <div class="title">赛事信息</div>
    <div class="competition-item">
      <div class="item-label">赛事名称：</div>
      <div class="item-value">{{ competition.name }}</div>
    </div>
    <div class="competition-item">
      <div class="item-label">赛事主题：</div>
      <div class="item-value">{{ competition.theme }}</div>
    </div>
    <div class="competition-item">
      <div class="item-label">赛事地区：</div>
      <div class="item-value">{{ competition.area }}</div>
    </div>
    <div class="competition-item">
      <div class="item-label">赛事奖励：</div>
      <div class="item-value">{{ competition.reward }}</div>
    </div>
    <div class="competition-item">
      <div class="item-label">开始时间：</div>
      <div class="item-value">{{ competition.startTime }}</div>
    </div>
    <div class="competition-item">
      <div class="item-label">结束时间：</div>
      <div class="item-value">{{ competition.endTime }}</div>
    </div>
    <div class="title">赛程信息</div>
    <el-table :data="competition.schedules" style="width: 100%">
      <el-table-column prop="name" label="赛程名称"></el-table-column>
      <el-table-column prop="demand" label="赛程需求"></el-table-column>
      <el-table-column prop="manner" label="赛程比赛方式"></el-table-column>
      <el-table-column prop="begin_time" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" label="结束时间"></el-table-column>
    </el-table>

    
      <el-button type="primary" @click="goBack">返回</el-button>
    
  </div>
</template>
  
<script>
export default {
  data() {
    return {
        id:this.$route.params.id,
      competition: {
        name: "",
        theme: "",
        area: "",
        reward: "",
        startTime: "",
        endTime: "",
        schedules: []
      }
    };
  },
  mounted(){
    this.axios
    .get("http://192.168.33.110:3000/api/match",{
        params:{
            id : this.id
        }
    })
    .then(res=>{
        console.log(res)
        this.competition.name = res.data.data.match_msg.area;
        this.competition.theme = res.data.data.match_msg.theme;
        this.competition.area = res.data.data.match_msg.area;
        this.competition.reward = res.data.data.match_msg.reward;
        this.competition.startTime = res.data.data.match_msg.begin_time;
        this.competition.endTime = res.data.data.match_msg.end_time;
        this.competition.schedules = res.data.data.scheduleList

    })
  },


  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
  
<style scoped>
.competition-info {
  margin: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.competition-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-label {
  width: 120px;
  font-size: 18px;
  font-weight: bold;
}

.item-value {
  font-size: 18px;
}

.el-table {
  margin-top: 20px;
}

.el-button {
  margin-top: 30px;
  position: relative;
  left: 48%;
}
</style>