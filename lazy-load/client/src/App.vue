<template>
  <div id="app">
    <div @click="handleClick">
    <el-cascader
      :options="children"
      v-model="checked"
      @active-item-change="handleChange"
    />
    </div>
  </div>
</template>

<script>
var getData=function(f,city1,city2){
  var str="data/";
  if(city1){
    str+=city1+"/";
    if(city2){str+=city2+"/"}
  }
  $.getJSON(str,function(result){
    f(result.map((x)=>{return {
        label:x.name,
        value:x.code,
        children:x.isLast?undefined:[]
    }}));
  })
}
export default {
  name: 'app',
  data () {
    return {
      checked : undefined,
      children:[]
    }
  },
  methods:{
    "handleChange":function(arr){
      var city=this;
      arr.forEach((value)=>{city = city.children.find((x)=>{return x.value==value})})
      if(city.children.length==0){getData((result)=>{city.children=result},...arr)}
    },
    "handleClick":function(){
      var ajaxed = false;
      return function(val){
        if(ajaxed){return}
        ajaxed = true;
        var t = this;
        getData(function(result){t.children=result})
      }
    }()
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
