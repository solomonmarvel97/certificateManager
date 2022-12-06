<template>
<div class="certificate-item">
                <p class="id"><i>{{id}}</i></p>
                <p class="name">{{name}}</p>
                <p class="programme">{{track}}</p>
                <p>{{programme}}</p>
                <img :src="(image || `https://avatars.dicebear.com/api/initials/${name}.svg`)"/>
                <a target="_blank" :href="downloadLink">
                <img class="download-icon" src="@/assets/icons/download.svg"/>
            </a>
            </div>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        track: String,
        programme: String,
        image: String,
        downloadLink: String,
    }
}
</script>

<style scoped>
.certificate-item {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    place-items: center;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.066);
    padding: 10px;
}

p {
    font-size: 13px;
}

.certificate-item .id {
    color: rgb(135, 135, 135);
}

.certificate-item .name {
    width: 220px;
    display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
  	overflow: hidden;
}

.certificate-item .track {
    width: 200px;
    display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
  	overflow: hidden;
}

.certificate-item img {
    border-radius: 50%;
    object-fit: cover;
    width: 30px;
    height: 30px;
}

.certificate-item .download-icon {
    object-fit: cover;
    width: 15px;
    height: 15px;
}

.certificate-item a {
    height: 25px;
    display: grid;
    place-items: center;
    padding: 0 20px;
    border-radius: var(--border-radius);
    border: none;
    cursor: pointer;
}
</style>