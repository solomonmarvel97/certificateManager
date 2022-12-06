<template>
    <section>
        <!-- Page Title -->
        <div class="title mt-5">
            <h1>Home Page</h1>
            <p>{{status}}</p>
        </div>
    </section>
</template>

<script>
export default {
    layout: "web",
    data() {
        return {
        }
    },
    methods: {
        
    },
    computed: {
        status() {
            return this.$nuxt.isOffline
        }
    },
    watch: {
        status(offline) {
            if(this.$nuxt.isOffline){
                this.$toast.error("You're offline").goAway(1000)
            } else {
                this.$toast.success("You're back online").goAway(1000)
            }
        }
    },

}
</script>