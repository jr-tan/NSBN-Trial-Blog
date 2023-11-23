<template>
  <h1> {{ title }} {{phone.voicemail}} </h1>
  <p>{{weather.datetime}} {{weather.timezone}}</p>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      title : 'My app',
      phone : {ring : 'ring', voicemail : 'go voice mail bye'},
      weather : {}
    }
  },
mounted(){
    fetch('http://worldtimeapi.org/api/timezone/Singapore')
      .then( res => res.json())
      .then(data => this.weather = data)
      .catch(err => console.log(err.message))
}}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
