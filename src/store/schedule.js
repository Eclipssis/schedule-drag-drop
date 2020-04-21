export default {
  namespaced: true,

  state: {
    unScheduledList: [
      {
        id: 1,
        color: "#ff6600",
        title: "Basement - Electrics",
        company: "AusLek",
        day: "Today",
        time: "8:30",
        duration: 140,
        workers: "2"
      },
      {
        id: 2,
        color: "#ff6600",
        title: "Level 2 - Concreting",
        company: "JB Enterprises",
        day: "12/12/17",
        time: "11:45",
        duration: 45,
        workers: "2"
      },
      {
        id: 3,
        color: "#ff6600",
        title: "Level 13 - Formwork",
        company: "NSW Wood PLC",
        day: "14/1/18",
        time: "14:30",
        duration: 70,
        workers: "2"
      }
    ],
    resentlyUpdatedList: [
      {
        id: 4,
        color: "#33cc00",
        title: "Basement - Electrics",
        company: "AusLek",
        day: "Today",
        time: "8:30",
        duration: 120,
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
        duration: 30,
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
        duration: 90,
        workers: "2",
        recentlyUpdated: true
      }
    ],
    deskList: [],
    scheduleDesk: {
      from: 5,
      to: 15,
      step: 30
    }
  },

  mutations: {
    moveScheduleCard(state, { schedule, from, to }) {
      const index = state[from].findIndex(item => item.id === schedule.id);
      state[from].splice(index, 1);
      state[to].push(schedule);
    }
  },

  actions: {}
};
