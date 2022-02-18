<template>
    <div id="app">
      <v-app id="inspire">
        <v-main>
           <v-container fluid fill-height>
              <v-layout align-center justify-center>
                 <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                       <v-toolbar dark color="primary">
                          <v-toolbar-title> {{toolbarTitle}}</v-toolbar-title>
                       </v-toolbar>
                       <v-card-text v-if="toggle">
                          <v-form>
                             <v-text-field
                                icon="person"
                                name="login"
                                label="Email"
                                type="text"
                                v-model="userData.email"
                             ></v-text-field>
                             <v-text-field
                             name="name"
                             label="Name"
                             type="text"
                             v-model="userData.name"
                            ></v-text-field>
                            <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateFormatted"
                                label="Birth Date"
                                persistent-hint
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              no-title
                              @input="menu1 = false"
                            ></v-date-picker>
                          </v-menu>
                             <v-text-field
                                id="password"
                                prepend-icons="mdi-cradle"
                                name="password"
                                label="Password"
                                type="password"
                                v-model="userData.password"
                             ></v-text-field>
                          </v-form>
                       </v-card-text>
                       <v-card-actions v-if="toggle">
                          <v-spacer></v-spacer>
                          <v-btn color="primary" @click="setToogle()">Next</v-btn>
                       </v-card-actions>
                      <v-flex v-if="!toggle">
                      <v-slider
                        v-model="hiking"
                        v-bind:value="hiking"
                        :min="0"
                        :max="10"
                        height="50"
                        label="Hiking"
                        >
                      </v-slider>
                      <v-slider
                        v-model="running"
                        v-bind:value="running"
                        :min="0"
                        :max="10"
                        height="50"
                        label="Running"
                      >
                    </v-slider>
                    <v-slider
                        v-model="food"
                        v-bind:value="food"
                        :min="0"
                        :max="10"
                        height="50"
                        label="Food"
                        >
                      </v-slider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="signup()">Sign Up</v-btn>
                    </v-card-actions>
                    </v-flex>
                    </v-card>
                 </v-flex>
              </v-layout>
           </v-container>
        </v-main>
     </v-app>
        <!-- <h1> Hello </h1> -->
      </div>
  </template>
<script type="text/javascript">
import Api from '../services/Api';

export default {
  name: 'SignUp',
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset()
        * 60000)).toISOString().substr(0, 10)),
      toggle: true,
      hiking: 9,
      running: 9,
      food: 9,
      toolbarTitle: 'Sign Up',
      userData: {
        email: '',
        password: '',
        name: '',
        dob: '',
      },
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    setToogle() {
      this.toggle = !this.toggle;
      this.toolbarTitle = 'Interests';
      // console.log(this.toggle);
    },
    async signup() {
      this.userData.dob = this.parseDate(this.dateFormatted);
      const objToSend = {
        email: this.userData.email,
        password: this.userData.password,
        name: this.userData.name,
        dob: this.userData.dob,
        interest: [
          {
            name: 'hiking',
            ratings: this.hiking,
            id: 1,
          },
          {
            name: 'running',
            ratings: this.running,
            id: 2,
          },
          {
            name: 'food',
            ratings: this.food,
            id: 3,
          },
        ],
      };
      console.log(objToSend);
      const response = await Api.signUp(objToSend);
      if (response) {
        alert('Sign Up successful. Please login.');
        this.$router.push('/login');
      } else {
        alert('Error');
        this.$router.push('/signup');
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
    </style>
