<template>
    <div id="app">
    <v-app id="inspire">
       <v-row>
          <v-col xs="12" sm="6" md="6">
                <GmapMap
                   :center='center'
                   :zoom='15'
                   style='width:100%;  height: 90vh;'
                >
                   <GmapMarker
                   :key="index"
                   v-for="(m, index) in markers"
                   :position="m.position"
                   :icon = "'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+ index +'|FF0000|000000'"
                   />
                </GmapMap>
             </v-col>
             <v-layout row wrap>
             <v-col
             xs = "12" sm="12" md="9"
            >
            <v-row   v-for="(item, i) in items"
            :key="i">
            <v-col offset-md="1" xs = "12" sm="10" md="12">
             <v-card
               color="#448aff"
               dark
             >
               <div class="d-flex flex-no-wrap justify-space-between">
                 <div>
                   <v-card-title
                     class="text-h5"
                     v-text="item.address"
                   ></v-card-title>

                   <!-- <v-card-subtitle v-text="item.artist"></v-card-subtitle> -->
                 </div>

                 <!-- <v-avatar
                   class="ma-3"
                   size="125"
                   tile
                 > -->
                   <!-- <v-img :src="item.src"></v-img> -->
                 <!-- </v-avatar> -->
               </div>
             </v-card>
            </v-col>
            </v-row>
            <v-col offset-md="1" xs = "12" sm="10" md="12">
            <v-card
               color="#005792"
               dark
               elevation=10
               >
              <v-card-actions>
                <v-btn
                  color="white"
                  text
                >
                  See Details
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  icon
                  @click="show = !show"
                >
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>
                  <span style="margin-left: 12px;"> Route: {{route}} </span>
                  <v-card-text>
                    Average Speed: {{ averageSpeed }} mph
                  </v-card-text>
                  <v-card-text>
                    Total Travel Time: {{ travelTime }} hours
                  </v-card-text>
                  <v-card-text>
                    Total Travel Distance: {{ totalDistance }} miles
                  </v-card-text>
                </div>
              </v-expand-transition>
              </v-card>
           </v-col>
          </v-col>
           </v-layout>
       </v-row>
    </v-app>
 </div>
 </template>
<script type="text/javascript">
import axios from 'axios';
import Api from '../services/Api';

export default {
  name: 'DisplayIternary',
  props: [
    'plannerData',
  ],
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      route: 1,
      currentPlace: null,
      dates: [],
      currentHover: null,
      allNodes: [],
      focusMonth: null,
      markers: [],
      places: [],
      show: false,
      averageSpeed: 0,
      travelTime: '',
      totalDistance: 0,
      items: [
        // {
        //   address: '',
        // },
        // {
        //   address: '',
        // },
        // {
        //   address: '',
        // },
        // {
        //   address: '',
        // },
        // {
        //   address: '',
        // },
      ],
    };
  },
  created() {
    // this.fetchData();
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    convertMinsToHrsMins(minutes) {
      let h = Math.floor(minutes / 60);
      let m = minutes % 60;
      h = h < 10 ? `0${h}` : h;
      m = m < 10 ? `0${m}` : m;
      return `${h}:${m}`;
    },
    async fetchData() {
      console.log(this.plannerData);
      const response = await Api.planner(this.plannerData);
      console.log(response);
      // const res = await axios.get('http://myjson.dit.upm.es/api/bins/9oj9');
      // const response = res.data;
      // console.log(response.data);
      // console.log(response.result.trip.wayPoints[0].geometry.coordinates[0][0]);
      this.markers.push({
        position: {
          lat: this.plannerData.latitude,
          lng: this.plannerData.longitude,
        },
      });
      for (let i = 0; i < response.result.trip.wayPoints.length; i += 1) {
        this.markers.push({
          position: {
            lat: response.result.trip.wayPoints[i].geometry.coordinates[0][1],
            lng: response.result.trip.wayPoints[i].geometry.coordinates[0][0],
            indexKey: i + 1,
          },
        });
      }
      await this.getPlacesNames();
      this.averageSpeed = response.result.trip.routes[0].averageSpeed;
      this.travelTime = this.convertMinsToHrsMins(response.result.trip.routes[0].travelTimeMinutes);
      this.totalDistance = response.result.trip.routes[0].totalDistance;
      await this.sleep(100);
      this.center = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng,
      };
      console.log(this.center);
    },
    async getPlacesNames() {
      const GApiURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
      const key = 'AIzaSyC2mYZwQJqujtjlSZpy6M0KKG_PSCq2fcY';
      let promises = [];
      for (let i = 0; i < this.markers.length; i += 1) {
        promises.push(axios.get(`${GApiURL}${this.markers[i].position.lat},${this.markers[i].position.lng}&key=${key}`));
        // const response = res.data;
        // console.log(response);
      }
      promises = await Promise.allSettled(promises);
      console.log(promises);
      // const places = [];
      for (let i = 0; i < promises.length; i += 1) {
        this.items.push({
          address: (promises[i].value.data.results[0].formatted_address),
        });
        // console.log(promises[i].value.data.results[0].formatted_address);
      }
      // this.items = places;
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
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
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
 </style>
