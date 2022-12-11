<template>
    <section>
        <!-- Page Title -->
        <div class="title mt-5">
            <h1>Search Certificate</h1>
        </div>

        <!-- searh area -->
        <div class="mt-5">
            <div class="mb-3">
                <div class="">
                    <div class="search-wrapper">
                        <form @submit.prevent="searchCertificate">
                            <div class="center">
                            <input id="search-input" class="form-control" type="text" v-model="certificateId"
                                placeholder="Enter Certificate ID" :disabled="disabled" required>
                            <Button :loading="loading" class="button-black" text="Search"></Button>
                        </div>
                        </form>
                    </div>

                    <!-- loading spinner -->
                    <div class="center">
                        <div v-if="loading" class="mt-5 loader"></div>
                    </div>

                    <div class="mt-5">
                        <iframe :src="certificate" frameborder="0" width="300px" height="300px"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    layout: "web",
    data() {
        return {
            loading: false,
            disabled: false,
            certificateId: null,
            certificate: null
        }
    },
    methods: {
        searchCertificate() {
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://localhost:3001/certificate/search/${this.certificateId}`,
                headers: {}
            };

            this.loading = true,
                this.disabled = true

            let self = this
            axios(config)
                .then(function (response) {
                    self.certificate = response.data.url
                })
                .catch(function (error) {
                    self.$toast.error(error.response.data.error).goAway(5000)
                }).finally(() => {
                    this.loading = false,
                    this.disabled = false
                })

        }
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
    margin-bottom: 1em;
}

.table-heading-wrapper>p {
    font-weight: 600;
}

.flex-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
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

iframe {
    width: 100%;
    height: 500px;
}

.search-wrapper {
    padding: 50px;
    border: 1px dashed rgba(0, 0, 0, 0.127);
    border-radius: var(--border-radius);
}

.search-wrapper button {
    height: 37px
}

.center {
    all: unset;
    width: 50%;
    margin: 0 auto;
    display: flex;
    gap: 20px;
}

@media (max-width: 1000px) {
    .search-wrapper {
        padding: 20px;
    }
    .center {
        width: 100%;
    }
}

</style>