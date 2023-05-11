const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Denmark%2C%20Roskilde?unitGroup=metric&key=9T8ZW3HTFGMM98NXPAPTV2VS9&contentType=json"

Vue.createApp({
  data() {
    return {
      weather: null,
      temperature: null,
      time: "10:00:00",
      selectedDay: null,
      day: 0
    }
  },
  async created() {
    await this.getAll(baseUrl);
  },
  methods: {
    async getAll(url) {
      try {
        const response = await axios.get(url);
        this.weather = await response.data;

        if (this.weather && this.weather.days && this.weather.days.length > 0) {
          const firstDay = this.weather.days[0];
          const hour = firstDay.hours.find(hour => hour.datetime === this.time);
          if (hour) {
            this.temperature = hour.temp;
            console.log(`Temperature at ${this.time} on the first day: ${this.temperature}°C`);
          } else {
            console.log(`No temperature data found for ${this.time} on the first day`);
          }
        }
      } catch (ex) {
        alert(ex.message);
      }
    },
    showAppropriateTop(day) {
      this.selectedDay = day;
      const top = this.showTop(day.hours.find(hour => hour.datetime === this.time).temp);
      day.appropriateTop = top;
    },
    showTop(temp) {
      if (temp < 0) {
        return "Winter Jacket";
      } else if (temp >= 5 && temp < 10) {
        return "Coat or normal jacket. ";
      } else if (temp >= 10 && temp <= 15) {
        return "Hoodie";
      } else {
        return "T-Shirt";
      }
    },

    showBottom(temp) {
      if (temp < 0) {
        return "Ski-Pants";
      } else if (temp >= 5 && temp < 15) {
        return "Pants";
      } else {
        return "Shorts";
      }
    },
    showDrink(temp) {
      if (temp < 5) {
        return "Bring hot drink";
      } else if (temp >= 5 && temp < 20) {
        return "No drink required";
      } else {
        return "Bring cold drinks";
      }
    },
    showAccecories(temp) {
      if (temp < 10) {
        return "A jacket and sweater";
      } else if (temp >= 10 && temp < 15) {
        return "Pants And A T-Shirt";
      } else if (temp >= 15 && temp <= 20) {
        return "Shorts and A T-Shirt";
      } else {
        return "Short sleeves, shorts or light pants, and sandals or sneakers";
      }
    }
  }
}).mount("#app");