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
            <input class="form-control" id="name" type="text" placeholder="E.g John Doe" v-model="certificate.name">
          </div>

          <!-- track -->
          <div class="content-wrapper">
            <label for="track">Track</label>
            <select class="form-control" id="track" v-model="certificate.track">
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
            <select class="form-control" id="programme" v-model="certificate.programme">
              <option value="default">Select Programme...</option>
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
        <p class="mb-2">Certificate View</p>
        <div class="certificate">
          <iframe :src="pdfsource" frameborder="0" width="300px" height="300px"></iframe>
          <button class="button-black">Download</button>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Request from '../config/Request'

export default {
  layout: "web",
  data() {
    return {
      certificate: {
        name: "",
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
    async createCertificate() {
      this.loading = true
      var config = {
        method: 'post',
        url: 'http://localhost:3001/create',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(this.certificate)
      };
      await Request.init(config).then(response => {
        this.$toast.success(response?.data.message).goAway(3000)
        this.pdfsource = response?.data.url
      }).catch(error => {
        if (error.response) {
          this.$toast.error(error.response?.data.error).goAway(3000)
        } else {
          this.$toast.error(error).goAway(3000)
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