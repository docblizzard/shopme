<template>
    <div class="login-page">
      <form @submit.prevent="register" class="login-form">
        <h2>Make a new account </h2>
        <label for="username">Username:</label>
        <input v-model="formData.username" type="text" id="username" name="username" required>
        
        <label for="email">Email:</label>
        <input v-model="formData.email" type="email" id="email" name="email" required>
  
        <label for="password">Password:</label>
        <input v-model="formData.pwd" type="password" id="password" name="password" required>
  
  
        <button type="submit">Register</button>
      </form>
      <Transition>
        <div v-if="message" class="alert" alert-danger role="alert">
        {{ message }}
        <span @click="closeAlert" class="close-button" aria-label="Close" aria-hidden="true">&times;
        </span>
        </div>
      </Transition>
    </div>
  </template>
  
  <script>
import authService from '@/services/authService';

  export default {
    data() {
      return {
        formData: {
          username: '',
          email: '',
          pwd: ''
        },
        message:''
      };
    },
    methods: {
      async register() {
        try {
          const res = await authService.registerUser(this.formData)
          this.$router.push('/login');
        } catch (error){
          console.log(error.response.data.error)
            this.reset(error.response.data.error)
        }
      },
      reset(errorMessage){
        this.message = errorMessage
        this.formData.pwd = ''
      },
      closeAlert(){
        this.message = ''
      }
    }
  };
  </script>
  
  <style scoped>
  h2 {
  text-align: center;
  margin-bottom: 20px;
}
  .login-page {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  }
  
  .login-form {
    padding: 50px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .login-form label {
    display: block;
    margin-bottom: 8px;
  }
  
  .login-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  
  .login-form button {
    width: 100%;
    padding: 10px;
    background: #050714be;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .login-form button:hover {
    background: #010420d0;
  }

  .alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px 10px 13px;
  color: rgb(91, 0, 0);
  border: 2px solid rgba(146, 76, 98, 0.178);
  border-radius: 3px;
  background-color: rgba(187, 70, 70, 0.211);
  text-align: left;
  margin-right: -10px;
  margin-left: -18px;
  margin-top: 13px;
  box-shadow: 1px 1px 1px rgba(52, 50, 50, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14),
    0px 1px 5px rgba(0, 0, 0, 0.12);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.close-button {
  margin-right: 3px;
  margin-left: 8px;
  margin-bottom: 4px;
  color: rgba(91, 0, 0, 0.592);
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.6em;
}
  </style>