<template>
    <section>
        <!-- Page Title -->
        <div class="title mt-5">
            <h1>Home Page</h1>
            
        </div>
    </section>
</template>

<script>
let arr = [{"_id":"638f65895bb1e07bdeae9165","certificateId":"f2372c548d16425da21e9ad2ee8c86db","name":"Marvelous Akporowho","track":"Frontend Engineer","startDate":"2022-12-10","endDate":"2022-12-30","programme":"Cohort 1.0","picture":null,"url":"http://localhost:3001/certificate/f2372c548d16425da21e9ad2ee8c86db"},{"_id":"638f66255bb1e07bdeae9166","certificateId":"24ebfb48c9174e0eb5dce50fa8319082","name":"Marvelous Akporowho Nwamaka Emmanuella Orioma Akporowho Akporowho","track":"Frontend Engineer","startDate":"2022-12-17","endDate":"2023-01-06","programme":"Cohort 1.0","picture":null,"url":"http://localhost:3001/certificate/24ebfb48c9174e0eb5dce50fa8319082"},{"_id":"638f67a35bb1e07bdeae9167","certificateId":"7348c756fc634b5d975cf5282510841e","name":"Kassie Ugwu","track":"Frontend Engineer","startDate":"2022-12-04","endDate":"2022-12-22","programme":"Cohort 2.0","picture":null,"url":"http://localhost:3001/certificate/7348c756fc634b5d975cf5282510841e"},{"_id":"638f69435bb1e07bdeae9168","certificateId":"0089451344b4439eaf5987bd8ffe60de","name":"Fega","track":"UI/UX Designer","startDate":"2022-12-10","endDate":"2022-12-16","programme":"Cohort 2.0","picture":null,"url":"http://localhost:3001/certificate/0089451344b4439eaf5987bd8ffe60de"}];
export default {
    layout: "web",
    data() {
        return {
            arr: arr,
            filteredArray: null,
            key: null,
        }
    },
    methods: {
        filter() {
            let x = this.arr.filter((a) => { if (a.name.toLowerCase().includes(this.key)) { return a } });
            this.filteredArray = x
        }
    },
    computed: {
        status() {
            return this.$nuxt.isOffline
        }
    },
    watch: {
        status(offline) {
            if (this.$nuxt.isOffline) {
                this.$toast.error("You're offline").goAway(3000)
            } else {
                this.$toast.success("You're back online").goAway(1000)
            }
        }
    },

}
</script>