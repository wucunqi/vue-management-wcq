<template>
    <div class = "manage">
        <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="50%">
            <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules" >
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="form.realname" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="电话"  prop="tel">
                    <el-input v-model="form.tel" placeholder="请输入电话号码"></el-input>
                </el-form-item>,

                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>

                <!--  -->
                <el-form-item label="住址" prop = "address">
                    <el-cascader size="large" :options="pcTextArr" v-model="form.address" placeholder="请输入住址" @change="handleAddressChange">
                    </el-cascader>
                </el-form-item>

                <el-form-item label="用户类型" prop="role_id" >
                    <!-- 用v-model.number得到的值为数字类型，类似的还有.trim -->
                    <el-select v-model="form.role_id" placeholder="请选择用户类型" @change="handleSelectChange">
                        <el-option v-for="(value,key) in roles" :key="key" :label="value" :value="parseInt(key)"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="工作单位" prop="agency" v-if="form.role_id == 901">
                    <el-select v-model="form.agency_id" placeholder="请选择工作单位">
                        <!-- 非要写成(value,key)不能写成(id,name)、(key,value) -->
                        <el-option v-for="(value,key) in agencies" :key="key" :label="value" :value="parseInt(key)"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addUser">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </span>
        </el-dialog>

        <div class = "manage-header">
            <el-button v-on:click="showDialog">+ 新增</el-button>
        </div>

        <el-table :data="filteredUserTable" style="width: 100%"   stripe width="80">
            <el-table-column prop="serialNumber" label="序号" width="80"></el-table-column>

            <el-table-column prop="role" label="用户类型"
                :filters="[{ text: '系统管理员', value: '系统管理员'}, { text: '工作人员', value: '工作人员'},{ text: '游客', value: '游客'}]"
                :filter-method="filterTag">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.role === '系统管理员' ? 'danger' : (scope.row.role === '工作人员' ? 'primary' : 'success')" disable-transitions>{{scope.row.role}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="username" label="用户名" ></el-table-column>
            <el-table-column prop="realname" label="姓名" ></el-table-column>
            <el-table-column prop = "sex" label = "性别" width="100"></el-table-column>
            <el-table-column prop = "tel" label="电话" ></el-table-column>
            <el-table-column prop = "email" label="邮箱" ></el-table-column>

            <el-table-column >
                <template slot="header" >
                    <el-input
                    v-model="search"
                    size="normal"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button
                    icon="el-icon-delete"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { pcTextArr } from 'element-china-area-data'
import {getRole,getAgency,addUser,getUser,getUserRole} from '../api/index'
    export default {
    name:'UserManagement',
    data() {
      return {
        dialogVisible: false,
        //map对象，key为id，value为name
        roles:{},
        agencies:{},
        form:{
            realname:'',
            tel:'',
            sex:'',
            email:'',
            address:[],
            province:'',
            city:'',
            role_id:'',
            agency_id:'',
        },
        pcTextArr,
        rules:{
            realname:[
                {required:true,message:'请输入姓名',trigger: 'blur'}
            ],
            tel:[
                {required:true,message:'请输入联系电话',trigger: 'blur'},
                { pattern: /^\d{11}$/, message: '电话号码必须为11位数字', trigger: 'blur' }
            ],
            sex:[
                {required:true,message:'请选择性别',trigger: 'blur'}
            ],
            email:[
                {required:true,message:'请输入邮箱地址',trigger: 'blur'},
                {type: 'email', message: '请输入正确的邮箱地址',trigger: 'blur'}
            ],
            address:[
                {required:true,message:'请填写住址',trigger: 'blur'}
            ],
            agency_id:[
                {required:true,message:'请选择工作单位',trigger: 'blur'}
            ],
            role_id:[
                {required:true,message:'请选择用户类型',trigger:'blur'}
            ]
        },
        userTable:[
        ],
        userRole:[
        ],
        selectedFilter:[],
        // search:'',
      }
    },
    computed: {
        userTableWithRole() {
            return this.userTable.map((user) => {
                let ur = this.userRole.find(userrole => userrole.user_id === user.id);
                let role = this.roles[ur.role_id];
                return {
                    ...user,
                    role:role
                }
            })
        },
        filteredUserTable() {
            let filteredData = this.userTableWithRole
            if (this.selectedFilter.length > 0) {
                filteredData = filteredData.filter((row) => {
                    return this.selectedFilter.includes(row.role)
                })
            }
            filteredData.forEach((row, index) => {
                row.serialNumber = index + 1;
            })
            return filteredData
        }
    },
    methods: {
        showDialog(){
            this.dialogVisible = true
            getRole().then((roleBack) =>{
                if(roleBack.data.code === 210){
                    this.roles = roleBack.data.data
                }
                else{
                    this.$message.error(roleBack.data.message)
                }
            })
        },
        handleAddressChange(value){
            [this.form.province,this.form.city] = value
        },
        handleSelectChange(){
            if(this.form.role_id == 901)
                getAgency().then(( agencyBack )=>{
                if(agencyBack.data.code === 210){
                    this.agencies = agencyBack.data.data
                }
                else{
                    this.$message.error(agencyBack.data.message);
                }
                })
        },
        handleClose(){
            this.dialogVisible = false;
            this.$refs.form.resetFields();
        },
        addUser(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    addUser(this.form).then((userBack)=>{
                        if(userBack.data.code == 220){
                            console.log(userBack)
                            this.$message.success(userBack.data.message);
                        }
                        else{
                            this.$message.error(userBack.data.message);
                        }
                    })
                    this.handleClose();
                } 
                else {
                    console.log('表单校验失败');
                }
            })
        },
        cancel(){
            this.dialogVisible = false;
            this.handleClose();
        },
        // 用户选择某个标签过滤时，方法被调用，value时用户选择的过滤器的值，row是当前行的数据对象
        
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        filterTag(value) {
            this.selectedFilter = value
        }
    },
    mounted() {
        Promise.all([
            getUser(),
            getUserRole(),
            getRole()
        ]).then(([usersBack, userRoleBack, roleBack]) => {
            if (usersBack.data.code === 210) {
                this.userTable = usersBack.data.data;
                this.total = this.userTable.length;
            } else {
                this.$message.error(usersBack.data.message);
            }

            if (userRoleBack.data.code === 210) {
                this.userRole = userRoleBack.data.data;
            } else {
                this.$message.error(userRoleBack.data.message);
            }

            if (roleBack.data.code === 210) {
                this.roles = roleBack.data.data;
            } else {
                this.$message.error(roleBack.data.message);
            }
        })
    }
}
</script>
