<template>
  <div>
    <div
      class="schedule-section"
      :class="{ 'schedule-section--dragging': isDragOver1 }"
      :style="{ background: index % 2 === 0 ? '#f9fbfd' : '#ffffff' }"
      @drop="onDropFirstSection"
      @dragover.prevent="isDragOver1 = true"
      @dragleave="isDragOver1 = false"
    ></div>
    <div
      class="schedule-section"
      :class="{ 'schedule-section--dragging': isDragOver2 }"
      :style="{ background: index % 2 === 0 ? '#f9fbfd' : '#ffffff' }"
      @drop="onDropSecondSection"
      @dragover.prevent="isDragOver2 = true"
      @dragleave="isDragOver2 = false"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ScheduleDeskSection",

  props: {
    index: {
      type: Number,
      default: 0
    },

    time: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isDragOver1: false,
      isDragOver2: false
    };
  },

  computed: {
    isAvaliableSection() {
      return this.index !== 0;
    }
  },

  methods: {
    ...mapMutations({
      moveScheduleCard: "schedule/moveScheduleCard"
    }),

    onDrop({ event, section }) {
      if (this.isAvaliableSection) {
        let { schedule, from } = JSON.parse(
          event.dataTransfer.getData("schedule")
        );

        schedule.deskTimeStart = this.time;
        schedule.deskIndex = this.index;
        schedule.section = section;
        this.moveScheduleCard({ schedule, from, to: "deskList" });
      }
    },

    onDropFirstSection(event) {
      this.onDrop({ event, section: 1 });
      this.isDragOver1 = false;
    },
    onDropSecondSection(event) {
      this.onDrop({ event, section: 2 });
      this.isDragOver2 = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.schedule-section {
  width: 50%;
  height: 57px;
  border-bottom: 1px solid #e6eaee;
  border-right: 1px solid #e6eaee;
  background: #f9fbfd;
  float: left;
  transition: all 0.25s ease;
  &--dragging {
    box-shadow: inset 0px 0px 7px #e3e3e3;
    border: 1px dashed rgb(131, 131, 131);
  }
}
</style>
