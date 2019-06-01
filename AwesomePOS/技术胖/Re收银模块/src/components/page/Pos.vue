<template>
  <div class="pos">
    <el-row>
      <el-col :span='7' class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table border style="width:100%" :data="tableData">
              <!-- label显示的标题 -->
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <!-- 因为没有循环没有goods-->
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
              <small>数量：</small>{{totalCount}} &nbsp;&nbsp;&nbsp;<small>金额:</small> {{totalMoney}}元
            </div>
            <div class="div-btn">
              <el-button type="warning" size="medium">挂单</el-button>
              <el-button type="danger" size="medium" @click="delAllGoods()">删除</el-button>
              <el-button type="success" size="medium" @click="checkout()">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" :key="goods.goodsId" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type0Goods" :key="goods.goodsId" @click="addOrderList(goods)">
                    <div class="cook-left">
                      <span class="foogImg"><img :src="goods.goodsImg" width="100%"></span>
                    </div>
                    <div class="cook-right">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type1Goods" :key="goods.goodsId" @click="addOrderList(goods)">
                    <div class="cook-left">
                      <span class="foogImg"><img :src="goods.goodsImg" width="100%"></span>
                    </div>
                    <div class="cook-right">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type2Goods" :key="goods.goodsId" @click="addOrderList(goods)">
                    <div class="cook-left">
                      <span class="foogImg"><img :src="goods.goodsImg" width="100%"></span>
                    </div>
                    <div class="cook-right">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type3Goods" :key="goods.goodsId" @click="addOrderList(goods)">
                    <div class="cook-left">
                      <span class="foogImg"><img :src="goods.goodsImg" width="100%"></span>
                    </div>
                    <div class="cook-right">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pos',
  data () {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0
    }
  },
  created: function () {
    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
      .then(response => {
        // console.log(response)
        this.oftenGoods = response.data
      })
      .catch(error => {
        console.log(error)
        alert('网络错误无法访问')
      })

    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
      .then(response => {
        console.log(response)
        this.type0Goods = response.data[0]
        this.type1Goods = response.data[1]
        this.type2Goods = response.data[2]
        this.type3Goods = response.data[3]
      })
      .catch(error => {
        console.log(error)
        alert('网络错误无法访问')
      })
  },
  // 当所有的虚拟DOM加载完成后
  mounted: function () {
    // Element组件库设置的缘故，不能用height：100%实现想要的结果，故要用js原生写法
    var orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  methods: {
    addOrderList (goods) {
      // this.totalMoney = 0
      // this.totalCount = 0
      // 判断商品是否已经存在tableData列表当中
      let isHave = false
      // 循环tableData列表中是否有传过来的数据
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }
      // 如果存在，数量+1
      if (isHave) {
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        // 如果不存在，则压入tableData列表
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        }
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    // 删除单个商品
    delSingleGoods (goods) {
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
      this.getAllMoney()
    },
    // 汇总数量和金额(需多次重新汇总)
    getAllMoney () {
      this.totalMoney = 0
      this.totalCount = 0
      if (this.tableData) {
        // tableData中有数据
        this.tableData.forEach((element) => {
          this.totalCount += element.count
          this.totalMoney = this.totalMoney + (element.price * element.count)
        })
      }
    },
    // 全部删除
    delAllGoods () {
      this.tableData = []
      this.totalMoney = 0
      this.totalCount = 0
    },
    // 结账
    checkout () {
      if (this.totalCount !== 0) {
        this.tableData = []
        this.totalMoney = 0
        this.totalCount = 0
        // 友好提示
        this.$message({
          message: '结账成功',
          type: 'success'
        })
      } else {
        this.$message.error('不能空结账')
      }
    }
  }
}
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.div-btn{
  margin-top:20px;
}
.title {
  height: 18px;
  border-bottom: 2px solid #E4E7ED;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
  font-size:15px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 7px;
  border-radius: 5px;
  margin: 10px;
  background-color: #fff;
  font-size:15px;
  cursor: pointer;
}
.o-price,.foodPrice{
  color: #58b7ff;
}
.goods-type{
  clear: both;
}
.cookList li{
  list-style: none;
  width:23%;
  border:1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 2px;
  border-radius: 5px;
  cursor: pointer;
}
.cookList li span{
  display: block;
  float:left;
}
.foodName{
  font-size: 15px;
  padding-left: 10px;
  color:brown;
  padding-top:3px;
}
.foodPrice{
  font-size: 15px;
  padding-left: 10px;
  padding-top:10px;
}
.cook-left{
  float: left;
  width:45%;
}
.cook-right{
  float: right;
  width:55%;
}
.totalDiv{
  background-color: #fff;
  padding:10px;
  border-bottom:1px solid #d3dce6
}
</style>

<style>
.el-tabs--top .el-tabs__item.is-top:nth-child(2){
  padding-left:20px;
}
.el-tabs--top .el-tabs__item.is-top:last-child{
  padding-right:20px;
}
.is-active{
  border-bottom:2px solid #409EFF;
}
.el-table th{
  background-color: rgb(233, 225, 225);
  padding:10px 0;
}
.el-table td{
  padding:3px 0;
}
.el-table thead{
  color:black;
}
</style>
