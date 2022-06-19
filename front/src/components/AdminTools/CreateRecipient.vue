<template>
<b-card><b-card-text>
<div class="row">
  <div class="col-3"></div>
        <div class="col-6">
          <p style="background-color: #05686D; border-radius: 25px; color: white; font-size: x-large;text-align-last: center;">Crear Envase</p>
            <div class="row mt-2">
                <div class="col-6 mt-3">
                <label>Nombre</label><a style="color:red"> *</a>
                </div>
                <div class="col-6">
                <b-form-input trim type="text" required value="aaa" v-model="name" class="form-control my-2" />
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6 mt-3">
                <label>Kg CO₂eq / m³</label><a style="color:red"> *</a>
                </div>
                <div class="col-6">
                <b-form-input trim type="number" required v-model="CO2Perm3" class="form-control my-2" />
                </div>
            </div>
            <div class="row mt-2">
                <div class="col" style="text-align: end;">
                    <b-button size="sm" variant="outline-secondary" @click="CreateNewRecipient">Guardar</b-button>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <b-alert v-if="mensaje != '' " show variant="danger">{{mensaje}}</b-alert>
                </div>
            </div>
        </div>
    </div>
</b-card-text>
</b-card>

</template>
<script>

import axios from 'axios';

export default {
  name: 'CreateRecipient',
data() {
  return {
            name: '',
            CO2Perm3: '',
            mensaje: ''
        };
},
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  },
  mounted(){
    this.loadRecipient();
  },
  methods: {
    loadRecipient(){
      if (this.$route.query.id != "") {
        axios.get("getRecipient/" + this.$route.query.id).then((res) => {
          //GeneralInfo
          this.name = res.data.recipient.name;
          this.CO2Perm3 = res.data.recipient.CO2Perm3;
        })
      }
    },
    CreateNewRecipient() {
      this.checkAllFields();
    let newRecipient = {
        name: this.name,
        CO2Perm3: this.CO2Perm3
    }
    if(this.mensaje == ""){
    if (this.$route.query.id != null) {
        //sobreescribir producto
        axios.post("/editFood/" + this.$route.query.id, newRecipient, {
          headers: { authorization: "Bearer " + localStorage.getItem("token")},
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Alimento editado";
            this.$router.push("/foodList");
          },
          (err) => {
            this.error = err.response.data.error;
          })
      }
      else{
    axios.post('/addRecipient',newRecipient, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
           this.$router.push("/recipientList")
            this.error = '';
            this.mensaje = 'Envase creado'
            this.CO2Perm3 = ''
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
      }
    }
    },
checkAllFields(){
      if(this.name == "" || this.CO2Perm3 == "") this.mensaje = "Todos los campos marcados con '*' son obligatorios"
      else this.mensaje = ""
    }
  }
}
</script>