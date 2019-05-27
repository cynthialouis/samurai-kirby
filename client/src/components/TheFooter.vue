<template>
<footer class="main-background-color">
    <span class="main-font-color">Made with <3 by Cynthia</span>
</footer>
</template>

<script>

</script>

<style scoped lang="scss">
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
    }
    footer span {
        margin-left: 20px;
        font-size: 15px;
        line-height: 50px;
    }

    @media (max-width: 640px) {
        footer {
            height: 50px;
        }
        footer span {
            margin-left: 10px;
            font-size: 10px;
            line-height: 50px;
        }
    }
</style>
