<template>
    <div class="login">
        <h1>Se connecter</h1>
        <form @submit.prevent="submitLogin">
            <input type="email" name="email" placeholder="Email" v-model="email"/>
            <input type="password" name="password"  placeholder="Password" v-model="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                email: '',
                password : '',
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
                    .then(res => res.json(),)
                    .then(res => localStorage.setItem('token', res.token),
                        window.location.href = "/")
            }
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