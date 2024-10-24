let funcionarios = [];
let pedidos = [];

// Cadastrar Funcionário
document.getElementById('form-funcionario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let nomeFuncionario = document.getElementById('nome-funcionario').value;
    let cpfFuncionario = document.getElementById('cpf-funcionario').value;

    if (cpfFuncionario.length === 11 && nomeFuncionario.trim() !== "") {
        funcionarios.push({ nome: nomeFuncionario, cpf: cpfFuncionario });
        atualizarListaResponsaveis();
        alert('Funcionário cadastrado com sucesso!');
    } else {
        alert('Por favor, preencha os campos corretamente.');
    }
});

// Atualizar Lista de Responsáveis
function atualizarListaResponsaveis() {
    let selectResponsavel = document.getElementById('responsavel-pedido');
    selectResponsavel.innerHTML = '';
    funcionarios.forEach(funcionario => {
        let option = document.createElement('option');
        option.value = funcionario.nome;
        option.textContent = funcionario.nome;
        selectResponsavel.appendChild(option);
    });
}

// Cadastrar Pedido
document.getElementById('form-pedido').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let nomePedido = document.getElementById('nome-pedido').value;
    let descPedido = document.getElementById('desc-pedido').value;
    let responsavelPedido = document.getElementById('responsavel-pedido').value;
    let statusPedido = document.getElementById('status-pedido').value;

    pedidos.push({ nome: nomePedido, descricao: descPedido, responsavel: responsavelPedido, status: statusPedido });
    atualizarListaPedidos();
});

// Atualizar Lista de Pedidos
function atualizarListaPedidos() {
    let tbody = document.getElementById('lista-pedidos').querySelector('tbody');
    tbody.innerHTML = '';
    
    pedidos.forEach(pedido => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${pedido.nome}</td><td>${pedido.descricao}</td><td>${pedido.responsavel}</td><td>${pedido.status}</td>`;
        tbody.appendChild(tr);
    });
}

// Função para salvar funcionários no LocalStorage
function salvarFuncionario(funcionario) {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.push(funcionario);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

// Função para salvar pedidos no LocalStorage
function salvarPedido(pedido) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Função para carregar funcionários no select de responsáveis
function carregarFuncionarios() {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    let selectResponsavel = document.getElementById('responsavel-pedido');
    selectResponsavel.innerHTML = '';
    funcionarios.forEach(funcionario => {
        let option = document.createElement('option');
        option.value = funcionario.nome;
        option.textContent = funcionario.nome;
        selectResponsavel.appendChild(option);
    });
}

// Função para carregar pedidos na tabela
function carregarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let tbody = document.getElementById('lista-pedidos').querySelector('tbody');
    tbody.innerHTML = '';
    pedidos.forEach(pedido => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${pedido.nome}</td><td>${pedido.descricao}</td><td>${pedido.responsavel}</td><td>${pedido.status}</td>`;
        tbody.appendChild(tr);
    });
}

// Adicionando funcionalidade aos formulários
document.getElementById('form-funcionario').addEventListener('submit', function(event) {
    event.preventDefault();
    let nomeFuncionario = document.getElementById('nome-funcionario').value.trim();
    let cpfFuncionario = document.getElementById('cpf-funcionario').value.trim();
    let funcionario = { nome: nomeFuncionario, cpf: cpfFuncionario };
    salvarFuncionario(funcionario);
    carregarFuncionarios(); // Atualiza a lista de responsáveis
    alert('Funcionário cadastrado com sucesso!');
});

document.getElementById('form-pedido').addEventListener('submit', function(event) {
    event.preventDefault();
    let nomePedido = document.getElementById('nome-pedido').value.trim();
    let descPedido = document.getElementById('desc-pedido').value.trim();
    let responsavelPedido = document.getElementById('responsavel-pedido').value;
    let statusPedido = document.getElementById('status-pedido').value;
    let pedido = { nome: nomePedido, descricao: descPedido, responsavel: responsavelPedido, status: statusPedido };
    salvarPedido(pedido);
    carregarPedidos(); // Atualiza a lista de pedidos
    alert('Pedido cadastrado com sucesso!');
});

// Carregar dados ao abrir a página
window.onload = function() {
    carregarFuncionarios();
    carregarPedidos();
};


function filtrarPedidos() {
    let statusSelecionado = document.getElementById('filtro-status').value;
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    
    // Filtra os pedidos conforme o status selecionado
    let pedidosFiltrados = pedidos.filter(pedido => {
        return statusSelecionado === "" || pedido.status === statusSelecionado;
    });

    // Atualiza a exibição da tabela com os pedidos filtrados
    exibirPedidos(pedidosFiltrados);
}

// Função para exibir pedidos em uma tabela
function exibirPedidos(pedidos) {
    let tbody = document.getElementById('lista-pedidos').querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de exibir os novos dados

    pedidos.forEach((pedido, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.nome}</td>
            <td>${pedido.descricao}</td>
            <td>${pedido.responsavel}</td>
            <td>${pedido.status}</td>
            <td>
                <button onclick="alterarStatus(${index}, 'Fazendo')">Fazendo</button>
                <button onclick="alterarStatus(${index}, 'Pronto para entrega')">Pronto</button>
            </td>`;
        tbody.appendChild(tr);
    });
}

function alterarStatus(index, novoStatus) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Atualiza o status do pedido no array
    pedidos[index].status = novoStatus;

    // Salva a mudança no LocalStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Recarrega a lista de pedidos
    carregarPedidos();
}

// Função para carregar todos os pedidos e exibi-los
function carregarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    exibirPedidos(pedidos); // Exibe todos os pedidos
}


// Carregar pedidos ao iniciar a página
window.onload = function() {
    carregarPedidos();
};

// Função para carregar pedidos do LocalStorage
function carregarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    exibirPedidos(pedidos);
}

// Função para exibir pedidos na tabela
function exibirPedidos(pedidos) {
    let tbody = document.getElementById('lista-pedidos').querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo atual

    pedidos.forEach((pedido, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.nome}</td>
            <td>${pedido.descricao || 'N/A'}</td>
            <td>${pedido.responsavel}</td>
            <td>${pedido.status}</td>
            <td>
                <button onclick="alterarStatus(${index}, 'Fazendo')">Fazendo</button>
                <button onclick="alterarStatus(${index}, 'Pronto para entrega')">Pronto</button>
            </td>`;
        tbody.appendChild(tr);
    });
}

// Função para alterar o status de um pedido
function alterarStatus(index, novoStatus) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos[index].status = novoStatus; // Atualiza o status
    localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Salva no LocalStorage
    carregarPedidos(); // Recarrega a tabela
}

function filtrarPedidos() {
    let statusSelecionado = document.getElementById('filtro-status').value;
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    
    // Filtra os pedidos conforme o status selecionado
    let pedidosFiltrados = pedidos.filter(pedido => {
        return statusSelecionado === "" || pedido.status === statusSelecionado;
    });

    // Atualiza a exibição da tabela com os pedidos filtrados
    exibirPedidos(pedidosFiltrados);
}

