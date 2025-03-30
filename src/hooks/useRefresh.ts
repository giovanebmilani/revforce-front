const API_BASE_URL = "http://localhost:8000"; // REVISAR URL 

function useRefresh () {

    const fetchNextRefreshTime = async () => {
        try{
            const response = await fetch(`${API_BASE_URL}/refresh-time`); // REVISAR ENDPOINT
            if (!response.ok) {
                throw new Error('Erro ao buscar o tempo de atualização de dados');
            }

            const data = await response.json();

            // o que fazer com os dados recebidos??
            return data.refresh_time; // ou o que for necessário
        }catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    const triggerRefresh = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/refresh`, {method: 'POST'}); // REVISAR ENDPOINT
            if(!response.ok){
                throw new Error('Erro ao acionar a atualização de dados');
            }

            const data = await response.json();

            // o que fazer com os dados recebidos??
            return data; // ou o que for necessário
        }catch(error){
            console.error('Erro:', error);
            return null;
        }
    }

    return null;
}

export default useRefresh;