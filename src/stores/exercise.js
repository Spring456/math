import { defineStore } from 'pinia'

export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    exerciseRecords: JSON.parse(localStorage.getItem('exerciseRecords')) || []
  }),

  getters: {
    // 获取练习记录总数
    totalExercises: (state) => state.exerciseRecords.length,
    
    // 获取正确率
    correctRate: (state) => {
      if (state.exerciseRecords.length === 0) return 0
      const correctCount = state.exerciseRecords.reduce((total, record) => {
        return total + record.correctCount
      }, 0)
      const totalQuestions = state.exerciseRecords.reduce((total, record) => {
        return total + record.totalQuestions
      }, 0)
      return Math.round((correctCount / totalQuestions) * 100)
    }
  },

  actions: {
    // 添加练习记录
    addExerciseRecord(record) {
      const newRecord = {
        ...record,
        id: Date.now(),
        date: new Date().toISOString()
      }
      this.exerciseRecords.unshift(newRecord)
      this.saveToLocalStorage()
    },

    // 保存到本地存储
    saveToLocalStorage() {
      localStorage.setItem('exerciseRecords', JSON.stringify(this.exerciseRecords))
    }
  }
}) 