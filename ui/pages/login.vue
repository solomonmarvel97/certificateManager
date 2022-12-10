<template>
    <section>
        <div class="login">
            <div class="login-wrapper">
                <div class="mb-5">
                    <h1 class="center">cert-managr</h1>
                </div>
                <div class="login-container">
                    <h4 class="mb-4">Login to access dashboard</h4>


                    <form @submit.prevent="handleLogin">
                        <div class="form-wrapper">
                            <label for="email">Email</label>
                            <input class="form-control mt-1" id="email" type="email" placeholder="E.g johndoe@email.com"
                                v-model="user.email" />
                        </div>

                        <div class="form-wrapper">
                            <label for="password">Password</label>
                            <div class="password-wrapper">
                                <input class="form-control mt-1 mb-1" id="password" :type="passwordInputType"
                                    placeholder="..." v-model="user.password" />
                                <p class="passwordVisibilityIcon"
                                    :style="{ 'background-image': 'url(' + passwordBackground + ')' }"
                                    @click="showOrHidePassword">
                                </p>
                            </div>
                            <a class="forgot-password" href="#">Forgot Password?</a>
                        </div>

                        <div class="form-wrapper">
                            <input class="form-control button-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p></p>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.login {
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100%;
}

.login-container {
    padding: 25px;
    border: 1px solid rgba(0, 0, 0, 0.061);
    border-radius: var(--border-radius);
    min-width: 300px
}

.forgot-password {
    float: right;
    color: var(--primary-color);
}

.password-wrapper {
    position: relative
}

.password-wrapper .passwordVisibilityIcon {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 15px;
    height: 15px;
    border: none;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>


<script>
export default {
    data() {
        return {
            passwordBackground: require('@/assets/icons/close.svg'),
            passwordInputType: "password",
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        handleLogin() {
            let data = JSON.stringify(this.user)
            alert('login clicked')
        },
        showOrHidePassword() {
            let state = this.passwordInputType
            if (state === "text") {
                this.passwordBackground = require('@/assets/icons/close.svg'),
                    this.passwordInputType = "password"
            } else {
                this.passwordBackground = require('@/assets/icons/download.svg'),
                    this.passwordInputType = "text"
            }
        }
    }
}
</script>

