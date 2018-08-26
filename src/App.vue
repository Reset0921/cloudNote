<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {GetEnumTypeList} from "@/api/note"
import {setCookie,getCookie} from '@/utils/cookie';
export default {
  name: 'App',
  created(){
    this._appconfig();
    if(this.$store.state.userinfo.id==0){
        this.$router.push('/login');
    }
  },
  methods:{
    _appconfig(){
     var data= getCookie("xxx_loginyy_");
     if(data!=null){
        this.$store.state.userinfo.id=data.split("_")[0];
        this.$store.state.userinfo.phone=data.split("_")[1];
     }
        GetEnumTypeList().then(res=>{
            this.$store.state.filter_Type=res.Data.EnumTypeList;
        });

    }
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:14px;
}

</style>
