<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ username }}老师</div>
    <div class="model">
      <div class="coll-top pd50">
        <div>
          <!-- 标题logo -->
          <h2>
            
              <img src="https://www.bnuzh.edu.cn/images/t_tzgs.png" alt />
            
          </h2>
        </div>
        <!-- 列表 -->
        <div>
          <ul v-for="(item,index) in announcement" :key="item">
            
            <li v-show="index<9" @click="itemClick(item.id)">{{ item.title }}</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  announcement:[],
  username:"",
  // name: "12345",
  // computed: {
    
  // },

  
  mounted(){
    this.axios
    .get('http://192.168.33.110:3000/api/announcement')
    .then( res=>{
      if (res.data.code == 0){
        this.username = res.data.username
        // console.log(res.data.username)
        this.announcement = res.data.data
        // console.log(res.data.data)
        this.$forceUpdate()
      }
      else if(res.data.code  == 401){
        localStorage.removeItem('token')
        this.$message(res.data.msg);
        this.$router.push(`/login`)
      }
      else{
        this.$message(res.data.msg);
      }
      
    })
  },
  methods:{
    itemClick(id){
      this.$router.push({name:"dashboardID",params:{id:id}})
    }
  }
};



</script>

<style lang="scss" scoped>
.dashboard {
  position: relative;
  width: 100%;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin: 0px auto 40px auto;
  }
}

.model {
  // margin: 0px auto;
  background: url("../../assets/background/item-bg.jpg");
  background-size: cover;
  margin-top: 3rem;
  width: 80%;
  min-width: 200px;
  height: 56rem;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
  display: flex;
  
  // margin-left: 15rem;
}

.gp-pr {
  position: relative;
}

.coll {
  &-top {
    box-sizing: border-box;
    min-height: 56rem;
    width: 35rem;
    // min-width: 41.6rem;
    background-color: rgba(0, 78, 162, 0.6);
    // background-color: rgba($color: #000000, $alpha: 0.8);
  }

}
.pd50 {
  padding: 50px 60px;
  color: #ffffff;
}
ul {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

ul,ol,li {
  list-style: none outside none;
  list-style-position: outside;
  list-style-image: none;
  list-style-type: none;
}

li {
  padding:20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  text-align: -webkit-match-parent;
  transition-duration:0.3s
}

li:hover{

   transform:translate(10px,0);
  
}
</style>
