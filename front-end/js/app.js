var vn = new Vue({
    el: "#authentification",
    data:{
        formulaire__inscription: false,
        formulaire__authentification : false,
    },
    methods: {
        
        formulaire_authentification: () => {
        let submitFormLogin = document.getElementById('login');

          submitFormLogin.addEventListener('click', function(Event){
            Event.preventDefault();
            document.location.href="index.html"
          });
        },
    }
})

vn.formulaire_authentification();