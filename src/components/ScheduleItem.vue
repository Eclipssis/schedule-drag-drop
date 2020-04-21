<template>
  <div
    class="schedule-item"
    :class="{
      'schedule-item--overlay': isDeskSchedule,
      'schedule-item--long': schedule.duration >= 30
    }"
    :style="[getPositionOnDesk, setCardHeight]"
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
        {{ schedule.deskTimeStart.text }} - {{ getCardTimeEnd }} |
        {{ schedule.duration | durationToString }}
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
        <span class="info-panel__secondary-text">{{
          schedule.duration | durationToString
        }}</span>
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
import { mapState } from "vuex";
export default {
  name: "ScheduleItem",

  props: {
    schedule: {
      type: Object,
      default: () => {}
    },

    listType: {
      type: String,
      default: ""
    },

    isDeskSchedule: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      sectionHeight: 57
    };
  },

  computed: {
    ...mapState({
      scheduleDesk: state => state.schedule.scheduleDesk
    }),

    getPositionOnDesk() {
      let zIndex = 0;
      if (this.schedule.deskTimeStart) {
        zIndex =
          this.schedule.deskTimeStart.hour * 60 +
          this.schedule.deskTimeStart.minutes;
      }
      const overlayStyles = {
        top: this.schedule.deskIndex * this.sectionHeight + "px",
        left: this.schedule.section === 1 ? "7px" : "51%",
        "z-index": zIndex
      };

      return this.isDeskSchedule ? overlayStyles : {};
    },

    setCardHeight() {
      const coefficient = this.schedule.duration / this.scheduleDesk.step;
      const overlayStyles = {
        height: coefficient * this.sectionHeight + "px"
      };
      return this.isDeskSchedule ? overlayStyles : {};
    },

    getCardTimeEnd() {
      const startInMinutes =
        this.schedule.deskTimeStart.hour * 60 +
        this.schedule.deskTimeStart.minutes;

      const endInMinutes = startInMinutes + this.schedule.duration;

      let hours = Math.floor(endInMinutes / 60);
      let minutes = endInMinutes % 60;
      const stringMinutes = minutes === 0 ? "00" : minutes;
      return `${hours}:${stringMinutes}`;
    }
  },

  methods: {
    dragStart(event) {
      const payload = JSON.stringify({
        schedule: this.schedule,
        from: this.listType
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
    min-height: 56px;
    margin-bottom: 0;
    .schedule-item__name {
      align-self: flex-start;
      padding-top: 7px;
      padding-right: 10px;
      max-width: initial;
      text-align: right;
    }
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
