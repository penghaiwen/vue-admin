<template>
    <section class="app-container">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
                <el-form-item style="float: right;">
                    <el-button type="success" @click="handleClickAdd(0,'',1)">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="title" label="菜单名称">
            </el-table-column>
            <el-table-column prop="name" label="菜单标识">
            </el-table-column>
            <el-table-column prop="path" label="访问路径">
            </el-table-column>
            <el-table-column prop="component" label="前端组件">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
            </el-table-column>
            <el-table-column prop="menuLevel" label="菜单类型">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.menuLevel === 1">目录</el-tag>
                    <el-tag v-if="scope.row.menuLevel === 2" type="success">菜单</el-tag>
                    <el-tag v-if="scope.row.menuLevel === 3" type="warning">权限</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="hidden" label="是否显示">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.hidden">显示</el-tag>
                    <el-tag type="warning" v-else>隐藏</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="noCache" label="是否缓存">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.noCache">缓存</el-tag>
                    <el-tag v-else>重新加载</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="success" icon="el-icon-plus" size="small" circle @click.stop="handleClickAdd(scope.row.id,scope.row.title,scope.row.menuLevel===1?2:3)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" size="small" circle @click.stop="handleClickEdit(scope.row,scope.row.menuLevel===1?2:3)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" circle @click.stop="handleClickDel(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="600px">
            <el-form :model="form" label-width="150px" :rules="rules" ref="form">
                <el-form-item label="菜单名称" prop="title">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" v-if="form.menuLevel === 1">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="菜单标识" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="访问路径" prop="path" v-if="form.menuLevel === 2">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item label="前端组件" prop="component" v-if="form.menuLevel === 2">
                    <el-input v-model="form.component"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" v-if="form.menuLevel === 2">
                    <el-switch v-model="form.hidden" active-text="是" inactive-text="否">
                    </el-switch>
                </el-form-item>
                <el-form-item label="是否缓存" v-if="form.menuLevel === 2">
                    <el-switch v-model="form.noCache" active-text="切换页面刷新" inactive-text="切换页面不刷新">
                    </el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    export default {
        data() {
            return {

                tableData: [{
                    id: 637,
                    title: "平台管理",
                    name: "system",
                    path: "/system",
                    component: "Layout",
                    icon: "menu-xitong",
                    menuLevel: 1,
                    noCache: false,
                    hidden: false,
                    sort: 1,
                    children: [{
                        id: 638,
                        title: "菜单管理",
                        name: "menu",
                        path: "/system/menu",
                        component: "system/menu",
                        icon: "menu-xitong",
                        menuLevel: 2,
                        sort: 1,
                        noCache: true,
                        hidden: true,
                        children: [{
                            id: 640,
                            title: "新增",
                            name: "add",
                            path: "",
                            component: "",
                            icon: "",
                            menuLevel: 3,
                            sort: 1,
                            noCache: '',
                            hidden: '',
                        }]
                    }, {
                        id: 639,
                        title: "字典管理",
                        name: "dict",
                        path: "/system/dict",
                        component: "system/dict",
                        icon: "menu-xitong",
                        menuLevel: 2,
                        sort: 2,
                        noCache: false,
                        hidden: false,
                    }]
                }],
                title: '新增信息',
                dialogFormVisible: false,
                form: {
                    id: '',
                    title: '',
                    name: '',
                    path: '',
                    component: '',
                    parentId: 0,
                    parentTitel: '',
                    icon: '',
                    menuLevel: 1,
                    noCache: false,
                    hidden: false,
                    sort: 1,
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    }],
                    name: [{
                        required: true,
                        message: '请输入菜单标识',
                        trigger: 'blur'
                    }],
                    path: [{
                        required: true,
                        message: '请输入访问路径',
                        trigger: 'blur'
                    }],
                    component: [{
                        required: true,
                        message: '请输入前端组件',
                        trigger: 'blur'
                    }],
                    sort: [{
                        required: true,
                        message: '请输入菜单排序',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                console.log('获取');
            },
            setTitle(level, isAdd) {
                if (level === 1) {
                    this.title = isAdd ? '新增目录' : '编辑目录';
                } else if (level === 2) {
                    this.title = isAdd ? '新增菜单' : '编辑菜单';
                } else if (level === 3) {
                    this.title = isAdd ? '新增权限' : '编辑权限';
                }
                this.dialogFormVisible = true;
            },

            handleClickAdd(parentId,parentTitel, level) {
                this.form= {
                    id: '',
                    title: '',
                    name: '',
                    path: '',
                    component: '',
                    parentId: parentId,
                    parentTitel: parentTitel,
                    icon: '',
                    menuLevel: level,
                    noCache: false,
                    hidden: false,
                    sort: 1,
                }
                this.form.menuLevel = level;
                this.setTitle(level, true);

            },
            handleClickEdit(row) {
                this.form = Object.assign({}, row);
                this.setTitle(row.menuLevel, false);
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleClickDel(id) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

        },
    }
</script>
