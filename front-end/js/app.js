let vm = new Vue({
    el: "#authentification",
    data:{
        success: false
    },
    methods: {
        formulaire_inscription: () => {
            return this.success === true ? document.querySelector("form").innerHTML+=`<div class="form-group">
            <label for="exampleInputEmail1">Votre email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="azerty@mail.com" placeholder="azerty@mail.com">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Votre mot de passe">
            <label for="exampleInputPassword1">Retappez votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Votre mot de passe">
          </div>
          <button type="submit" class="btn btn-dark">Créer votre compte</button>` : 'error'
        },
        formulaire_authentification: () => {
            document.querySelector('form').innerHTML+=`<div class="form-group">
            <label for="exampleInputEmail1">Votre email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="azerty@mail.com" placeholder="azerty@mail.com">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Votre mot de passe">
          </div>
          <button type="submit" class="btn btn-dark">Se connecter</button>`
        }
    }
})