<template>
  <div class="settings-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人设置</span>
        </div>
      </template>
      
      <el-form
        ref="settingsFormRef"
        :model="settingsForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="settingsForm.avatar" :src="settingsForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="settingsForm.username" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="settingsForm.email" />
        </el-form-item>

        <el-form-item label="个人简介" prop="bio">
          <el-input
            v-model="settingsForm.bio"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
          />
        </el-form-item>

        <el-divider>修改密码</el-divider>

        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="settingsForm.oldPassword"
            type="password"
            show-password
            placeholder="请输入原密码"
          />
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="settingsForm.newPassword"
            type="password"
            show-password
            placeholder="请输入新密码"
          />
        </el-form-item>

        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="settingsForm.confirmPassword"
            type="password"
            show-password
            placeholder="请确认新密码"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveSettings" :loading="loading">
            保存设置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const settingsFormRef = ref(null)
const loading = ref(false)

const settingsForm = ref({
  avatar: userStore.userInfo?.avatar || '',
  username: userStore.userInfo?.username || '',
  email: userStore.userInfo?.email || '',
  bio: userStore.userInfo?.bio || '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validatePass = (rule, value, callback) => {
  if (value && value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    if (settingsForm.value.confirmPassword) {
      settingsFormRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value && value !== settingsForm.value.newPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  bio: [
    { max: 200, message: '个人简介不能超过200个字符', trigger: 'blur' }
  ],
  oldPassword: [
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  newPassword: [
    { validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validatePass2, trigger: 'blur' }
  ]
}

const handleAvatarSuccess = (res) => {
  settingsForm.value.avatar = res.url
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('头像只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('头像大小不能超过 2MB!')
    return false
  }
  return true
}

const saveSettings = async () => {
  if (!settingsFormRef.value) return
  
  await settingsFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // TODO: 实现保存设置的逻辑
        await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟API请求
        ElMessage.success('设置已保存')
      } catch (error) {
        ElMessage.error('保��失败')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.settings-view {
  padding: 20px;
}

.card-header {
  font-weight: bold;
}

.avatar-uploader {
  text-align: center;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 178px;
  height: 178px;
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style> 