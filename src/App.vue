<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: "ProximaNova";
  src: url("~@/assets/fonts/ProximaNova.ttf");
  src: local("☺"), url("~@/assets/fonts/ProximaNova.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background: #eff3f6;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 30px;
}

// ICONS
.icon-calendar {
  width: 18px;
  height: 20px;
  background: url("~@/assets/images/calendar.png");
}
.icon-clock {
  width: 24px;
  height: 24px;
  background: url("~@/assets/images/clock.png");
}
.icon-crane {
  width: 22px;
  height: 20px;
  background: url("~@/assets/images/crane.png");
}

.icon-edit {
  display: inline-block;
  width: 21px;
  height: 21px;
  background: url("~@/assets/images/edit.png");
}
</style>
