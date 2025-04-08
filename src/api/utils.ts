import { AxiosError } from "axios";

export function getErrorMessage(error: AxiosError<AxiosError>): string {
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return "A requisição demorou muito para responder (timeout). Verifique sua conexão e tente novamente.";
    }
    return "Erro de rede. Não foi possível conectar ao servidor. Verifique sua conexão ou se o serviço está online.";
  }

  const status = error.response.status;

  switch (status) {
    case 400: // Bad Request
      return "Dados inválidos: Verifique as informações fornecidas.";
    case 401: // Unauthorized
      return "Não autorizado. Sua sessão pode ter expirado, tente fazer login novamente.";
    case 403: // Forbidden
      return "Acesso negado. Você não tem permissão para realizar esta operação.";
    case 404: // Not Found
      return `Não encontrado. Verifique os dados.`;
    case 409: // Conflict
      return `Conflito ao salvar: Já existe um registro com estes dados ou houve um conflito de estado.`;
    case 422: // Unprocessable Entity (FastAPI usa para erros de validação)
      return `Erro de validação: Os dados enviados são inválidos.`;
    case 500: // Internal Server Error
      return "Ocorreu um erro inesperado no servidor. Por favor, tente novamente mais tarde.";
    case 502: // Bad Gateway
    case 503: // Service Unavailable
    case 504: // Gateway Timeout
      return "O serviço está temporariamente indisponível. Por favor, tente novamente em alguns instantes.";
    default:
      return `Ocorreu um erro desconhecido. Tente novamente mais tarde.`;
  }
}