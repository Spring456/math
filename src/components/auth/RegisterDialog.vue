<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="用户注册"
    width="400px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="rules"
      label-width="80px"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerForm.username"
          placeholder="请输入用户名"
          prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="请输入邮箱"
          prefix-icon="Message"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="Lock"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          placeholder="请确认密码"
          prefix-icon="Lock"
          show-password
        />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="registerForm.userType" placeholder="请选择用户类型">
          <el-option label="学生" value="student" />
          <el-option label="家长" value="parent" />
          <el-option label="教师" value="teacher" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="registerForm.agreement" @change="validateAgreement">
          我已阅读并同意
          <el-button link type="primary" @click="showTerms">
            《用户协议》
          </el-button>
        </el-checkbox>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleRegister">
          注册
        </el-button>
      </div>
      <div class="login-link">
        已有账号？
        <el-button link type="primary" @click="switchToLogin">
          立即登录
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

const emit = defineEmits(['update:visible', 'switch-to-login', 'register-success'])

const userStore = useUserStore()
const registerFormRef = ref(null)
const loading = ref(false)

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: '',
  agreement: false
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerForm.value.confirmPassword !== '') {
      registerFormRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const validateAgreement = (value) => {
  if (!value) {
    ElMessage.warning('请阅读并同意用户协议')
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
  password: [
    { required: true, validator: validatePass, trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ],
  userType: [
    { required: true, message: '请选择用户类型', trigger: 'change' }
  ]
}

const handleClose = () => {
  emit('update:visible', false)
  registerFormRef.value?.resetFields()
  registerForm.value.agreement = false
}

const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  if (!registerForm.value.agreement) {
    ElMessage.warning('请阅读并同意用户协议')
    return
  }
  
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const success = await userStore.register({
          username: registerForm.value.username,
          email: registerForm.value.email,
          password: registerForm.value.password,
          userType: registerForm.value.userType
        })
        
        if (success) {
          handleClose()
          emit('register-success')
        }
      } finally {
        loading.value = false
      }
    }
  })
}

const switchToLogin = () => {
  handleClose()
  emit('switch-to-login')
}

const showTerms = () => {
  ElMessage.info('用户协议功能开发中...')
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

.login-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style> 