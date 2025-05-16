<template>
  <div class="container">
    <div class="header">
      <img class="logo" src="Q:\PI S1 2025\PI_S1_2025\public\images\Logo.png" />
      <div class="menu">
        <button class="menu-item" @click="navigateToDashboard">MONITORAMENTO</button>
      </div>
      <div class="profile">
        <div class="profile-info">
          <div class="profile-name">Sônia Campos</div>
          <div class="profile-link">Ver perfil</div>
        </div>
        <div class="profile-circle">
          <img class="profile-image" src="https://placehold.co/51x46" />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="title">Cadastro de vinhedos</div>
      
      <div v-if="message.text" :class="['message', message.type]">
        {{ message.text }}
        <button @click="message.text = ''" class="close-message">×</button>
      </div>
      
      <div class="form-container">
        <div class="form-group">
          <label>Localização:</label>
          <input 
            v-model.number="form.geolocalizacao.latitude" 
            type="number" 
            step="0.000001"
            placeholder="Latitude"
            :disabled="loading.geolocation"
          />
          <input 
            v-model.number="form.geolocalizacao.longitude" 
            type="number" 
            step="0.000001"
            placeholder="Longitude"
            :disabled="loading.geolocation"
          />
          <button 
            @click="getGeolocation"
            :disabled="loading.geolocation"
          >
            {{ loading.geolocation ? 'Obtendo...' : 'Obter Geolocalização' }}
          </button>
        </div>
        
        <div class="form-group">
          <label>Tipo de uva:</label>
          <input 
            v-model.trim="form.tipoUva" 
            placeholder="Ex: Merlot, Cabernet"
            :disabled="loading.submit"
          />
        </div>
        
        <div class="form-group">
          <label>Data de plantio:</label>
          <input 
            v-model="form.dataPlantio" 
            type="date"
            :disabled="loading.submit"
          />
        </div>
        
        <div class="form-group">
          <label>Umidade Relativa (%):</label>
          <input 
            v-model.number="form.umidadeRelativa" 
            type="number"
            step="0.1"
            min="0"
            max="100"
            placeholder="Ex: 75.5"
            :disabled="loading.submit"
          />
        </div>
        
        <button 
          class="submit-button" 
          @click="submitForm"
          :disabled="!isFormValid || loading.submit"
        >
          {{ loading.submit ? 'Cadastrando...' : 'CADASTRAR VINHEDO' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado do formulário
const form = ref({
  tipoUva: '',
  dataPlantio: '',
  umidadeRelativa: '',
  geolocalizacao: {
    latitude: '',
    longitude: ''
  }
});

// Estados de UI
const loading = ref({
  submit: false,
  geolocation: false
});

const message = ref({
  text: '',
  type: 'error'
});

// Computed
const isFormValid = computed(() => {
  return (
    form.value.tipoUva &&
    form.value.dataPlantio &&
    form.value.umidadeRelativa &&
    form.value.geolocalizacao.latitude &&
    form.value.geolocalizacao.longitude
  );
});

// Métodos
const submitForm = async () => {
  loading.value.submit = true;
  message.value.text = '';

  try {
    const response = await axios.post('http://localhost:3000/vinhos/vinhedos', {
      tipoUva: form.value.tipoUva,
      dataPlantio: form.value.dataPlantio,
      umidadeRelativa: form.value.umidadeRelativa,
      geolocalizacao: {
        latitude: form.value.geolocalizacao.latitude,
        longitude: form.value.geolocalizacao.longitude
      }
    });

    showMessage('Vinhedo cadastrado com sucesso!', 'success');
    resetForm();
    
    // Opcional: redirecionar após cadastro
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
    
  } catch (error) {
    console.error('Erro:', error);
    const errorMsg = error.response?.data?.error || 'Erro ao cadastrar vinhedo';
    showMessage(errorMsg, 'error');
  } finally {
    loading.value.submit = false;
  }
};

const getGeolocation = () => {
  if (!navigator.geolocation) {
    showMessage('Geolocalização não suportada pelo navegador', 'error');
    return;
  }

  loading.value.geolocation = true;
  message.value.text = '';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      form.value.geolocalizacao.latitude = position.coords.latitude;
      form.value.geolocalizacao.longitude = position.coords.longitude;
      loading.value.geolocation = false;
    },
    (error) => {
      let errorMessage = 'Erro ao obter localização: ';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += 'Permissão negada pelo usuário';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += 'Localização indisponível';
          break;
        case error.TIMEOUT:
          errorMessage += 'Tempo de espera excedido';
          break;
        default:
          errorMessage += 'Erro desconhecido';
      }
      showMessage(errorMessage, 'error');
      loading.value.geolocation = false;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
};

const showMessage = (text, type = 'error') => {
  message.value = { text, type };
  if (type === 'success') {
    setTimeout(() => message.value.text = '', 3000);
  }
};

const resetForm = () => {
  form.value = {
    tipoUva: '',
    dataPlantio: '',
    umidadeRelativa: '',
    geolocalizacao: {
      latitude: '',
      longitude: ''
    }
  };
};

const navigateToDashboard = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
/* SEUS ESTILOS ORIGINAIS (MANTIDOS EXATAMENTE) */
.container {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: transparent;
}

.header {
  height: 60px;
  background: #00405B;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  width: 106px;
  height: 44px;
}

.menu {
  display: flex;
  gap: 20px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  font-size: 14px;
}

.profile-name {
  font-weight: 500;
}

.profile-link {
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
}

.profile-circle {
  width: 45px;
  height: 45px;
  background: #D9D9D9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 51px;
  height: 46px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #EFEFEF;
  width:100%;
  height: 100%;
}

.title {
  font-size: 40px;
  font-weight: 700;
  color: #002F43;
  margin-bottom: 20px;
  text-align: center;
}

.form-container {
  width: 100%;
  max-width: 824px;
  background: #002F43;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-family: Montserrat;
}

button {
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #EFEFEF;
  color: #00405B;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.submit-button {
  background: #00405B;
  color: white;
  margin-top: 20px;
}

.menu-item{
  color: white;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  cursor: pointer;
  background: none; 
  padding: 0; 
  margin: 0; 
  text-decoration: none;
}

/* Estilos adicionados (sem alterar seus estilos originais) */
.message {
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  max-width: 824px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn 0.3s;
}

.message.error {
  background: #ffebee;
  color: #d32f2f;
}

.message.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.close-message {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 0 0 0 10px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .menu {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .profile {
    margin-top: 10px;
  }

  .title {
    font-size: 30px;
  }

  .form-container {
    padding: 15px;
  }

  input, button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 24px;
  }

  .form-container {
    padding: 10px;
  }

  input, button {
    font-size: 12px;
  }

  .profile-info {
    font-size: 12px;
  }

  .profile-link {
    font-size: 8px;
  }
}
</style>