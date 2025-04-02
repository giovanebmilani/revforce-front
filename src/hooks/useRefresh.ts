import { get } from "http";

const API_BASE_URL = "http://localhost:8000"; // REVISAR URL 

function useRefresh ({id}: {id: string}) {

    const fetchNextRefreshTime = async () => {
        try{
            const response = await fetch(`${API_BASE_URL}/refresh/:${id}`, {method: 'GET'}); // REVISAR ID
            if (!response.ok) {
                throw new Error('Erro ao buscar o próximo tempo de atualização de dados');
            }

            const data = await response.json();

            if (!data || !data.refresh_time) {
                throw new Error('Tempo de atualização não encontrado');
            }

            return data.refresh_time;

        }catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    const triggerRefresh = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/refresh`, {method: 'POST', body: `${id}`}); // REVISAR ID
            if(!response.ok){
                throw new Error('Erro ao atualizar dados');
            }

        }catch(error){
            console.error('Erro:', error);
            return null;
        }
    }

    return null;
}

export default useRefresh;