<template>
  <b-card class="vue-tempalte forms">
    <img style="height: 170px;width: 225px;padding-left: 75px;padding-bottom: 20px;" src="../assets/css/LOGOTIPO_NEGRO.png" />
    <h3
      style="
        text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;
      "
    >
      Registrarse
    </h3>
    <b-alert v-if="mensaje != ''" show variant="danger">{{ mensaje }}</b-alert>
    <div class="row">
      <div class="col">
        <b-input-group
          ><b-input-group-prepend>
            <span class="form-control my-2"
              ><i class="fa fa-at fa-lg"></i
            ></span> </b-input-group-prepend
          ><b-form-input
            trim
            type="text"
            required
            class="form-control my-2"
            placeholder="Correo electrónico"
            v-model="email"
        /></b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-input-group
          ><b-input-group-prepend>
            <span class="form-control my-2"
              ><i class="fa fa-user fa-lg"></i
            ></span> </b-input-group-prepend
          ><b-form-input
            trim
            type="text"
            required
            class="form-control my-2"
            placeholder="Usuario"
            v-model="username"
        /></b-input-group>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <b-input-group
          ><b-input-group-prepend>
            <span class="form-control my-2"
              ><i class="fa fa-lock fa-lg"></i
            ></span> </b-input-group-prepend
          ><b-form-input
            trim
            type="password"
            class="form-control my-2"
            placeholder="Contraseña"
            v-model="password"
        /></b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group mt-2" style="text-align: center">
          <b-button variant="outline-secondary" @click="signUp"
            >Registrarse</b-button
          >
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      mensaje: "",
      error: "",
    };
  },
  methods: {
    signUp() {
      let newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      if(this.email == "" || this.password == "" || this.username == "") this.mensaje = "Todos los campos son obligatorios"
      axios.post("/signup", newUser).then(
        (res) => {
          this.error = "";
          this.$router.push("/login");
        },
        (err) => {
            if(this.email == "" || this.password == "" || this.username == "") this.mensaje = "Todos los campos son obligatorios"
            else this.mensaje = err.response.data.message;
        }
      );
    },
  },
};
</script>
