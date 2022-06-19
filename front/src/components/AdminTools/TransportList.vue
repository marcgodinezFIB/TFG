<template>
<div class="row mt-3">
    <div class="col-3"></div>
    <div class="col-6">
      <p style="background-color: #05686D;border-radius:25px;color: white; font-size: x-large;text-align-last: center;">Lista de transportes</p>
      <b-table
      id="my-table" 
      :per-page = "perPage"
      :items = "rowData"
      :current-page= "currentPage"
      :fields="fields"
      small>
      <template #cell(actions)="row">
        <b-button-group>
          <b-button
            variant="outline-secondary"
            size="sm"
            @click="editTransport(row.item, row.index)"
          >
            Editar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="deleteTransport(row.item, row.index)"
          >
            Eliminar
          </b-button></b-button-group
        >
      </template>
      </b-table>
      <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      pills
      align="center"
    ></b-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "TransportList",
  data() {
    return {
      rowData: [],
      mensajeTransport: "",
      perPage: 10,
      currentPage: 1,
      fields:[
        {
          key: "name",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "distance",
          label: "Distancia máxima",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "capacity",
          label: "Capacidad máxima",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "CO2PerKm",
          label: "Kg CO₂eq / Km",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        { key: "actions", label: "" }
      ]
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllTransports();
  },
  methods: {
    getAllTransports() {
      axios.get("/getAllTransports").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    editTransport(item, index) {
      this.$router.push({path : '/createTransport?id=' + item._id})
    },
    deleteTransport(item, index) {
      axios.delete("/removetransport/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.rowData.splice(index, 1);
    },
  },
};
</script>

<style>
.page-item.active .page-link {
  color: #fff !important;
  background: #05686D !important;
  border: #fff;
}

.page-item .page-link {
  color: #05686D !important;
  background: #fff !important;
  border: #05686D;
}
</style>
