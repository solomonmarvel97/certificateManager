<template>
    <div class="layout-body">
        <Navigation />
        <Nuxt />
    </div>
</template>

<script>
export default {
    layout: "web",
    data() {
        return {
        }
    },
    computed: {
        status() {
            return this.$nuxt.isOffline
        }
    },
    watch: {
        status() {
            if (this.$nuxt.isOffline) {
                console.dir(this.$toast)
                this.$toast.error("You're offline")
            } else {
                this.$toast.clear()
                this.$toast.success("You're back online").goAway(2000)
            }
        }
    },
}
</script>