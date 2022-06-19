<template>
  <div class="row mt-3">
    <div class="col-3"></div>
    <div class="col-6">
      <p style="background-color: #05686D;border-radius:25px;color: white; font-size: x-large;text-align-last: center;">Lista de alimentos</p>
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
            @click="editFood(row.item, row.index)"
          >
            Editar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="deleteFood(row.item, row.index)"
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
  name: "FoodList",
  data() {
    return {
      rowData: [],
      mensajeFood: "",
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
          key: "foodType",
          label: "Tipo de alimento",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "CO2PerKg",
          label: "Kg CO₂eq / Kg",
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
    this.getAllFoods();
  },
  methods: {
    editFood(item, index) {
      this.$router.push({path : '/createFood?id=' + item._id})
    },
    getAllFoods() {
      axios.get("/getAllFoods").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    deleteFood(item, index) {
      axios.delete("/removeFood/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.$router.go("/foods");
    },
  },
  computed: {
      rows() {
        return this.rowData.length
      }
    }
};
</script>

<style>
 #headerTabla {
   font-size: 3px;
 }
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