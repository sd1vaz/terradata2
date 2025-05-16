<template>
  <div class="container">
    <div class="header">
      <img class="logo" src="Q:\PI S1 2025\PI_S1_2025\public\images\Logo.png" alt="Logo" />
      <div class="menu">
        <button class="menu-item" @click="MudaPagina">Cadastro de Vinhedos</button>
      </div>
      <div class="user-profile">
        <div class="user-info">
          <div class="user-name">Sônia Campos</div>
          <div class="user-link">Ver perfil</div>
        </div>
        <img class="user-avatar" src="https://placehold.co/51x46" alt="User Avatar" />
      </div>
    </div>

    <div class="title">MONITORAMENTO DE VINHEDOS</div>

    <div v-if="loading" class="loading-message">CARREGANDO VINHEDOS...</div>
    <div v-else-if="error" class="error-message">{{ error.toUpperCase() }}</div>
    <div v-else class="vineyard-list">
      <div class="vineyard-card" v-for="vineyard in vineyards" :key="vineyard.id">
        <div class="vineyard-image">
          <img :src="getVineyardImage(vineyard)" :alt="'VINHEDO ' + vineyard.id" />
        </div>
        <div class="vineyard-details">
          <div class="vineyard-header">
            <div class="vineyard-name">{{ formatVineyardName(vineyard) }}</div>
            <button class="delete-button" @click="confirmDelete(vineyard.id)">
              <span class="delete-icon">×</span>
            </button>
          </div>
          <div class="vineyard-info">LOCALIZAÇÃO: {{ vineyard.latitude }}, {{ vineyard.longitude }}</div>
          <div class="vineyard-info">UMIDADE: {{ vineyard.umidadeRelativa }}%</div>
          <button class="edit-button" @click="editVineyard(vineyard.id)">
            MODIFICAR VINHEDO
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const vineyards = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    const defaultVineyardImage = '/images/default-vineyard.png';

    const fetchVineyards = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vinhos/vinhedos');
        vineyards.value = response.data;
      } catch (err) {
        console.error('Erro ao buscar vinhedos:', err);
        error.value = 'Erro ao carregar vinhedos. Tente novamente mais tarde.';
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    };

    const formatVineyardName = (vineyard) => {
      return `${vineyard.tipoUva.toUpperCase()} : ${formatDate(vineyard.dataPlantio)}`;
    };

    const getVineyardImage = (vineyard) => {
      return vineyard.imagemPath 
        ? `http://localhost:3000/uploads/${vineyard.imagemPath}`
        : defaultVineyardImage;
    };

    const deleteVineyard = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/vinhos/vinhedos/${id}`);
        vineyards.value = vineyards.value.filter(v => v.id !== id);
      } catch (err) {
        console.error('Erro ao deletar vinhedo:', err);
        error.value = 'Erro ao deletar vinhedo. Tente novamente.';
      }
    };

    const editVineyard = (id) => {
      router.push(`/editar-vinhedo/${id}`);
    };

    const confirmDelete = (id) => {
      if (confirm('TEM CERTEZA QUE DESEJA EXCLUIR ESTE VINHEDO?')) {
        deleteVineyard(id);
      }
    };

    const MudaPagina = () => {
      router.push('/cadastroVinhedos');
    };

    onMounted(fetchVineyards);

    return {
      vineyards,
      loading,
      error,
      MudaPagina,
      formatDate,
      formatVineyardName,
      getVineyardImage,
      confirmDelete,
      editVineyard
    };
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efefef;
}

.header {
  width: 100%;
  background: #00405b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  width: 106px;
  height: 44px;
}

.menu {
  display: flex;
  gap: 20px;
}

.menu-item {
  color: white;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  cursor: pointer;
  background: none; 
  padding: 0; 
  margin: 0; 
  text-decoration: none;
  border: 0ch;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  text-align: right;
}

.user-name {
  color: white;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
}

.user-link {
  color: white;
  font-size: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  cursor: pointer;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 9999px;
}

.title {
  text-align: center;
  color: #00405b;
  font-size: 40px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  margin-top: 100px;
}

.vineyard-list {
  height: 50%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.vineyard-card {
  height: 300px;
  background: #00405b;
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  overflow: hidden;
}

.vineyard-image {
  width: 236px;
  background: #d9d9d9;
  box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.1);
}

.vineyard-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vineyard-details {
  flex: 1;
  padding: 20px;
  color: white;
  font-family: "Montserrat", sans-serif;
}

.vineyard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.vineyard-name {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.vineyard-info {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
}

.edit-button {
  width: 180px;
  height: 32px;
  background: #e1e1e1;
  border-radius: 30px;
  color: #00405b;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;
}

.edit-button:hover {
  background: #00405b;
  color: white;
  border: 1px solid white;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.loading-message {
  color: #00405b;
}

.error-message {
  color: #d32f2f;
}

.delete-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.delete-icon {
  display: block;
  line-height: 1;
  margin-top: -2px;
}

@media (max-width: 768px) {
  .vineyard-card {
    flex-direction: column;
    height: auto;
  }
  
  .vineyard-image {
    width: 100%;
    height: 150px;
  }
  
  .vineyard-name {
    max-width: 150px;
  }
  
  .edit-button {
    width: 160px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 32px;
    margin-top: 80px;
  }
  
  .vineyard-list {
    padding: 10px;
  }
  
  .edit-button {
    width: 140px;
    font-size: 11px;
  }
}
</style>