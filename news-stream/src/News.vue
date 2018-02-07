<template>
  <div class='news'>
      <a :href="da.URL">{{da.title}}</a>
      <br v-if="da.allPics.pics.length != 0"/>
      <img
        v-for="(pic_obj,pic_index) in da.allPics.pics"
        :key="pic_index"
        :src="pic_obj.imgurl"
      />
      <a>{{da.cTime}}</a>
  </div>
</template>

<script>
export default {
  props:['da']
}
</script>

<style scoped>
img{
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%; 
}
</style>