<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Sys Admin" sub="Registration"/>
        <div class="admin-pages-tabs">
            <!--b-tags comes from bootstrap-vue. See doc-->
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Articles" active>
                        <ArticleAdmin></ArticleAdmin>
                    </b-tab>
                    <b-tab title="Categories">
                        <CategoryAdmin></CategoryAdmin>
                    </b-tab>
                    <b-tab title="Users">
                        <UserAdmin></UserAdmin>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import ArticleAdmin from './ArticleAdmin.vue'
import CategoryAdmin from './CategortyAdmin.vue'
import UserAdmin from './UserAdmin.vue'

export default {
    name: 'AdminPages',
    components: {PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin}
}
</script>

<style>

</style>