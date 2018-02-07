<template>
  <div class="list">
    <news v-for="(obj,index) in arr"/>
  </div>
</template>

<script>
import News from './News.vue';
export default {
  props:['objarr'],
  components:{
    'news':News
  },
  computed:{
    arr:function(){
      return this.objarr
    }
  },
  methods:{
    'push':function(obj){
      this.arr.push(obj)
      console.log(this.arr)
    }
  }
}
</script>

<style scoped>
.list {
  width:33%;
  display: inline-block;
}
</style>