<template>
    <section>
        <!-- Page Title -->
        <div class="title mt-5">
            <h1>Certificate List</h1>
        </div>

        <div v-if="!certificates" class="mt-5 loader center"></div>

        <p>Filter</p>
        <input type="text" v-model="key" @input="filterCertificate" >

        <!-- certificate list -->
        <div class="certificate-list mt-5">
            <CertificateItem v-for="(i, index) in certificates" :key="index" :id="i.certificateId" :name="i.name" :track="i.track"
                :programme="i.programme" :image="i.picture" :downloadLink="i.url" />
        </div>
    </section>
</template>

<script>
export default {
    layout: "web",
    data() {
        return {
            certificates: null,
            originalData: null,
            key: null
        }
    },
    mounted() {
        this.getCertificates()
    },
    methods: {
        getCertificates() {
            let self = this
            var axios = require('axios');

            var config = {
                method: 'get',
                url: 'http://localhost:3001/certificates',
                headers: {}
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data))
                    self.certificates = response.data;
                    self.originalData = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        filterCertificate() {
            this.certificates = this.originalData
            let x = this.certificates.filter((a) => {
                if (a.name.toLowerCase().includes(this.key.toLowerCase())) {
                    return a
                }
            });
            this.certificates = x
        },
    }
}
</script>

<style scoped>
.certificate-list {
    display: grid;
    gap: 8px;
}
</style>