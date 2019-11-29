<template>
    <section class="app-container">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="query" @submit.native.prevent>
                <el-form-item>
                    <el-input v-model="query.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getPageList()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearQuery">清空</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <div style="">
            <el-table :data="pageList" highlight-current-row style="width: 100%;" max-height="600">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="120">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="120">
                </el-table-column>
                <el-table-column prop="birth" label="生日" width="120">
                </el-table-column>
                <el-table-column prop="addr" label="地址" min-width="160">
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination :total="total" :page.sync="query.current" :limit.sync="query.size" @pagination="getPageList" />

        </div>

        <!--编辑界面-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="800px">
            <el-form :model="form" label-width="150px" :rules="formRules" ref="form">
                <div class="row-input">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.age" :min="0" :max="200"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="onSubmit">立即保存</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getUserListPage
    } from '@/api/userTable'

    export default {
        data() {
            return {
                dialogFormVisible: false, // 新增编辑弹窗
                dialogTitle: '', // 弹窗标题
                query: { // 查询条件
                    name: '',
                    size: 10,
                    current: 1
                },
                pageList: [], // 分页数据
                total: 0, // 数据总数
                form: { // 表单数据
                    id: '0',
                    name: '',
                    sex: 1
                },
                formRules: { // 表单验证
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur' // change
                    }]
                }
            }
        },
        mounted() {
            this.getPageList()
        },
        methods: {
            // 清除查询条件
            clearQuery() {

            },

            // 获取用户列表
            async getPageList() {
                let res = await getUserListPage(this.query);
                console.log(res);
                this.total = res.data.total;
                this.pageList = res.data.users;
            },
            // 显示新增界面
            handleAdd() {
                this.dialogTitle = '新增'
                this.dialogFormVisible = true
                this.form = {
                    id: '0',
                    name: '',
                    sex: 1

                }
            },
            // 显示编辑界面
            handleEdit(index, row) {
                this.dialogTitle = '修改'
                this.dialogFormVisible = true
                this.form = Object.assign({}, row)
            },
            // 删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        const para = {
                            id: row.id
                        }

                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getPageList();

                    })
                    .catch(() => {})
            },


            // 提交
            onSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {})
                            .then(() => {

                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                })
                                this.$refs['form'].resetFields()
                                this.dialogFormVisible = false
                                this.getPageList();

                            })
                            .catch(e => {
                                // 打印一下错误
                                console.log(e)
                            })
                    }
                })
            },

        },

    }
</script>

<style scoped>

</style>
