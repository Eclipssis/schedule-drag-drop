<template>
  <div
    class="schedule-list"
    :class="{
      'schedule-list--standart': !deskSchedule
    }"
    :id="[deskSchedule ? 'desk-list' : 'shcedule-list']"
    @dragover.prevent="isDragOver = true"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <ScheduleItem
      v-for="schedule in items"
      :key="schedule.id"
      :schedule="schedule"
      :isDeskSchedule="deskSchedule"
    ></ScheduleItem>

    <div
      class="decoration-drag"
      @dragover.prevent="isDragOver = true"
      v-if="isDragOver && !deskSchedule"
    >
      Drop to schedule
    </div>
  </div>
</template>

<script>
import ScheduleItem from "@/components/ScheduleItem.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    ScheduleItem
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    deskSchedule: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isDragOver: false
    };
  },

  methods: {
    ...mapMutations({
      addToSchedule: "schedule/addToSchedule"
    }),

    onDragLeave() {
      this.isDragOver = false;
    },

    onDrop(event) {
      let { schedule, from } = JSON.parse(
        event.dataTransfer.getData("schedule")
      );
      this.isDragOver = false;
      if (from === "deskList" && event.currentTarget.id === "shcedule-list") {
        this.addToSchedule(schedule);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.schedule-list {
  position: relative;
  z-index: 10;
  &--standart {
    min-height: 80px;
  }
}

.decoration-drag {
  width: 100%;
  z-index: -1;
  height: 60px;
  line-height: 55px;
  font-weight: 700;
  text-align: center;
  border: 2px dashed #bebebe;
  margin-bottom: 30px;
  font-size: 18px;
  pointer-events: none;
}
</style>
