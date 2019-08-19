<template>
    <div>
        <!-- 已经到底了 -->
        <div class="center">
          <span></span>
          <div>已经到底了</div>
          <span></span>
        </div>
    </div>
</template>

<script>
import * as types from "../constant/ConstantConfig.js";
    export default {
        data() {
            return {
            };
        },
        methods: {

        }
    }
</script>

<style scoped>
  .center{
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center div{
    color:rgba(4,11,28,.3);
    font-size: 13px;
    margin: 0 4px;
  }
  .center span{
    width: 24px;
    height: 1px;
    background:rgba(4,11,28,.2);
  }
</style>
