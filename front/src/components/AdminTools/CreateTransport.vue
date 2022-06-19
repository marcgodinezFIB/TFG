<template>
<b-card>
  <b-card-text>
<div class="row mt">
    <div class="col-3"></div>
    <div class="col-6">
      <p style="background-color: #05686D; border-radius: 25px; color: white; font-size: x-large;text-align-last: center;">Crear Transporte</p>
      <div class="row mt-2">
        <div class="col-6 mt-3">
          <label>Nombre</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <b-form-input
            trim
            type="text"
            required
            value="aaa"
            v-model="name"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6 mt-3">
          <label>Capacidad máxima (en Kg)</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <b-form-input
            trim
            type="number"
            required
            v-model="capacity"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6 mt-3">
          <label>Distancia máxima (en Km)</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <b-form-input
            trim
            type="number"
            required
            v-model="distance"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6 mt-3">
          <label>Kg CO₂eq / Km</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <b-form-input
            trim
            type="number"
            required
            v-model="CO2PerKm"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row mt-2">
        <a href="https://huellaco2.org/autos.php" target="_blank" class="link-success"><i class=""></i> Ayuda para añadir el valor de Kg CO2eq / Km en tus transportes</a>
      </div>
      <div class="row mt-2">
        <div class="col" style="text-align: end;">
          <b-button size="sm" variant="outline-secondary" @click="CreateNewTransport"
            >Guardar</b-button
          >
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <b-alert v-if="mensaje != ''" show variant="danger">{{
            mensaje
          }}</b-alert>
        </div>
      </div>
    </div>
  </div>
  </b-card-text>
</b-card>
  
</template>
<script>
import axios from "axios";

export default {
  name: "CreateTransport",
  data() {
    return {
      name: "",
      capacity: "",
      distance: "",
      CO2PerKm: "",
      mensaje: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.loadTransport();
  },
  methods: {
    loadTransport() {
      if (this.$route.query.id != "") {
        axios.get("getTransport/" + this.$route.query.id).then((res) => {
          //GeneralInfo
          this.name = res.data.transport.name;
          this.capacity = res.data.transport.capacity;
          this.distance = res.data.transport.distance;
          this.CO2PerKm = res.data.transport.CO2PerKm;  
        })
      }
    },
    CreateNewTransport() {
      this.checkAllFields();
      let newTransport = {
        name: this.name,
        capacity: this.capacity,
        distance: this.distance,
        CO2PerKm: this.CO2PerKm,
      };
      if(this.mensaje == ""){
      if (this.$route.query.id != null) {
        //sobreescribir producto
        axios.post("/editTransport/" + this.$route.query.id, newTransport, {
          headers: { authorization: "Bearer " + localStorage.getItem("token")},
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Transporte editado";
            this.$router.push("/transportList");
          },
          (err) => {
            this.error = err.response.data.error;
          })
      }
      else{
      axios
        .post("/addTransport", newTransport, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.$router.push("/transportList")
            this.error = "";
            this.capacity = "";
            this.distance = "";
            this.CO2PerKm = "";
            this.name = "";
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
      }
    }
    },
    checkAllFields(){
      if(this.name == "" || this.capacity == "" ||this.distance == "" || this.CO2PerKm == "") this.mensaje = "Todos los campos marcados con '*' son obligatorios"
      else this.mensaje = ""
    }

  },
};
</script>
