<template>
   <div id="app">
   <v-app id="inspire">
      <v-row>
         <v-col xs="10" sm="10" md="10">
         <GmapAutocomplete
          style="width: 100%; border: 1px solid black;"
          @place_changed='setPlace'
         />
      </v-col>
      </v-row>
      <v-row>
         <v-col xs="12" sm="6" md="6">
               <GmapMap
                  :center='center'
                  :zoom='18'
                  style='width:100%;  height: 90vh;'
               >
                  <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center=m.position"
                  />
               </GmapMap>
            </v-col>
            <v-col offset-md="" xs="12" sm="6" md="4">
               <v-date-picker
                  v-model="dates"
                  range
                  width="100%"
               ></v-date-picker>
            </v-col>
            <v-col xs="12" sm="12" md="1">
               <v-btn min-width=100 color="primary" @click="getItinerary()">Get Itinerary</v-btn>
            </v-col>
      </v-row>
   </v-app>
</div>
</template>
<script type="text/javascript">

export default {
  name: 'Planner',
  props: [
    'userEmail',
  ],
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      dates: [],
      currentHover: null,
      allNodes: [],
      focusMonth: null,
      markers: [],
      places: [],
      userID: '',
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
  },
  created() {
    this.userID = this.userEmail;
  },
  mounted() {
    this.geolocate();
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`;

    let tomorrow = new Date();
    const tdd = String(today.getDate() + 1).padStart(2, '0');
    const tmm = String(today.getMonth() + 2).padStart(2, '0'); // January is 0!
    const tyyyy = today.getFullYear() + 1;
    tomorrow = `${tyyyy}/${tmm}/${tdd}`;

    this.dates[0] = today;
    this.dates[1] = tomorrow;
  },
  methods: {
    async getItinerary() {
      const plannerData = {
        emailId: this.userID.email,
        latitude: this.center.lat,
        longitude: this.center.lng,
        startDate: this.dates[0],
        endDate: this.dates[1],
      };
      console.log(plannerData);
      this.$router.push({
        name: 'DisplayIternary',
        params: { plannerData },
      });
      // const response = await Api.planner(plannerData);
      // console.log(response);
    },
    setPlace(place) {
      this.currentPlace = place;
      this.center.lat = (this.currentPlace.geometry.location.lat());
      this.center.lng = (this.currentPlace.geometry.location.lng());
      this.addMarker();
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
  },
};
</script>
<style>
   .login-component {
      margin-top: 20px;
   }

   .form-login {
      max-width: 330px;
      padding: 15px;
      margin: 0 auto;
   }
   .highlight__date {
      background-color: #82e3e3;
   }
   .date__color {
      color: #ffffff;
   }
   #vuetify-google-autocomplete-id {
    border: 2px solid red;
  }

</style>
