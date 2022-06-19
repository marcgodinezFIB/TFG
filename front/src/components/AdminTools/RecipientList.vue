<template>
  <div class="row mt-3">
    <div class="col-3"></div>
    <div class="col-6">
      <p style="background-color: #05686D;border-radius:25px;color: white; font-size: x-large;text-align-last: center;">Lista de envases</p>
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
            @click="editRecipient(row.item, row.index)"
          >
            Editar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="deleteRecipient(row.item, row.index)"
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
      class="pagination"
    ></b-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "RecipientList",
  data() {
    return {
      rowData: [],
      mensajeRecipient: "",
      perPage:10,
      currentPage:1,
            fields:[
        {
          key: "name",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "CO2Perm3",
          label: "Kg CO₂eq / m³",
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
    this.getAllRecipients();
  },
  methods: {
    getAllRecipients() {
      axios.get("/getAllRecipients").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    editRecipient(item, index) {
      this.$router.push({path : '/createRecipient?id=' + item._id})
    },
    deleteRecipient(item, index) {
      axios.delete("/removeRecipient/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
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