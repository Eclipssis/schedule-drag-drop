<template>
  <div class="schedule">
    <section class="schedule__left-section">
      <h2>Unscheduled</h2>
      <ScheduleList
        :items="unScheduledList"
        :list-type="'unScheduledList'"
      ></ScheduleList>

      <h2>Recently Updated</h2>
      <ScheduleList
        :items="resentlyUpdatedList"
        :list-type="'resentlyUpdatedList'"
      ></ScheduleList>
    </section>

    <div class="schedule__right-section">
      <ScheduleDesk></ScheduleDesk>
    </div>
  </div>
</template>

<script>
import ScheduleList from "@/components/ScheduleList.vue";
import ScheduleDesk from "@/components/ScheduleDesk.vue";
import { mapState } from "vuex";

export default {
  name: "Home",

  components: {
    ScheduleDesk,
    ScheduleList
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      unScheduledList: state => state.schedule.unScheduledList,
      resentlyUpdatedList: state => state.schedule.resentlyUpdatedList
    })
  }
};
</script>
<style lang="scss" scoped>
.schedule {
  display: flex;
  min-height: 100vh;
  text-align: left;
  font-family: "ProximaNova";

  &__left-section {
    max-width: 50%;
    flex: 1 1 50%;
    padding: 40px 30px 40px 15px;
    height: 100vh;
    overflow: auto;
  }

  &__right-section {
    max-width: 50%;
    flex: 1 1 50%;
    padding: 12px 12px 12px 0;
    height: 100vh;
    overflow: auto;
  }
}
</style>
