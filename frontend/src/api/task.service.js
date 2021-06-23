import API_URL from './config.js'

export const taskService = {
  async getTasks() {
    let response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async addTask(payload) {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async editTask(payload) {
    const response = await fetch(`${API_URL}/tasks/${payload._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async removeTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }

};

function handleResponses(code) {
  let message = ""
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!"
      break;
    default:
      message = "Mensagem desconhecida"
      break;
  }
  return message
}

export default taskService;
