<template>
    <el-submenu :index="data.id+''">
        <template slot="title">
            <div v-if="data.menuLevel == 1" class="first-wrap">
                <img class="icon" :src="require('./'+data.menuIcon+'.png')" alt="">
                <span class="text">{{data.menuLabel}}</span>
            </div>
            <span class="label" v-else>{{data.menuLabel}}</span>
        </template>
        <component v-for="(item) in data.children" :data="item" :is="item.children?'two-level':'one-level'" :key="item.id"></component>
    </el-submenu>
</template>

<script>
import oneLevel from './one-level'
export default {
    name: 'twoLevel',
    props: {
        data: {}
    },
    components: {
        oneLevel
    },
}
</script>
