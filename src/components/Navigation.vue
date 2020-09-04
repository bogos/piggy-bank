<template>
    <header class="site-header">
        <nav class="site-nav">
            <ul>
                <li><router-link to="/" class="link">PiggyBank</router-link></li>
                <li><router-link to="/contact" class="link">Contact</router-link></li>
            </ul>
        </nav>
        <div class="logo">
            <img src="../assets/images/logo.png"/>
        </div>
    </header>

</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss">

    .site-header {
        background: none;
        color: black;
        display: flex;
        align-items: center;
        position: relative;
        // border-bottom: 1px solid darken(#CDD0D0, 10%);
    }

    .logo {
        text-decoration: none;
        color: white;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        padding: 10px;
    }
    .site-nav {
        ul {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }
        a {
            text-transform: uppercase;
            text-decoration: none;
            color: black;
            padding: 20px;
            display: inline-block;
        }

        .link{
            width: 150px;
            text-align: center;
            border-bottom: 1px solid #f7f7f7;

            &:hover {
                // background-color: darken(#f7f7f7, 10%);
                border-bottom: 2px solid darken(#f7f7f7, 30%);
            }
        }
    }
    .logo{
        margin-left: auto;
        display:flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 10px;
        img{
            width: 50%;
        }
    }

</style>