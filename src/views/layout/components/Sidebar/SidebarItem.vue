<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">

            <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
                :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
                <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
                    <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
                    <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
                </el-menu-item>
            </router-link>

            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                    <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                    <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden ">



                    <el-menu :collapse="true" style="widows: 100%;" v-if="child.children&&child.children.length>0"
                        background-color="#1f2d3d" text-color="white" active-text-color="#42b983">
                        <el-submenu :index="item.path+'/'+child.path" @mouseover.native="show=true" @mouseout.native="show=false">
                            <template slot="title" style="padding-left: 40px;">{{generateTitle(child.meta.title)}}</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-menu>

                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                            <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
                        </el-menu-item>
                    </router-link>



                </template>



            </el-submenu>

        </template>
    </div>
</template>

<script>
    import {
        generateTitle
    } from '@/utils/i18n'
    export default {
        name: 'SidebarItem',
        props: {
            routes: {
                type: Array
            },
            isNest: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: false
            }
        },
        methods: {
            generateTitle,
            hasOneShowingChildren(children) {
                const showingChildren = children.filter(item => {
                    return !item.hidden
                })
                if (showingChildren.length === 1) {
                    return true
                }
                return false
            },
            out() {
                console.log(1);
            },
            over() {
                console.log(2);
            }
        },
        created() {
            for (const o in this.routes) {
                const obj = this.routes[o]
                if (obj.path.indexOf('myiframe') >= 0) {
                    obj.children[0].path = 'urlPath?src=https://www.baidu.com'
                }
            }
        }
    }
</script>
<style>
    .sub-nest-menu {
        display: none;
    }

    .nest-menu:hover {
        .sub-nest-menu {
            display: none;
        }
    }
</style>
