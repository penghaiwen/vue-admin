<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>

    <div class="right-menu">

      <!-- <nx-github style="margin-top:2px" class="nx-help right-menu-item"></nx-github> -->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
     <!-- <nx-help class="nx-help right-menu-item" /> -->



      <!-- <lang-select class="international right-menu-item"></lang-select>
      <nx-lang-select class="international right-menu-item"></nx-lang-select> -->


      <span class="right-menu-item">老默-False</span>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper" >
          <img class="user-avatar" src="https://mgbq.github.io/nx-admin-site/home.png">
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            修改密码
          </el-dropdown-item>

          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import nxBreadcrumb from '@/components/nx-breadcrumb'
  import nxHamburger from '@/components/nx-hamburger'
  import nxHelp from '@/components/nx-help/index'

  import nxLangSelect from '@/components/nx-lang-select/index'

  import nxGithub from '@/components/nx-github/index'
  export default {
    name: 'navBar',
    components: {
      nxBreadcrumb,
      nxHamburger,
      nxHelp,
      nxLangSelect,
      nxGithub
    },
    computed: {
      ...mapGetters(['sidebar', 'name', 'avatar'])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .nx-help {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }

      .screenfull {
        height: 20px;
      }

      .international {
        vertical-align: top;
      }

      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        height: 50px;
        margin-right: 30px;

        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }


        }
      }
    }
  }
</style>
