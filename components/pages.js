export default {
    props:['pagination'],
    data(){
      return{
      }
    },
    methods:{
      getPagedData(current_page){
        this.$emit('get-paged-data',current_page);
      }
    },
    template:`<nav aria-label="...">
    <ul class="pagination justify-content-center">
      <li class="page-item " :class="{disabled:!pagination.has_pre}">
        <a class="page-link" href="#" tabindex="-1" @click="getPagedData(pagination.current_page - 1)">＜</a> 
      </li>
      <li class="page-item"  :class="{active: page == pagination.current_page}" v-for="page in pagination.total_pages" :key="page">
        <a class="page-link" href="#" @click="getPagedData(page)">{{page}}</a>
      </li>   
      <li class="page-item"  :class="{disabled:!pagination.has_next}">
        <a class="page-link" href="#" @click="getPagedData(pagination.current_page + 1)">＞</a>
      </li>
    </ul>
  </nav>`
  }

