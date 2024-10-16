<template>
    <div class="category-admin">
        <b-form>
            <b-row>
                <b-col xs="12">
                    <b-form-group label="Name:" label-for="Category name">
                        <b-form-input id="Category name" type="text"
                            v-model="category.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Type in category name"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-show="mode === 'save'">
                <b-col xs="12">
                    <b-form-group label="Father Category:" label-for="category-parentId">
                        <b-form-select id="category-parentId"
                            :options="categories" v-model="category.parentId"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Save</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Remove</b-button>
                    <b-button class="ml-2" @click="reset">Cancel</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table striped hover :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '../../../global'
export default {
    name: 'CategoryAdmin',
    data: function(){
        return {
            mode: 'save',
            category: {},
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
            axios.get(url).then(res => {
                //this.categories = res.data
                this.categories = res.data.map(category => {
                    return {...category, value: category.id, text: category.path}
                })
            })
        },
        loadCategory(category, mode='save'){
            this.mode = mode
            this.category = {
                id: category.id,
                name: category.name,
                parendId: null
            }
        },
        reset(){
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },
        remove(){
            const id = this.category.id
            axios.delete(`${baseApiUrl}/categories/${id}`)
                .then(()=> {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        save(){
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories/${id}`, this.category)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted(){
        this.loadCategories()
    }
}
</script>

<style>

</style>