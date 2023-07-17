import Mock from 'mockjs'
// 数据
import homeApi from './mockServerData/home'
// import user from './mockServerData/user'
import permission from './mockServerData/permission'

// Mock.mock('https://127.0.0.1:2008/home/getData','get',function(){
//     console.log('ok')
//     return []
// })

Mock.mock('https://localhost/home/getData','get',homeApi.getStatisticalData)

// Mock.mock('https://127.0.0.1:2008/user/add','post',user.createUser)
// Mock.mock('https://127.0.0.1:2008/user/edit','post',user.updateUser)
// Mock.mock('https://127.0.0.1:2008/user/del','post',user.deleteUser)
// Mock.mock('https://127.0.0.1:2008/user/get','post',user.getUserList)

Mock.mock('https://localhost/login','post',permission.getMenu)