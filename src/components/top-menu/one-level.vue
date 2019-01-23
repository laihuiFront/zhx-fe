<template>
    <el-menu-item @click="gotoPage" :index="data.leafNode? '/zhx'+data.menuUrl : data.id+''">
        <template slot="title">
            <div v-if="data.menuLevel == 1" class="first-wrap">
                <img class="icon" :src="require('./'+data.menuIcon+'.png')" alt="">
                <span class="text">{{data.menuLabel}}</span>
            </div>
            <span class="label" v-else>{{data.menuLabel}}</span>
        </template>
    </el-menu-item>
</template>

<script>
import home from './home.png'
export default {
    name: 'oneLevel',
    props: {
        data: {},
        home
    },
    methods: {
        gotoPage() {
            this.$router.push('/zhx' + this.data.menuUrl)
        }
    }
}
</script>
