<template>
  <div class="schedule-desk">
    <div class="schedule-desk__timeline">
      <span
        class="schedule-desk__time-item"
        v-for="time in timeline"
        :key="time"
      >
        {{ time }}
      </span>
    </div>

    <div class="schedule-desk__main-section">
      <ScheduleList :items="deskList" deskSchedule></ScheduleList>

      <ScheduleDeskSection
        v-for="(time, index) in timeline"
        :key="time"
        :index="index"
        :time="time"
        class="schedule-desk__row"
      ></ScheduleDeskSection>

      <ScheduleDeskSection :index="timeline.length"></ScheduleDeskSection>
    </div>
  </div>
</template>

<script>
import ScheduleDeskSection from "@/components/ScheduleDeskSection.vue";
import ScheduleList from "@/components/ScheduleList.vue";
import { mapState } from "vuex";

export default {
  name: "ScheduleDesk",

  components: {
    ScheduleList,
    ScheduleDeskSection
  },

  data() {
    return {
      scheduleDesk: {
        from: 5,
        to: 15,
        step: 30
      },
      timeline: []
    };
  },

  computed: {
    ...mapState({
      deskList: state => state.schedule.deskList
    })
  },

  mounted() {
    // Setup timelime
    const fromInMin = this.scheduleDesk.from * 60;
    const toInMin = this.scheduleDesk.to * 60;

    for (
      let index = fromInMin;
      index <= toInMin;
      index += this.scheduleDesk.step
    ) {
      const hour = Math.floor(index / 60);
      const minutes = index % 60 === 0 ? "00" : index % 60; // TODO: make more responsive for different time steps
      this.timeline.push(`${hour}:${minutes}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.schedule-desk {
  display: flex;
  width: 100%;
  overflow: hidden;
  &__timeline {
    position: relative;
    top: -25px;
    text-align: center;
    border: 1px solid #e6eaee;
    background: #edf2f5;
    min-width: 70px;
    padding: 8px 0;
  }
  &__time-item {
    display: block;
    margin: 40px 0;
    font-size: 14px;
    color: #7f8fa4;
  }

  &__main-section {
    position: relative;
    top: -25px;
    flex: 1 1;
  }
  &__row {
    display: flex;
  }
}
</style>
