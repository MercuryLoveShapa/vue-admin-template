<template>
  <div class="app-container">
    
    <el-table
      v-loading="listLoading"
      :data="matchList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- ID -->
      <el-table-column align="center" prop="id" label="赛事ID" width="95"></el-table-column>

      <!-- name -->
      <el-table-column label="赛事名称" prop="name"></el-table-column>

      <!-- theme -->
      <el-table-column label="赛事主题" prop="theme" width="200" align="center"></el-table-column>

      <!-- area -->
      <el-table-column label="赛事地区" prop="area" width="200" align="center"></el-table-column>


      <!-- begin_time -->
      <el-table-column align="center" prop="begin_time" label="开始时间" width="200"></el-table-column>

      <!-- 按钮 -->
      <el-table-column align="center" prop="created_at" label="操作" width="180">
        <template slot-scope="scope">
        <el-button type="primary" @click="matchMessage(scope.row.id)">查看</el-button>
      </template>
      </el-table-column>
    </el-table>
  
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total=total
        :current-page="1"
        :page-size="10"
        
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import { identifier } from '@babel/types';

export default {
  data() {
    return {
      // 赛事列表
      matchList: [],
      // 是否等待
      listLoading: true,
      // 当前页数
      currentPage: 1,
      // 总条目数
      total:""
    };
  },
  mounted() {
    this.axios
      .get("http://192.168.33.110:3000/api/matchList", {
        params: {
          page: this.currentPage
        }
      })
      .then(res => {
        if (res.data.code == 0) {
          console.log(res.data.total)
          this.total = res.data.total
          this.matchList = res.data.data;
          this.listLoading = false;
          this.$forceUpdate();
        } else if (res.data.code == 401) {
          localStorage.removeItem("token");
          this.$message(res.data.msg);
          this.$router.push(`/login`);
        } else {
          this.$message(res.data.msg);
        }
      });
  },

  methods: {
    matchMessage(id){
      console.log(id)
      this.$router.push({name:"matchID",params:{id:id}})
    },


    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // this.fetchData(currentPage, this.pageSize)
      this.axios
        .get("http://192.168.33.110:3000/api/matchList", {
          params: {
            page: this.currentPage
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.matchList = res.data.data;
            this.listLoading = false;
            this.$forceUpdate();
          } else if (res.data.code == 401) {
            localStorage.removeItem("token");
            this.$message(res.data.msg);
            this.$router.push(`/login`);
          } else {
            this.$message(res.data.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}



</style>