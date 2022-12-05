<template>
    <button class="button" :class="theme">
      <div v-if="loading" class="loader"></div>
      <p v-if="!loading">{{ text }}</p>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      loading: {
        type: Boolean,
      },
      text: {
        type: String,
        default: "Button Text",
      },
      theme: {
        type: String,
        default: 'ascent'
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    display: flex;
    place-items: center;
    justify-content: center;
    gap: 10px;
  }

  p {
    color: white
  }
  
  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid black;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1.5s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>