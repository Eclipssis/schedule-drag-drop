<template>
  <div class="schedule-desk">
    <div class="schedule-desk__timeline">
      <span
        class="schedule-desk__time-item"
        v-for="time in timeline"
        :key="time.text"
      >
        {{ time.text }}
      </span>
    </div>

    <div class="schedule-desk__main-section">
      <ScheduleList :items="deskList" :list-type="'deskList'"></ScheduleList>

      <ScheduleDeskSection
        v-for="(time, index) in timeline"
        :key="time.text"
        :index="index"
        :time="timeline[index - 1]"
        class="schedule-desk__row"
      ></ScheduleDeskSection>

      <ScheduleDeskSection
        :index="timeline.length"
        :time="timeline[timeline.length - 1]"
        class="schedule-desk__row"
      ></ScheduleDeskSection>
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
      timeline: []
    };
  },

  computed: {
    ...mapState({
      deskList: state => state.schedule.deskList,
      scheduleDesk: state => state.schedule.scheduleDesk
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
      const minutes = index % 60; // TODO: make more responsive for different time steps
      const stringMinutes = minutes === 0 ? "00" : minutes;

      this.timeline.push({
        text: `${hour}:${stringMinutes}`,
        hour,
        minutes
      });
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
