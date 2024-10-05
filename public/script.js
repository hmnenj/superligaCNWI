//index.html
function updateCountdown() { //Função para contaegm regressiva
    const targetDate = new Date('2024-10-19T00:00:00').getTime(); // Definindo data final
    const now = new Date().getTime(); //Pegando data e hora atual
    const difference = targetDate - now; //Calculando a diferença da data final e a data atual

    //Convertendo a diferença para dias, horas, mimutos e segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    ///Atualizando o conteudo do id para exibir p tempo
    document.getElementById("countdown").innerHTML =
        `${days}D ${hours}H ${minutes}M ${seconds}S`;

    //Se a diferença for menor que 0 exibir a mensagem
    if (difference < 0) {
        document.getElementById("countdown").innerHTML = "Superliga de Volei Feminina Chegou!";
    }
}
setInterval(updateCountdown, 1000); //A função deve ser executada a cada 1 segundo



let comentarios = JSON.parse(localStorage.getItem('comentarios')) || []; // Carrega os comentarios armazenados

const listaComentarios = document.getElementById('listaComentarios'); //Pega a referencia do id no HTML

function atualizarListaComentarios() { //Função para atualizar a lista na pagina

    //Cria uma li para cada item
    //Cria um botao para editar e apagar o comentario chamando as suas respectivas funções
    listaComentarios.innerHTML = comentarios.map((comentario, index) => `
    <li>
      <span>${comentario}</span>
      <button onclick="editarComentario(${index})">Editar</button>
      <button onclick="apagarComentario(${index})">Apagar</button>
    </li>
  `).join(''); //Converte o array de strings gerado pelo map em uma so string HTML
}

document.getElementById('comentarioForm').addEventListener('submit', function (event) {
    event.preventDefault(); //Impede o recarregamento da pagina

    const comentario = document.getElementById('comentario').value; //Pega o dado enviado pelo usuario
    comentarios.push(comentario); //Adiciona no array comentario
    localStorage.setItem('comentarios', JSON.stringify(comentarios)); //Salva o array no localStrorage e converte para JSON

    atualizarListaComentarios(); //Atualiza a lista na pagina
    document.getElementById('comentario').value = ''; //Limpa o campo de entrada
});

function editarComentario(index) { //Função para editar o comentario
    const novoComentario = prompt('Edite seu comentário:', comentarios[index]); //Exibe um prompt para editar 
    if (novoComentario) {
        comentarios[index] = novoComentario;
        localStorage.setItem('comentarios', JSON.stringify(comentarios)); //Se recebeu um novo valor substitui o antigo
        atualizarListaComentarios(); //Atualiza a lista
    }
}

function apagarComentario(index) { //Função para apagar o comentario
    if (confirm('Tem certeza de que deseja apagar este comentário?')) { //Confirma se o comentario deve ser apagado
        comentarios.splice(index, 1); //Remove o comentario do array pela posição do index
        localStorage.setItem('comentarios', JSON.stringify(comentarios)); //Atualiza o localStorage sem o comentario apagado
        atualizarListaComentarios(); //Atualiza a lista
    }
}

atualizarListaComentarios(); //Chama a função para exibir os comenarios quando a pagina é carregada

