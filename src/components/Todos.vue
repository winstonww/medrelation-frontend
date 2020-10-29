<template>
    <div>
        <ul>
            <li v-for="todo in lool"
                :key="todo.id">
                {{todo.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Todos",
    props : ["lool"]
}
</script>

<style scoped>

</style>