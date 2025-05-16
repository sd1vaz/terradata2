<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Estados reativos para os campos do formulário
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// Função para validar se as senhas coincidem
const validatePassword = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem.';
    return false;
  }
  errorMessage.value = '';
  return true;
};

// Função para enviar os dados do formulário
const submitForm = async () => {
  if (!validatePassword()) {
    return;
  }

  const userData = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await axios.post('http://localhost:3000/cadastroUsuarios', userData);
    console.log('Usuário cadastrado com sucesso:', response.data);
    // Limpar o formulário após o envio bem-sucedido
    username.value = '';
    password.value = '';
    confirmPassword.value = '';
    errorMessage.value = '';
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    errorMessage.value = 'Erro ao cadastrar usuário. Tente novamente.';
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="left-section">
        <img src="Q:\PI S1 2025\PI_S1_2025\public\images\Logo.png" alt="Logo" class="logo" />
        <h2 class="welcome-text">Bem-vindo <br />de volta!</h2>
        <p class="login-text">Faça login e acompanhe os dados mais recentes!</p>
        <div class="login-button" @click="submitForm">
          <span>ENTRAR</span>
        </div>
        <p class="forgot-password">Esqueci minha senha!</p>
      </div>
      <div class="right-section">
        <h2 class="register-text">Crie seu cadastro!</h2>
        <div class="input-group">
          <div class="input-icon">
            <img src="Q:\PI S1 2025\PI_S1_2025\public\images\material-symbols_id-card-outline (1).png" alt="">
          </div>
          <input v-model="username" placeholder="Nome de usuário" />
        </div>
        <div class="input-group">
          <div class="input-icon">
            <img src="Q:\PI S1 2025\PI_S1_2025\public\images\qlementine-icons_password-16.png" alt="">
          </div>
          <input v-model="password" type="password" placeholder="Senha" />
        </div>
        <div class="input-group">
          <div class="input-icon">
            <img src="Q:\PI S1 2025\PI_S1_2025\public\images\material-symbols_id-card-outline (1).png" alt="">
          </div>
          <input v-model="confirmPassword" type="password" placeholder="Confirme a senha" />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="register-button" @click="submitForm">
          <span>CADASTRAR</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 533px;
  position: relative;
  background: white ;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
}

.card {
  width: 992px;
  height: 533px;
  background:transparent;
  box-shadow: 5px 9px 10px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  display: flex;
  overflow: hidden;
}

.left-section {
  width: 320px;
  height: 100%;
  background: #00405B;
  border-radius: 18px 0 0 18px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.right-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 216px;
  height: 88px;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 10px;
  color: #E1E1E1;
  line-height: 1.2;
}

.login-text {
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 20px;
  color: white;
}

.login-button {
  width: 216px;
  height: 48px;
  background: #E1E1E1;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00405B;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
}

.forgot-password {
  font-size: 10px;
  font-weight: 300;
  cursor: pointer;
  color: white;
}

.register-text {
  font-size: 34px;
  font-weight: 700;
  color: #00405B;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  width: 488px;
  height: 60px;
  background: #EFEFEF;
  box-shadow: -3px 4px 10px rgba(0, 0, 0, 0.12) inset;
  border-radius: 26px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
}

.input-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 16px;
  height: 16px;
  background: rgba(114.66, 138.64, 148.75, 0.87);
}

input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 400;
  color: rgba(114.66, 138.64, 148.75, 0.87);
  outline: none;
}

input::placeholder {
  color: rgba(114.66, 138.64, 148.75, 0.87);
}

.register-button {
  width: 216px;
  height: 48px;
  background: #00405B;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EFEFEF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>