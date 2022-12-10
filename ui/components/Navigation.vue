<template>
    <div class="navigation">
        <!-- web navigation -->
        <nav class="web">
            <!-- left nav items -->
            <div class="menu-wrapper">
                <nuxt-link to="/">
                    <h1 class="logo">cert-managr</h1>
                </nuxt-link>
                <ul class="menu">
                    <li>
                        <nuxt-link to="/certificate/create-certificate">Create Certificate</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/certificate/certificate-list">Certificate List</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/certificate/verify-certificate">Verify Certificate</nuxt-link>
                    </li>
                </ul>
            </div>
            <!-- right nav items -->
            <div>
                <ul class="menu">
                    <div class="flex disabled">
                        <a>Help</a>
                    </div>
                    <div class="flex">
                        <a @click="logout">Logout</a>
                    </div>
                    <a class="flex-wrap" href="#">
                        <img class="avatar"
                            :src="'https://avatars.dicebear.com/api/initials/' + usernameInitial + '.svg'" />
                    </a>
                </ul>
            </div>
        </nav>



        <!-- mobile nav -->
        <nav class="mobile">
            <!-- left nav items -->
            <div class="mobile-menu-wrapper">
                <div class="flex-wrapper">
                    <button class="hamburger" @click="menu"></button>
                    <a href="/">
                        <h1 class="logo">cert-managr</h1>
                    </a>
                </div>
                <a class="flex-wrap" href="/profile">
                    <img class="avatar"
                        :src="'https://avatars.dicebear.com/api/initials/' + usernameInitial + '.svg'" />
                </a>
            </div>

            <div class="menu-container" v-if="openMenu">
                <a class="mb-4" href="#">
                    <h1 class="logo">cert-managr</h1>
                </a>
                <button class="close" @click="menu"></button>
                <div class="flex">
                    <a href="/certificate/create-certificate">Create Certificate</a>
                </div>
                <div class="flex">
                    <a href="/certificate/certificate-list">Certificate List</a>
                </div>
                <div class="flex">
                    <a href="/certificate/verify-certificate">Verify Certificate</a>
                </div>
                <div class="flex bottom">
                    <a @click="logout">Logout</a>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
export default {
    data() {
        return {
            openMenu: false,
            user: {
                username: 'solomonmarvel97',
                email: 'solomonmarvel@hotmail.com',
                firstName: 'Marvelous',
                lastName: 'Akporowho'
            },
        }
    },
    methods: {
        menu() {
            this.openMenu = !this.openMenu
        },
        logout() {
            alert('logout')
            location.replace('/')
        }
    },
    computed: {
        usernameInitial() {
            return this.user.username[0]
        }
    }
}
</script>

<style scoped>
.navigation {
    height: 80px;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.047);
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 1000;
}

.mobile {
    display: none;
}

nav {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    width: 85%;
    margin: 0 auto;
}

.menu-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 50px;
    justify-content: center;
}

.logo {
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.01em;
}

.menu {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 50px;
}

.menu>div {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
    align-items: center;
    justify-content: center;
}

.menu .icon {
    width: 18px;
    height: 18px;
}

.menu .initial {
    padding: 3px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    background-color: rgb(205, 205, 205);
}

@media (max-width: 1000px) {
    .navigation {}

    nav {
        width: 90%;
        margin: 0 auto;
    }

    .web {
        display: none;
    }

    .mobile {
        display: block;
    }

    .mobile-menu-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        place-items: center;
        height: 100%;
    }

    .hamburger {
        width: 22px;
        height: 18px;
        background-color: transparent;
        background-image: url('../assets/icons/hamburger.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border: none;
    }

    .close {
        border: none;
        width: 20px;
        height: 20px;
        background-color: transparent;
        background-image: url('../assets/icons/close.svg');
        background-size: cover;
        cursor: pointer;
    }

    .menu-container {
        width: 250px;
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: white;
        box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.043);
        z-index: 999;
        padding: 50px 0 0 20px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        position: fixed;
    }

    .menu-container button {
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .menu-container a {
        font-family: "Inter";
        font-size: 16px !important;
    }

    .flex-wrapper {
        gap: 15px;
    }

    .flex {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .bottom {
        position: inherit;
        bottom: 50px;
    }
}
</style>