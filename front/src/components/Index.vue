<template>
  <b-card class="vue-template forms-index">
    <h3
      style="
        text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;
      "
    >
      <img style="height: 300px; width: 350px" src="../assets/css/LOGOTIPO_NEGRO.png" />
    </h3>
    <div class="row">
      <div class="col" style="text-align: center">
        <a> Calcula la huella de carbono que generan tus productos. </a>
      </div>
      
    </div>

    <div class="row mt-3">
      <hr />
      <div class="col-6 mt-3" style="text-align: center">
      <img style="height: 300px; width: 550px" src="../assets/css/3.png"/>
      </div>
      <div class="col-6" style="text-align: center">
      <img style="height: 300px; width: 550px" src="../assets/css/4.png"/>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      email: "",
      password: "",
      mensaje: "",
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post("/login", user).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        },
        (err) => {
          this.mensaje = err.response.data.message;
        }
      );
    },
  },
};
</script>
