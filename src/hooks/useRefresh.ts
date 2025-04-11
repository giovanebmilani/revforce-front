const API_BASE_URL = import.meta.env.VITE_API_URL;

function useRefresh ({account_id}: {account_id: string}) {

    


    const fetchNextRefreshTime = async () => {
        try{
            const response = await fetch(`${API_BASE_URL}/refresh/${account_id}`, {method: 'GET'}); // REVISAR ID
            if (!response.ok) {
                throw new Error('Erro ao buscar o próximo tempo de atualização de dados');
            }

            const data = await response.json();

            if (!data.next_refresh_time) {
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
            const response = await fetch(`${API_BASE_URL}/refresh`, {method: 'POST', body: `${account_id}`}); // REVISAR ID
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