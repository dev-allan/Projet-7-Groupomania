<template>
    <div class="login, flex-column, col-md-6 ml-auto mr-auto mt-3">
        <div class="d-flex justify-content-center">
            <img src="../assets/logo-black.svg" alt="logo de groupomania"/>
        </div>
        <b-form @submit.prevent="submitLogin" class="center-block, mt-5">
            <div class="col-sm-12">
                <h3>Se connecter</h3>
            </div>
            <div class="col-sm-12">
                <label for="email">Votre adresse email</label>
                <b-form-input class="shadow-sm p-3 mb-5 bg-white rounded" type="email" name="email" placeholder="azerty@email.com" v-model="email"/>
            </div>
            <div class="col-sm-12">
                <label for="password">Votre mot de passe</label>
                <b-form-input class="shadow-sm p-3 mb-5 bg-white rounded" type="password" name="password"  placeholder="Tapez votre mot de passe" v-model="password" />
             </div>
             <div class="col-sm-12">
                <b-button type="submit" variant="primary">Se connecter</b-button>
            </div>
        </b-form><br>
        <b-form @submit.prevent="submitSignup" class="center-block, mt-5">
            <div class="col-sm-12">
                <h3>Créer un compte</h3>
            </div>
            <div class="col-sm-12">
                <label for="email">Votre adresse email</label>
                <b-form-input class="shadow-sm p-3 mb-5 bg-white rounded" type="email" name="email" placeholder="azerty@email.com" v-model="login"/>
            </div>
            <div class="col-sm-12">
                <label for="password">Votre mot de passe</label>
                <b-form-input class="shadow-sm p-3 mb-5 bg-white rounded" type="password" name="password"  placeholder="Tapez votre mot de passe" v-model="createPassword" />
            </div>
            <div class="col-sm-12">
                <b-button type="submit" variant="primary">Créer mon compte</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                email: '',
                password : '',
                login : '',
                createPassword : '',
            }
        },
        methods: {
            submitLogin() {
                const user = {
                    email : this.email,
                    password : this.password
                }
                const options = {
                    method: 'POST',
                    body: JSON.stringify(user), 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch('http://localhost:3000/utilisateurs/login', options)
                    .then(function(response){
                        if (response.ok){
                            response.json().then(function(response){
                                console.log(response.token),
                                localStorage.setItem('accessToken', response.token)
                                document.location.href = "/accueil/#accueil"
                            })
                        }else {
                            alert('Vérifier vos identifiants')
                            console.log(user)
                        }
                    })
            },

            submitSignup() {
                const createCompte = {
                    email : this.login,
                    password : this.createPassword,
                }

                const options = {
                    method: 'POST',
                    body: JSON.stringify(createCompte), 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch('http://localhost:3000/utilisateurs/signup', options)
                    .then(function(response){
                        if (response.ok){
                            response.json().then(function(){
                                console.log("compte crée")
                            })
                        }else {
                            alert("Email ou mot de passe incorrect")
                        }
                    })
            },
        }

    }
</script>

<style lang='scss'>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>