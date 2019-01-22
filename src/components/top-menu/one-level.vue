<template>
    <el-menu-item :index="data.id+''">{{data.menuLabel}}</el-menu-item>
</template>

<script>
export default {
    name: 'oneLevel',
    props: {
        data: {}
    }
}
</script>
