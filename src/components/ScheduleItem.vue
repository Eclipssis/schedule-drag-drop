<template>
  <div
    class="schedule-item"
    :class="{
      'schedule-item--overlay': isDeskSchedule
    }"
    :style="getPositionOnDesk"
    draggable="true"
    @dragstart="dragStart"
  >
    <div
      class="schedule-item__border"
      :style="{ background: schedule.color }"
    ></div>
    <span class="schedule-item__drag-decor"></span>

    <div class="schedule-item__name">
      <div class="schedule-item__title" v-if="schedule.title">
        {{ schedule.title }}
      </div>
      <div
        class="schedule-item__company"
        v-if="schedule.company && !isDeskSchedule"
      >
        {{ schedule.company }}
      </div>

      <div class="schedule-item__duration" v-if="isDeskSchedule">
        {{ schedule.duration }}
      </div>
    </div>

    <div class="info-panel" v-if="!isDeskSchedule">
      <div class="info-panel__item info-panel__item--date" v-if="schedule.day">
        <i class="info-panel__icon icon-calendar"></i>
        <span class="info-panel__main-text">{{ schedule.day }}</span>
        <span class="info-panel__secondary-text" v-if="schedule.time"
          >- {{ schedule.time }}</span
        >
      </div>

      <div
        class="info-panel__item info-panel__item--duration"
        v-if="schedule.duration"
      >
        <i class="info-panel__icon icon-clock"></i>
        <span class="info-panel__secondary-text">{{ schedule.duration }}</span>
      </div>

      <div
        class="info-panel__item info-panel__item--workers"
        v-if="schedule.workers"
      >
        <i class="info-panel__icon icon-crane"></i>
        <span class="info-panel__secondary-text">{{ schedule.workers }}</span>
      </div>
    </div>

    <span class="schedule-item__edit" v-if="!isDeskSchedule">
      <i class="icon-edit"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "ScheduleItem",

  props: {
    schedule: {
      type: Object,
      default: () => {}
    },

    isDeskSchedule: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getPositionOnDesk() {
      const sectionHeight = 57;
      const overlayStyles = {
        top: this.schedule.deskIndex * sectionHeight + "px",
        left: this.schedule.section === 1 ? "7px" : "51%"
      };
      return this.isDeskSchedule ? overlayStyles : {};
    }
  },

  methods: {
    dragStart(event) {
      const from = this.isDeskSchedule ? "deskList" : "scheduleList";
      const payload = JSON.stringify({
        schedule: this.schedule,
        from
      });
      event.dataTransfer.setData("schedule", payload);
    }
  }
};
</script>
<style lang="scss" scoped>
.schedule-item {
  position: relative;
  display: flex;
  background: #ffffff;
  padding: 3px;
  border-radius: 3px;
  box-shadow: 0 3px 7px rgba(103, 162, 206, 0.13);
  margin-bottom: 10px;
  line-height: 22px;
  transition: all 0.3s ease;
  min-height: 93px;

  &:hover {
    box-shadow: 0 3px 7px rgba(103, 162, 206, 0.5);
    transform: scale(1.02);
  }

  &--overlay {
    position: absolute;
    width: 48%;
    min-height: 59px;
  }

  &:last-child {
    margin-bottom: 30px;
  }

  &__border {
    width: 3px;
    min-width: 3px;
    background-color: #f60;
    border-radius: 2px;
    pointer-events: none;
  }

  &__drag-decor {
    position: absolute;
    top: 8px;
    left: 14px;
    width: 9px;
    height: 9px;
    background: url("~@/assets/images/drag-decor.png");
    cursor: pointer;
    pointer-events: none;
  }

  &__duration {
    font-size: 14px;
    color: #7f8fa4;
    pointer-events: none;
  }

  &__name {
    align-self: center;
    margin-left: 30px;
    width: 100%;
    max-width: 300px;
    pointer-events: none;
  }

  &__title {
    font-size: 18px;
    color: #2c3846;
    font-weight: 600;
  }

  &__company {
    font-size: 16px;
    color: #7f8fa4;
    font-weight: 600;
  }

  &__edit {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 82px;
    pointer-events: none;
  }

  .icon-edit {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
}

.info-panel {
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 33px;
  border-left: 1px solid #e6eaee;
  border-right: 1px solid #e6eaee;
  max-width: 485px;
  width: 100%;
  padding: 0 30px;

  &__item {
    font-size: 18px;
    display: flex;
    flex: 1 1;
    align-items: center;
    margin: 0 1px;
    &--date {
      min-width: 180px;
    }

    &--duration {
      min-width: 170px;
    }

    &--workers {
      min-width: 70px;
    }
  }

  &__main-text {
    color: #2c3846;
  }

  &__secondary-text {
    color: #7f8fa4;
  }

  &__icon {
    display: inline-block;
    margin-right: 10px;
    line-height: 27px;
  }
}
</style>
