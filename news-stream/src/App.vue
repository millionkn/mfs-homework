<template>
  <div id="app" style='display:flex'>
    <div v-for="(arr,x) in arrs" :key="x" class="list">
      <div ref="refArr" style='width:100%'>
        <news v-for="(obj,y) in arr" :key="y" :da="obj"></news>
      </div>
    </div>
  </div>
</template>

<script>
import News from './News.vue';
function Queue(p){
  var promise = p.$nextTick();
  this.add=function(fun){
    promise = promise.then(()=>{
      var ret = fun();
      if(ret&&ret.then){
        return ret.then(function(){return p.$nextTick()})
      }else{
        return p.$nextTick()
      }
    })
  }
}
var ajaxGet = (function(){
	var default_options={
		pageSize:30,
		page:1
	};
	return function(options={}){
		return new Promise((a,b)=>{
			var ajax = new XMLHttpRequest();
			var options = Object.assign(default_options,options);
			ajax.onreadystatechange=function(){
				if(ajax.readyState != 4){return}
				(ajax.status == 200 || ajax.status == 304) ? a(ajax.responseText) : b(ajax.status);
			}
			ajax.open("GET",`https://api.learning.mafengshe.com/news?page=${options.page}&pageSize=${options.pageSize}`,true);
			ajax.send();
		})
	}
})();
export default {
  name: 'app',
  mounted:function(){
    var num = this.row;
    while((num--)>0){this.arrs.push([])}
    ajaxGet().then((data)=>{
      JSON.parse(data).result.data.list.forEach((obj)=>{
        this.queue.add(()=>{this.addOne(obj)})
      })
    })
  },
  data:function(){
    return{
      arrs:[],
      queue:new Queue(this)
    }
  },
  props:{
    row:{
      type:Number,
      default:3
    }
  },
  components:{
    'news':News
  },
  methods:{
    'addOne':function(obj){
      var min = {};
      var num = -1;
      this.$refs.refArr.forEach(function(dom,index){
        if(!(min.offsetHeight<=dom.offsetHeight)){
          min = dom;
          num = index;
        }
      });
      this.arrs[num].push(obj)
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
  width:600px;
}

.list{
  flex-basis: 0%;
  flex-grow:1;
}
</style>
