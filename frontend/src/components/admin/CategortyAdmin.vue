<template>
    <div class="category-admin">
        <b-form>

        </b-form>
        <b-table striped hover :items="categories" :fields="fields">
            
        </b-table>
    </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl } from '../../../global'
export default {
    name: 'CategoryAdmin',
    data: function(){
        return {
            categories: [],
            fields: [
                {key: 'id', label: 'Code', sortable: true},
                {key: 'name', label: 'Name', sortable: true},
                {key: 'parentId', label: 'Parent', sortable: true},
                {key: 'path', label: 'Path', sortable: true},
                {key: 'actions', label: 'Actions'}
            ]
        }
    },
    methods: {
        loadCategories(){
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => this.categories = res.data)
        }
    },
    mounted(){
        this.loadCategories()
    }
}
</script>

<style>

</style>