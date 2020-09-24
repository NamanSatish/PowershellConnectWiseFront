<template>
<div>
  <b-row>
    <b-col cols="3">
        <b-form-select v-model="companyselected" :options="listofcompanies" @change="getListofComputersfromCompany"></b-form-select>
      </b-col>
    <b-col cols="3">
        <b-form-select v-model="computerselected" :options="listofcomputersfromcompany" :disabled="this.chosen" multiple  ></b-form-select>
      </b-col>
    <b-col cols="3">
        <b-form-select v-model="outputselected" :options="listofcomputersfromcompany" :disabled="this.chosen"  @change="updateAutoPull"></b-form-select>
      </b-col>
  </b-row>

  <b-row>
    <b-col cols="6">
  <VueTerminal
    :intro="intro"
    :console-sign="symbol"
    allow-arbitrary
    height="500px"
    @command="onCliCommand"

  ></VueTerminal>
  </b-col>

  <b-col cols="6">
  <div class="form-group black-border">
  <b-form-textarea id="textarea-plaintext" size="lg" rows="10" max-rows="100" plaintext wrapperClass="custom-purple-border" :value="text"></b-form-textarea>
  </div>
  </b-col>
</b-row>
  </div>
</template>

<script>
import VueTerminal from "vue-terminal-ui";
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment';

export default {
  name: "App",

  mounted(){

    this.axios.request({
  url: 'https://" Subdomain Here ".screenconnect.com/App_Extensions/ " Extension ID Here " /Service.ashx/getListofCompanies', method: 'post', data: {"IntegrationKey" : " Your API Key Here"}, headers: { 'Content-Type': 'application/json'},})
  .then((response) => {
    console.log(response.data)
    var temp = []
      for(var i =0; i<response.data.length;i++){
        temp.push({value:response.data[i],text:response.data[i]})
      }
    this.listofcompanies = temp;
    console.log(this.listofcompanies);
    })







  },


  data() {
    return {
      intro: "Start Typing on the Second Line",
      text:"\n",
      symbol: ":>",
      listofcompanies: "",
      listofcomputersfromcompany:"",
      companyselected:null,
      computerselected:[''],
      outputselected:'',
      oldlength:null,
      intervalID:null,
      chosen:true,
    };
  },
  components: {
    VueTerminal
  },
   methods: {
    onCliCommand(data, resolve, reject) {
      if(data.text == undefined){
        this.text = "Next Line\n"
      }else{
      //console.log(data);
      //this.text =this.text + "\n" + data.text ;

      this.axios.request({
        //Remove Powershell Boolean
  url: 'https://" Subdomain Here ".screenconnect.com/App_Extensions/ " Extension ID Here " /Service.ashx/SendCommandtoComputers/', method: 'post', data : {"sessionIDs": this.computerselected,"powershell" : true,"command" : data.text ,"sender" : "OnlineConsole","IntegrationKey" : " Your API Key Here"} ,headers: { 'Content-Type': 'application/json'},})
  .then((response) => {
  })
     }
      setTimeout(() => {
        resolve("");
      }, 10);




      
    },
    getListofComputersfromCompany(){
      this.chosen = false;
      this.axios.request({
  url: 'https:// " Subdomain Here " .screenconnect.com/App_Extensions/  " Extension ID Here "  /Service.ashx/getListofComputersfromCompany/', method: 'post', data: {"company": this.companyselected,"IntegrationKey": " Your API Key Here"}, headers: { 'Content-Type': 'application/json'},})
  .then((response) => {
    console.log(response.data)
    var temp = []
      for(var i =0; i<response.data.length;i++){
        temp.push({value:response.data[i].SessionID,text:response.data[i].Name})
      }
    this.listofcomputersfromcompany = temp;
    console.log(this.listofcomputersfromcompany);
    })
    },
    updateAutoPull(){
      
      try{
  
  this.intervalID = setInterval(()=>{
  

    
 //console.log(this.outputselected)
  axios.request({
  url: 'https:// " Subdomain Here " .screenconnect.com/App_Extensions/ " Extension ID Here " /Service.ashx/getComputerSessionDetails/', method: 'post', data :{"sessionID": this.outputselected,"IntegrationKey" : " Your API Key Here "} ,headers: { 'Content-Type': 'application/json'},})
  .then((response) => {
    //console.log(response.data)
    
       if(response.data.Session.QueuedEvents.length == 0 ){

        var activesession = response.data.Session.ActiveConnections[0].ConnectionID;
        for(var n = 0; n< response.data.Session.ActiveConnections.length; n++){
            if(response.data.Session.ActiveConnections[n].ParticipantName == "" ){
              var activesession = response.data.Session.ActiveConnections[n].ConnectionID;
            }


        }
        for(var i = 0; i<response.data.Connections.length; i++){

           if(response.data.Connections[i].Connection.ConnectionID == activesession){
             var indexofcommand = response.data.Connections[i].Events.length - 1;
            var timeofcommand = moment(response.data.Connections[i].Events[indexofcommand].Time).format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n"
            
            //console.log(indexofcommand);
            //console.log(response.data.Connections[i].Events[indexofcommand].Data)
            this.text = timeofcommand + response.data.Connections[i].Events[indexofcommand].Data
            
          } 

        } 


      }
  })

    
  },1000)
  } catch(error){
    console.log(error);
    
  }

    },

  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>




    