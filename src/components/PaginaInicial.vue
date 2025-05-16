<template>
  <div class="container">
    <div class="login-box">
      <div class="login-form">
        <div class="login-header">Login</div>
        <div class="input-container">
          <div class="input-icon">
            <img src="Q:\PI S1 2025\PI_S1_2025\public\images\material-symbols_id-card-outline (1).png" alt="">
          </div>
          <input type="text" placeholder="N° do crachá" class="input-field" />
        </div>
        <div class="input-container">
          <div class="input-icon">
              <img src="Q:\PI S1 2025\PI_S1_2025\public\images\qlementine-icons_password-16.png" alt="">
          </div>
          <input type="password" placeholder="Senha" class="input-field" />
        </div>
        <button class="login-button" @click="tadalafila2">Entrar</button>
        <button class="forgot-password" @click="RecoverPassword">Cadastro</button>
      </div>
      <div class="login-image">
        <img src="Q:\PI S1 2025\PI_S1_2025\public\images\vertical-shot-person-holding-glass-wine-vineyard-sunlight 1.png"  />
        <img src="Q:\PI S1 2025\PI_S1_2025\public\images\Logo.png" alt="Logo" class="logo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const showbutton = ref(true);

async function RecoverPassword() 
{
  router.push('/cadastroUsuarios');
}

async function tadalafila2() 
{
  router.push('/dashboard');
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #00405B;
}

.login-box {
  width: 992px;
  height: 533px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 5px 9px 10px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  display: flex;
}

.login-form {
  width: 504px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-header {
  color: #00405B;
  font-size: 34px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.input-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.icon {
  width: 20px;
  height: 16px;
  background: rgba(114.66, 138.64, 148.75, 0.87);
}

.input-field {
  width: 100%;
  height: 60px;
  padding-left: 40px;
  background: #EFEFEF;
  box-shadow: -3px 4px 10px rgba(0, 0, 0, 0.12) inset;
  border-radius: 26px;
  border: none;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: rgba(114.66, 138.64, 148.75, 0.87);
}

.login-button {
  width: 216px;
  height: 48px;
  background: #00405B;
  border-radius: 30px;
  border: none;
  color: #EFEFEF;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
}

.forgot-password {
  color: #00405B;
  font-size: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  margin-top: 10px;
  border-radius: 18px;
}

.login-image {
  width: 320px;
  height: 533px;
  background: #00405B;
  border-radius: 18px;
  position: relative;
}

/* .login-image img {
  width: 100%;
  height: 100%;
  border-radius: 18px;
} */

.logo {
  width: 152px;
  height: 62px;
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
}
</style>