async function carregarDados() {
  try {
    const resposta = await fetch('data.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    const dados = await resposta.json();

    document.getElementById('student-name').textContent = dados.aluna.nome + ".";
    document.getElementById('student-name-small').textContent = dados.aluna.nome;
    document.getElementById('student-level').textContent = dados.aluna.nivel;
    document.getElementById('student-goal').textContent = dados.aluna.objetivo;

    document.getElementById('next-class-title').textContent = dados.proxima_aula.tema;
    document.getElementById('next-class-date').textContent = dados.proxima_aula.data;
    document.getElementById('next-class-time').textContent = dados.proxima_aula.hora;

    document.getElementById('teacher-note').textContent = "“" + dados.recado + "”";

    if (dados.historico) {
      const historico = document.getElementById('historico');
      dados.historico.forEach(function(aula) {
        const item = document.createElement('div');
        item.className = 'historico-item card';
        item.innerHTML =
          '<div class="historico-data">' + aula.data + '</div>' +
          '<div class="historico-tema">' + aula.tema + '</div>' +
          '<p class="historico-obs">' + aula.observacao + '</p>';
        historico.appendChild(item);
      });
    }

    if (dados.vocabulario) {
      const lista = document.getElementById('lista-vocabulario');
      dados.vocabulario.forEach(function(item) {
        const card = document.createElement('div');
        card.className = 'vocab-card card';
        card.innerHTML =
          '<div class="vocab-palavra">' + item.palavra + '</div>' +
          '<div class="vocab-traducao">' + item.traducao + '</div>' +
          '<p class="vocab-exemplo">' + item.exemplo + '</p>' +
          '<div class="vocab-aula">' + item.aula + '</div>';
        lista.appendChild(card);
      });
    }

    const hoje = new Date();
    document.getElementById('today').textContent = hoje.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

  } catch (erro) {
    console.error('Erro ao carregar dados:', erro);
  }
}

document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(function(l) {
      l.classList.remove('active');
    });
    link.classList.add('active');

    const alvo = link.getAttribute('data-view');
    document.getElementById('view-painel').hidden = (alvo !== 'painel');
    document.getElementById('view-vocabulario').hidden = (alvo !== 'vocabulario');
  });
});

carregarDados();
