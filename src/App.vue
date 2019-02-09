<template>
    <div>
        이름 : <input type="text" v-text="name" @keyup.enter="search" />
        <div v-for="c in searchContact" :key="c._id">
            {{c.name}} : {{c.tel}}, {{c.address}}<br/>
            <img :src="c.photo" />
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name : "App",
    data() {
        return {
            name: "se"
        }
    },
    apollo : {
        searchContact : {
            query : gql`
                query searchContactQuery($name: String!) {
                    searchContact(name:$name) {
                        _id name tel address photo
                    }   
                }
            `,
            variables() {
                return {
                    name : this.name
                }
            }
        } 
    },
    methods : {
        search(e) {
            this.name = e.target.value;
        }
    }
}
</script>

<style>

</style>
