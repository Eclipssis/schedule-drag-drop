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
      :listType="listType"
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

    listType: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isDragOver: false
    };
  },

  computed: {
    deskSchedule() {
      return this.listType === "deskList";
    }
  },

  methods: {
    ...mapMutations({
      moveScheduleCard: "schedule/moveScheduleCard"
    }),

    onDragLeave() {
      this.isDragOver = false;
    },

    onDrop(event) {
      let { schedule, from } = JSON.parse(
        event.dataTransfer.getData("schedule")
      );
      this.isDragOver = false;
      this.moveScheduleCard({ schedule, from, to: this.listType });
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
