<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="用户登录"
    width="400px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      label-width="80px"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          prefix-icon="User"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="Lock"
          show-password
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-form-item>
        <div class="form-options">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <el-button link type="primary" @click="forgotPassword">
            忘记密码？
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </div>
      <div class="register-link">
        还没有账号？
        <el-button link type="primary" @click="switchToRegister">
          立即注册
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['update:visible', 'switch-to-register', 'login-success'])

const userStore = useUserStore()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleClose = () => {
  emit('update:visible', false)
  loginFormRef.value?.resetFields()
  loginForm.value.remember = false
}

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const success = await userStore.login({
          username: loginForm.value.username,
          password: loginForm.value.password,
          remember: loginForm.value.remember
        })
        
        if (success) {
          handleClose()
          emit('login-success')
        }
      } finally {
        loading.value = false
      }
    }
  })
}

const switchToRegister = () => {
  handleClose()
  emit('switch-to-register')
}

const forgotPassword = () => {
  ElMessage.info('忘记密码功能开发中...')
}
</script>

<style scoped>
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer {
  text-align: right;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style> 