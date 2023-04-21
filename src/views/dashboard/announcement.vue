<!---<template>
    <div>id:{{this.$route.params.id}}
        <el-button type="primary" plain @click="goBack">返回</el-button>
        </div>
    
  </template>--->

<template>
  <div class="announcement">
    <h1 class="announcement-title">{{ announcement.title }}</h1>
    <div class="announcement-time"> 发布时间：{{ announcement.time }}</div>
    <div class="announcement-content">
      <!-- {{this.$route.params.id}} -->
      {{ announcement.content }}
    </div>
    <button class="announcement-back-btn" @click="goBack">
      返回
    </button>
  </div>
</template>

  
  <script>
  
  export default {
  
  name: "Announcement",
  data() {
    return {
      announcement: {
        title: "",
        content:"",
        time:""
      },
      id :this.$route.params.id
    };
  },
  mounted(){
    this.axios
    .get("http://192.168.33.110:3000/api/announcementContent",
    {params:{
      id: this.id
    }}
    )
    .then(res=>{ 
      console.log(res)
      if (res.data.code == 0){
        this.announcement.title = res.data.data.title
        this.announcement.content = res.data.data.content
        this.announcement.time = res.data.data.publish_time
      }else if (res.data.code == 401){
        localStorage.removeItem('token')
        this.$message(res.data.msg);
        this.$router.push(`/login`)
      }else{
        this.$message(res.data.msg);
      }
     
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
  .announcement {
  max-width: 800px;
  margin: 0 auto;
  /* height: 80vh; */
  padding: 50px 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.announcement-title {
  margin-bottom: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #444;
  text-align: center;
}

.announcement-time {
  margin-bottom: 30px;
  text-align: center;
  font-style:italic;
  font-size:15px;
  color:silver
}

.announcement-content {
  line-height: 1.5;
  font-size: 22px;
  color: #666;
  text-align: justify;
}

.announcement-back-btn {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.announcement-back-btn:hover {
  background-color: #3972b8;
}

  </style>
  