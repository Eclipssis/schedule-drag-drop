export default {
  namespaced: true,

  state: {
    scheduleList: [
      {
        id: 1,
        color: "#ff6600",
        title: "Basement - Electrics",
        company: "AusLek",
        day: "Today",
        time: "8:30",
        duration: "2hr 20min",
        workers: "2"
      },
      {
        id: 2,
        color: "#ff6600",
        title: "Level 2 - Concreting",
        company: "JB Enterprises",
        day: "12/12/17",
        time: "11:45",
        duration: "45min",
        workers: "2"
      },
      {
        id: 3,
        color: "#ff6600",
        title: "Level 13 - Formwork",
        company: "NSW Wood PLC",
        day: "14/1/18",
        time: "14:30",
        duration: "1hr 10min",
        workers: "2"
      },
      {
        id: 4,
        color: "#33cc00",
        title: "Basement - Electrics",
        company: "AusLek",
        day: "Today",
        time: "8:30",
        duration: "2hr 20min",
        workers: "2",
        recentlyUpdated: true
      },
      {
        id: 5,
        color: "#cc0000",
        title: "Level 2 - Concreting",
        company: "JB Enterprises",
        day: "12/12/17",
        time: "11:45",
        duration: "45min",
        workers: "2",
        recentlyUpdated: true
      },
      {
        id: 6,
        color: "#0f72bd",
        title: "Level 13 - Formwork",
        company: "NSW Wood PLC",
        day: "14/1/18",
        time: "14:30",
        duration: "1hr 10min",
        workers: "2",
        recentlyUpdated: true
      }
    ],
    deskList: []
  },

  getters: {
    unsheduledList(state) {
      return state.scheduleList.filter(item => !item.recentlyUpdated);
    },
    recentlyUpdatedList(state) {
      return state.scheduleList.filter(item => item.recentlyUpdated);
    }
  },

  mutations: {
    addToSchedule(state, schedule) {
      const index = state.deskList.findIndex(item => item.id === schedule.id);
      state.deskList.splice(index, 1);
      state.scheduleList.push(schedule);
    },

    addToDesk(state, schedule) {
      const index = state.scheduleList.findIndex(
        item => item.id === schedule.id
      );
      state.scheduleList.splice(index, 1);
      state.deskList.push(schedule);
    }
  },

  actions: {}
};
