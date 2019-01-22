<template>
    <el-submenu :index="data.id+''">
        <template slot="title">{{data.menuLabel}}</template>
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
