<template>
  <section>
    <!-- Page Title -->
    <div class="title mt-5">
      <h1>Certificate List</h1>
    </div>

    <!-- filter component -->
    <div class="mb-3">
      <div class="left">
        <p class="tag mb-2 pointer" @click="advancedFilter = !advancedFilter">
          Click or Filter
        </p>
      </div>
      <div class="flex-wrap filter-wrapper" v-if="advancedFilter">
        <div class="content-wrapper">
          <label for="search-key">Select Key</label>
          <select class="form-control" id="search-key" v-model="filterType">
            <option value="certId">Id</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div class="content-wrapper">
          <label for="search-input">Search Text</label>
          <input
            id="search-input"
            class="form-control"
            type="text"
            v-model="key"
            placeholder="Enter Search Text"
            @input.prevent="filterCertificateByIdName"
          />
        </div>
        <div class="content-wrapper">
          <label for="search-key">Programme</label>
          <select
            class="form-control"
            id="search-key"
            @change="filterCertificateByProg"
            v-model="filterProg"
          >
            <option value="">Select Programme</option>
            <option value="cohort 1.0">Cohort 1.0</option>
            <option value="cohort 2.0">Cohort 2.0</option>
          </select>
        </div>
        <div class="content-wrapper">
          <label for="search-key">Track</label>
          <select
            class="form-control"
            id="search-key"
            @change="filterCertificateByTrack"
            v-model="filterTrack"
          >
            <option value="">Select Track</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>
      </div>
    </div>

    <!-- certificate list -->
    <div class="certificate-list mt-5" v-if="certificates.length != 0">
      <!-- Certificate Component -->
      <!-- certificate item heading -->
      <div class="table-heading-wrapper">
        <p>ID</p>
        <p>NAME</p>
        <p>TRACK</p>
        <p>PROGRAMME</p>
      </div>

      <CertificateItem
        v-for="(i, index) in certificates"
        :key="index"
        :id="i.certificateId"
        :name="i.name"
        :track="i.track"
        :programme="i.programme"
        :image="i.picture"
        :downloadLink="i.url"
      />
    </div>

    <!-- loading spinner -->
    <div v-if="certificates.length == 0" class="mt-5 center">
      <div v-if="certificates.length === 0" class="mt-3 mb-3 loader"></div>
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
      filterType: "",
      filterProg: "",
      filterTrack: "",
      advancedFilter: false,
      certificates: "",
      // certificates: [
      //   {
      //     name: "Alawiye Muriatala",
      //     certificateId: "ah83479sju739a93022eh",
      //     track: "Frontend Engineer",
      //     programme: "Cohort 2.0",
      //   },
      //   {
      //     name: "Goodluck Ebel Jonathan",
      //     certificateId: "ol9sfs93479sju739a93022eh",
      //     track: "Backend Engineer",
      //     programme: "Cohort 1.0",
      //   },
      //   {
      //     name: "Efe Omoreh",
      //     certificateId: "ah83479sju739a93022eh",
      //     track: "Frontend Engineer",
      //     programme: "Cohort 1.0",
      //   },
      //   {
      //     name: "Seun Oloyede",
      //     certificateId: "ols9hsfhafn9wcn93rb",
      //     track: "Backend Engineer",
      //     programme: "Cohort 2.0",
      //   },
      // ],
      originalData: null,
      key: null,
    };
  },
  mounted() {
    this.getCertificates();
  },
  methods: {
    getCertificates() {
      let self = this;
      var axios = require("axios");

      var config = {
        method: "get",
        url: "http://localhost:3001/certificates",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          self.certificates = response.data;
          self.originalData = response.data;
        })
        .catch(function (error) {
          self.$toast.error(error.response?.data.error).goAway(3000);
        });
      // self.originalData = self.certificates;
    },
    filterCertificateByIdName() {
      // this.certificates = this.originalData;
      if (this.key) {
        var filterByType;
        if (this.filterType === "certId") {
          filterByType = this.certificates.filter((a) => {
            if (a.certificateId.toLowerCase().includes(this.key.toLowerCase())) {
              return a;
            }
          });
        } else {
          filterByType = this.certificates.filter((a) => {
            if (a.name.toLowerCase().includes(this.key.toLowerCase())) {
              return a;
            }
          });
        }

        this.certificates = filterByType;
      } else {
        this.certificates = this.originalData;
      }
    },
    filterCertificateByProg() {
      if (this.filterProg !== "") {
        var filterByProg;
        filterByProg = this.certificates.filter((a) => {
          if (a.programme.toLowerCase().includes(this.filterProg.toLowerCase())) {
            return a;
          }
        });

        this.certificates = filterByProg;
      } else {
        this.certificates = this.originalData;
      }
    },
    filterCertificateByTrack() {
      if (this.filterTrack !== "") {
        var filterByTrack;
        filterByTrack = this.certificates.filter((a) => {
          if (a.track.toLowerCase().includes(this.filterTrack.toLowerCase())) {
            return a;
          }
        });

        this.certificates = filterByTrack;
      } else {
        this.certificates = this.originalData;
      }
    },
  },
};
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

.table-heading-wrapper > p {
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
