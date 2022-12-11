<template>
  <section>

    <!-- Page Title -->
    <div class="title mt-5">
      <h1>Create Certificate</h1>
    </div>

    <main class="mt-4">
      <!-- certificate form  -->
      <div class="certificate-form">
        <form @submit.prevent="createCertificate">
          <!-- full name -->
          <div class="content-wrapper">
            <label for="name">Full Name</label>
            <input class="form-control" id="name" type="text" placeholder="E.g John Doe" v-model="certificate.name" required>
          </div>

          <!-- email -->
          <div class="content-wrapper">
            <label for="email">Email Address</label>
            <input class="form-control" id="email" type="email" placeholder="E.g johndoe@email.com" v-model="certificate.email" required>
          </div>

          <!-- track -->
          <div class="content-wrapper">
            <label for="track">Track</label>
            <select class="form-control" id="track" v-model="certificate.track" required>
              <option value="default">Select Track...</option>
              <option value="Frontend Engineer">Frontend Engineer</option>
              <option value="Backend Engineer">Backend Engineer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="UI/UX Designer">Product Manager</option>
            </select>
          </div>

          <!-- programme -->
          <div class="content-wrapper">
            <label for="programme">Programme</label>
            <select class="form-control" id="programme" v-model="certificate.programme" required>
              <option value="default">Select Programme...</option>
              <option value="Cohort 1.0">Cohort 1.0</option>
              <option value="Cohort 2.0">Cohort 2.0</option>
            </select>
          </div>

          <!-- start date -->
          <div class="content-wrapper">
            <label for="start_date">Start Date</label>
            <input class="form-control" id="start_date" type="date" v-model="certificate.startDate" required>
          </div>

          <!-- end date -->
          <div class="content-wrapper">
            <label for="end_date">End Date</label>
            <input class="form-control" id="end_date" type="date" v-model="certificate.endDate" required>
          </div>

          <!-- file upload -->
          <div class="content-wrapper file-upload">
            <label for="file_upload">
              <div v-if="!Images">
                <img class="icon-big mb-1" src="@/assets/icons/upload-icon.svg" alt="upload icon" />
                <p class="mb-1">Upload Picture</p>
                <p class="description mb-1">File size should not exceed 1MB</p>
              </div>

              <div v-if="Images">
                <img class="icon-big mb-1" src="@/assets/icons/upload-icon.svg" alt="upload icon" />
                <p class="mb-1">{{ Images?.name }}</p>
                <p class="description mb-1">Ready for Upload</p>
              </div>

            </label>
            <input class="form-control" id="file_upload" type="file" @change="uploadFile" ref="file">
          </div>
          <div>
            <Button class="button-primary" :loading="loading" text="Generate Certifiate" />
          </div>
        </form>
      </div>


      <!-- certicate view -->
      <div class="certificate-view">
        <div class="mb-2">
          <p class="tag">Certificate View</p>
        </div>
        <div class="certificate">
          <iframe :src="pdfsource" frameborder="0" width="300px" height="300px"></iframe>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Request from '@/config/Request'

export default {
  layout: "web",
  data() {
    return {
      Images: null,
      certificate: {
        name: "",
        email: "",
        track: "default",
        programme: "default",
        startDate: "",
        endDate: ""
      },
      picture: "https://avatars.dicebear.com/api/adventurer/bendex.svg",
      loading: false,
      pdfsource: null,
    }
  },
  components: {
  },
  methods: {
    uploadFile() {
      this.Images = ''
      this.Images = this.$refs.file.files[0];
    },
    async createCertificate() {
      let self = this
      self.loading = true
      const axios = require('axios')
      const formData = new FormData()
      formData.append('image', this.Images);
      formData.append('form', JSON.stringify(this.certificate))
      const headers = { 'Content-Type': 'multipart/form-data' }
      axios.post('http://localhost:3001/certificate', formData, { headers }).then((response) => {
        self.$toast.success(response?.data.message).goAway(3000)
        self.pdfsource = response.data.url
        // response.data.files;
        self.certificate = {}
        self.Images = null
      }).catch(error => {
        if (error.response) {
          self.$toast.error(error.response?.data.error).goAway(3000)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
/* index page */
main {
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 50px;
  height: 100%;
  align-items: center;
}

main>div {
  flex: 1;
  flex-basis: 300px;
}

@media (max-width: 1000px) {
  main {
    display: flex;
    flex-wrap: wrap;
  }
}

main .certificate-form {}

main .certificate-view {
  height: 100%;
}

main .certificate-view .certificate {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
}

main .certificate-view .certificate button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>