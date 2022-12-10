<template>
    <section>
        <!-- Page Title -->
        <div class="title mt-5">
            <h1>Certificate List</h1>
        </div>

        <!-- filter component -->
        <div class="mb-3">
            <div class="left">
                <p class="tag mb-2 pointer" @click="advancedFilter = !advancedFilter">Click or Filter</p>
            </div>
            <div class="flex-wrap filter-wrapper" v-if="advancedFilter">
                <div class="content-wrapper">
                    <label for="search-key">Select Key</label>
                    <select class="form-control" id="search-key">
                        <option value="name">Id</option>
                        <option value="name">Name</option>
                    </select>
                </div>
                <div class="content-wrapper">
                    <label for="search-input">Search Text</label>
                    <input id="search-input" class="form-control" type="text" v-model="key"
                        placeholder="Enter Search Text" @input.prevent="filterCertificate">
                </div>
                <div class="content-wrapper">
                    <label for="search-key">Programme</label>
                    <select class="form-control" id="search-key">
                        <option value="cohort1.0">Cohort1.0</option>
                        <option value="cohort2.0">Cohort2.0</option>
                    </select>
                </div>
                <div class="content-wrapper">
                    <label for="search-key">Track</label>
                    <select class="form-control" id="search-key">
                        <option value="backend">Id</option>
                        <option value="product designer">Product Designer</option>
                        <option value="Frontend Engineer">Frontend Engineer</option>
                        <option value="ui/ux designer">UI/UX Designer</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- certificate list -->
        <div class="certificate-list mt-5" v-if="(certificates.length != 0)">

            <!-- Certificate Component -->
            <!-- certificate item heading -->
            <div class="table-heading-wrapper">
                <p>ID</p>
                <p>NAME</p>
                <p>TRACK</p>
                <p>PROGRAMME</p>
            </div>


            <CertificateItem v-for="(i, index) in certificates" :key="index" :id="i.certificateId" :name="i.name"
                :track="i.track" :programme="i.programme" :image="i.picture" :downloadLink="i.url" />
        </div>

        <!-- loading spinner -->
        <div v-if="(certificates.length == 0)" class="mt-5 center">
            <div v-if="(certificates.length === 0)" class="mt-3 mb-3 loader"></div>
            <img class="icon-big mb-2" src="@/assets/images/empty.png" />
            <p>You do not have any certificate</p>
        </div>


    </section>
</template>

<script>
export default {
    layout: "web",
    data() {
        return {
            advancedFilter: false,
            certificates: "",
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
                    self.certificates = response.data;
                    self.originalData = response.data;
                })
                .catch(function (error) {
                    self.$toast.error(error.response?.data.error).goAway(3000)
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

.table-heading-wrapper {
    display: grid;
    grid-template-columns: 30% 30% 20% 10% 5% 5%;
    align-items: center;
    border-radius: 4px;
    padding: 15px;
}

.table-heading-wrapper>p {
    font-weight: 600;
}

.flex-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
}

.filter-wrapper {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.052);
    border-radius: var(--border-radius);
}

@media (max-width: 1000px) {
    .table-heading-wrapper {
        display: none;
    }
}
</style>