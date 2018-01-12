<style scoped>
.matchContent{
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: white;
  margin-bottom: 80px;
  margin-top: 5px;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
}
</style>

<template>

<div class="matchContent">
  <iframe src="http://192.168.3.163:8080/fzkb/matchMobilePage" frameborder="0" height="720px" scrolling='no' style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
  </div>

</template>

<script>

/*eslint-disable*/
export default {
    data() {
            return {

            }
        },
        methods: {

        },
        created(){

        }
}

</script>
