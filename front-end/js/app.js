let vm = new Vue({
    el: "#authentification",
    data:{
        test: true,
    },
    methods: {
        formulaire_inscription: () => {
            let success = 0;
            success = +1;
            console.log(success);
            document.querySelector("form").innerHTML+=`<div class="form-group">
            <label for="exampleInputEmail1">Votre email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="azerty@mail.com" placeholder="azerty@mail.com">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Votre mot de passe">
            <label for="exampleInputPassword1">Retappez votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Votre mot de passe">
          </div>
          <button type="submit" class="btn btn-dark">Créer votre compte</button>`;
          success = +1;
          console.log(success)
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
        },
    }
})