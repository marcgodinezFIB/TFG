<template>
<b-card>
  <b-card-text>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <p style="background-color: #05686D; border-radius: 25px; color: white; font-size: x-large;text-align-last: center;">Crear Alimento</p>
      <div class="row mt-2">
        <div class="col-6 mt-1">
          <label>Tipo de alimento</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <select class="form-select" v-model="selectedTypeFood">
            <option
              v-for="(typefood, _id) in listTypeFood"
              :value="typefood.name"
              :key="_id"
            >
              {{ typefood.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6 mt-3">
          <label>Nombre</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <b-form-input
            trim
            type="text"
            required
            v-model="name"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6 mt-3">
          <label>Kg CO₂eq / Kg</label><a style="color:red"> *</a>
        </div>
        <div class="col-6">
          <b-form-input
            trim
            type="number"
            required
            v-model="CO2PerKg"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row mt-2">
        <a href="https://huellaco2.org/alimentos.php" target="_blank" class="link-success"><i class=""></i> Ayuda para añadir el valor de Kg CO2eq / Kg en tus alimentos</a>
      </div>
      <div class="row mt-2">
        <div class="col" style="text-align: end;">
          <b-button
            size="sm"
            variant="outline-secondary"
            @click="CreateNewFood"
            >Guardar</b-button
          >
        </div>
      </div>
      <div class="row mt-2">
        <b-alert v-if="mensaje != ''" show variant="danger">{{
            mensaje
          }}</b-alert>
      </div>
    </div>
  </div>
  </b-card-text>
</b-card>

</template>
<script>
import axios from "axios";

export default {
  name: "CreateFood",
  data() {
    return {
      name: "",
      selectedTypeFood: "",
      listTypeFood: [],
      CO2PerKg: "",
      mensaje: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllTypesFood();
    this.loadFood();
  },
  methods: {
    loadFood() {
      if (this.$route.query.id != "") {
        axios.get("getFood/" + this.$route.query.id).then((res) => {
          //GeneralInfo
          this.name = res.data.food.name;
          this.selectedTypeFood = res.data.food.foodType;
          this.CO2PerKg = res.data.food.CO2PerKg;  
        })
      }
    },
    getAllTypesFood() {
      axios.get("/getAllTypeProds").then((res) => {
        this.listTypeFood = res.data.message;
      });
    },
    checkAllFields(){
      if(this.name == "" || this.selectedTypeFood == "" || this.CO2PerKg == "") this.mensaje = "Todos los campos marcados con '*' son obligatorios"
      else this.mensaje = ""
    },

    CreateNewFood() {
      this.checkAllFields();
      if(this.mensaje == ""){
      let newFood = {
        name: this.name,
        foodType: this.selectedTypeFood,
        CO2PerKg: this.CO2PerKg,
      };
      if(this.mensaje == ""){
        if (this.$route.query.id != null) {
        //sobreescribir producto
        axios.post("/editFood/" + this.$route.query.id, newFood, {
          headers: { authorization: "Bearer " + localStorage.getItem("token")},
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Transporte editado";
            this.$router.push("/foodList");
          },
          (err) => {
            this.error = err.response.data.error;
          })
      }
      else{
      axios
        .post("/addFood", newFood, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.$router.push("/foodlist")
            this.error = "";
            
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
      }
    }
    }
    },
  },
};
</script>
