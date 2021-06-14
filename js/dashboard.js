import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
//新增模板
let productModal = null;
//刪除模板
let delProductModal = null;

import pages from "../components/pages.js";
import product from "../components/product.js";
import delproduct from "../components/delProduct.js";

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/api',
      apiPath: 'item666',
      products: [],
      isNew: false,
      //產品暫存區
      tempProduct: {
        imagesUrl: []
      },
      pagination:{},
      isNew:false,
      isLoading:false
    }
  },
  components: {
    pages,
    product,
    delproduct
  },
  mounted() {
    //建立新增模板 實體
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    //建立刪除模板 實體
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)yoyoToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token === '') {
      alert('登入失敗，請重新登入。');
      //強制轉回至登入頁
      window.location = './index.html';
    }
    //token驗證後才能取得資料
    axios.defaults.headers.common.Authorization = token;
    this.getData();
  },

  methods: {
    //取得資料
    getData(page = 1) {
      const url = `${this.apiUrl}/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url).then((res) => {
        if (res.data.success) { //值為true
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        } else {
          alert(res.data.message);
          window.location ='index.html';
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    openModal(isNew, item) {
      switch (isNew) {
          case 'add':
              this.isNew = true; //同edit一個模板
              this.tempProduct = {
                  imagesUrl: []
              }
              productModal.show();
              break;
          case 'edit':
              this.isNew = false; //同add一個模板
              this.tempProduct = {...item}; //進行淺拷貝避免傳參考更動到原始資料
              productModal.show();
              break;
          case 'delete':
              this.tempProduct = { ...item }; //打開需要title 刪除按鈕需要id
              delProductModal.show();
              break;
      }
  },
    //更新資料
    updateProduct() {
      let url = `${this.apiUrl}/${this.apiPath}/admin/product`;
      let httpMethod = 'post';
      //isNew 來判斷串接 post or put 的API
      if(!this.isNew) { 
        url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put'
      }

      axios[httpMethod](url,  { data: this.tempProduct }).then((res) => {
        if(res.data.success) {
          alert(res.data.message);
          productModal.hide();
          this.getData();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    //刪除產品
    delProduct() {
      const url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          delProductModal.hide();
          this.getData();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    //新增上傳圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
}).mount('#app');
