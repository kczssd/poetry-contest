<template>
<div>
      <header>
        <img id="title" :src="head">
      </header>
</div>
</template>

<script>
const head = require('@/assets/country.png')
export default {

  data(){
    return{
      head,
    }
  }
}
</script>

