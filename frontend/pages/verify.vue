<template>
  <section>
    <main>
      <!-- certificate form  -->
      <div class="certificate-form">
        <form @submit.prevent="createCertificate">
          <!-- full name -->
          <div class="content-wrapper">
            <label for="name">Full Name</label>
            <input class="form-control" id="name" type="text" placeholder="E.g John Doe" v-model="certificate.name">
          </div>

          <!-- track -->
          <div class="content-wrapper">
            <label for="track">Track</label>
            <select class="form-control" id="track" v-model="certificate.track">
              <option>Select Track</option>
              <option value="Frontend Engineering">Frontend Engineering</option>
              <option value="Backend Engineering">Backend Engineering</option>
              <option value="UI/UX">UI/UX Design</option>
            </select>
          </div>

          <!-- programme -->
          <div class="content-wrapper">
            <label for="programme">Programme</label>
            <select class="form-control" id="programme" v-model="certificate.programme">
              <option>Select Programme</option>
              <option value="Cohort 1.0">Cohort 1.0</option>
              <option value="Cohort 2.0">Cohort 2.0</option>
            </select>
          </div>

          <!-- start date -->
          <div class="content-wrapper">
            <label for="start_date">Start Date</label>
            <input class="form-control" id="start_date" type="date" v-model="certificate.startDate">
          </div>

          <!-- end date -->
          <div class="content-wrapper">
            <label for="end_date">End Date</label>
            <input class="form-control" id="end_date" type="date" v-model="certificate.endDate">
          </div>

          <!-- file upload -->
          <div class="content-wrapper file-upload">
            <label for="file_upload">
              <div>
                <img class="icon-big mb-1" src="@/assets/icons/upload-icon.svg" alt="upload icon" />
                <p class="mb-1">Upload Picture</p>
                <p class="description mb-1">Or you can simply drag and drop</p>
              </div>
            </label>
            <input class="form-control" id="file_upload" type="file">
          </div>

          <div>
            <Button class="button-primary" :loading="loading" text="Generate Certifiate" />
          </div>
        </form>
      </div>


      <!-- certicate view -->
      <div class="certificate-view">
        <p class="mb-2">Ceretificate View</p>
        <div class="certificate">
          <iframe :src="pdfsource" frameborder="0" width="300px" height="300px"></iframe>
          <button class="button-black">Download</button>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  data() {
    return {
      certificate: {
        name: "",
        track: "",
        programme: "",
        startDate: "",
        endDate: "",
        picture: "https://avatars.dicebear.com/api/adventurer/bendex.svg",
      },
      loading: false,
      pdfsource: null,
    }
  },
  components: {
  },
  methods: {
    async createCertificate() {
      var axios = require('axios');
      var data = JSON.stringify(this.certificate);
      var config = {
        method: 'post',
        url: 'http://localhost:3001/create',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      this.loading = true
      await axios(config).then(response => {
        console.log(response.data.data)
        this.pdfsource = response.data.url
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>