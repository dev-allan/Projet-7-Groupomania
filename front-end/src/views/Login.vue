<template>
    <div class="login">
        <h1>Se connecter</h1>
        <form @submit.prevent="submitLogin">
            <input type="email" name="email" placeholder="Email" v-model="email"/>
            <input type="password" name="password"  placeholder="Password" v-model="password" />
            <button type="submit">Login</button>
        </form>
        <h1>Créer un compte</h1>
        <form @submit.prevent="submitSignup">
            <input type="email" name="email" placeholder="Email" v-model="login"/>
            <input type="password" name="password"  placeholder="Password" v-model="createPassword" />
            <button type="submit">Créer mon compte</button>
        </form>
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
                                window.location.href = "/accueil"
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

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>