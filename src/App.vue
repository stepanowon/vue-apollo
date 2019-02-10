<template>
    <div>
        <div>
        이름 : <input type="text" v-model="contact.name" /><br />
        전화 : <input type="text" v-model="contact.tel" /><br />
        주소 : <input type="text" v-model="contact.address" /><br />
        <br />
        <button @click="insertContact">추가</button>
        </div>
        <hr />
        이름 : <input type="text" :value="name" @keyup.enter="search" placeholder="ex)se type name and hit enter key" />
        <table>
            <tr v-for="c in searchContact" :key="c._id">
                <td>
                    <img :src="c.photo" />
                </td>
                <td>
                    이름 : {{c.name}}<br /> 
                    전번 : {{c.tel}}<br />
                    주소 : {{c.address}}<br /><br />
                    <span style="cursor:pointer; color:blue;" @click="deleteContact(c._id)">삭제</span>
                </td>
            </tr>
        </table>
        <div v-if="$apollo.loading">Loading...</div>
    </div>
</template>

<script>
import { SEARCH_CONTACTS, INSERT_CONTACT, DELETE_CONTACT } from './queries'

export default {
    name : "App",
    data() {
        return {
            name: "sean",
            contact : {
                name : "", tel:"", address:""
            }
        }
    },
    apollo : {
        searchContact : {
            query : SEARCH_CONTACTS,
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
        },
        insertContact() {
            this.$apollo.mutate({
                mutation : INSERT_CONTACT,
                variables : {
                    name : this.contact.name,
                    tel : this.contact.tel, 
                    address : this.contact.address
                }
            }).then(response=> {
                const res = response.data.insertContact;
                if (res.status === "ok") {
                    this.name = this.contact.name;
                    this.contact = { name:"", tel:"", address:"" }
                    //alert(res._id + "번으로 추가 성공")
                } else {
                    alert("추가 실패 : " + res.message);
                }
            })
        },
        deleteContact(_id) {
            this.$apollo.mutate({
                mutation : DELETE_CONTACT,
                variables : {
                    _id : _id
                }
            }).then(response=> {
                const res = response.data.deleteContact;
                if (res.status === "ok") {
                    const index = this.$apolloData.data.searchContact.findIndex(item => _id === item._id)
                    this.$apolloData.data.searchContact.splice(index,1)
                    //alert(res._id + "번 삭제 성공")
                } else {
                    alert("삭제 실패 : " + res.message);
                }
            })
        }
    }
}
</script>

<style>

</style>
