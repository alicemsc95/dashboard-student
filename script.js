async function carregarDados() {
  const resposta = await fetch('data.json');
  const dados = await resposta.json();

  document.getElementById('student-name').textContent = dados.aluna.nome + ".";
  document.getElementById('student-name-small').textContent = dados.aluna.nome;
  document.getElementById('student-level').textContent = dados.aluna.nivel;
  document.getElementById('student-goal').textContent = dados.aluna.objetivo;

  document.getElementById('next-class-title').textContent = dados.proxima_aula.tema;
  document.getElementById('next-class-date').textContent = dados.proxima_aula.data;
  document.getElementById('next-class-time').textContent = dados.proxima_aula.hora;

  document.getElementById('teacher-note').textContent = "“" + dados.recado + "”";

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

  const hoje = new Date();
  document.getElementById('today').textContent = hoje.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

carregarDados();
