describe('Página de Comunicação com Hardware - S.M.A.R.T. System', () => {

  
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Hardware/Hardware.html');
  });

  it('Deve exibir os elementos principais da página', () => {
    
    cy.get('h1').should('contain.text', 'Comunicação com Hardware');

   
    cy.get('#connect-button').should('exist').and('contain.text', 'Conectar');


    cy.get('#status').should('exist').and('contain.text', 'Status: Desconectado');
  });
});


//======================================================================================================

describe('Página de Pesquisa - S.M.A.R.T. System', () => {

  // Visita a página de busca antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Busca/Busca.html');
  });

  it('Deve exibir os elementos principais da página de busca', () => {
    // Verifica se o título está presente
    cy.title().should('eq', 'Pesquisa - S.M.A.R.T. System');

    // Verifica se o campo de entrada de pesquisa está presente
    cy.get('#search-input').should('exist').and('have.attr', 'placeholder', 'Digite sua pesquisa...');

    // Verifica se o botão de pesquisa está presente
    cy.get('#search-button').should('exist').and('contain.text', 'Pesquisar');
  });

  it('Deve permitir a entrada de texto na pesquisa', () => {
    // Verifica se é possível digitar no campo de entrada
    cy.get('#search-input').type('Teste de Pesquisa').should('have.value', 'Teste de Pesquisa');
  });

  it('Deve simular um clique no botão de pesquisa', () => {
    // Simula a entrada de texto no campo de pesquisa
    cy.get('#search-input').type('Teste de Pesquisa');

    // Simula o clique no botão de pesquisa
    cy.get('#search-button').click();

    // Aqui você deve adicionar a lógica para verificar o resultado da pesquisa.
    // Isso pode ser uma nova página que aparece ou uma mensagem de resultado, etc.
    // Para o exemplo, vamos supor que a pesquisa deve mostrar um alerta.
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Resultado da pesquisa: Teste de Pesquisa');
    });
  });

});

//===============================================================================================================
describe('Página do Lobby - S.M.A.R.T. System', () => {

  // Visita a página do Lobby antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Lobby/Index.html');
  });

  it('Deve exibir os elementos principais da página do Lobby', () => {
    // Verifica se o título está presente
    cy.title().should('eq', 'S.M.A.R.T. System');

    // Verifica se o logo está presente
    cy.get('img').should('exist').and('have.attr', 'src', '../Img/Logo.jpeg');

    // Verifica se o menu de navegação está presente
    cy.get('nav').should('exist');

    // Verifica se todos os links do menu estão presentes
    cy.get('nav ul li a').should('have.length', 6);
    cy.get('nav ul li a').eq(0).should('have.text', 'Lobby');
    cy.get('nav ul li a').eq(1).should('have.text', 'Login');
    cy.get('nav ul li a').eq(2).should('have.text', 'Postagens');
    cy.get('nav ul li a').eq(3).should('have.text', 'Usuários');
    cy.get('nav ul li a').eq(4).should('have.text', 'Comunicações');
    cy.get('nav ul li a').eq(5).should('have.text', 'Busca');
  });

  it('Deve permitir a navegação para a página de Login', () => {
    // Clica no link de Login
    cy.get('nav ul li a').contains('Login').click();
    
    // Verifica se a URL foi alterada para a página de Login
    cy.url().should('include', '/Login/Login.html');
  });

  it('Deve permitir a navegação para a página de Postagens', () => {
    // Clica no link de Postagens
    cy.get('nav ul li a').contains('Postagens').click();
    
    // Verifica se a URL foi alterada para a página de Postagens
    cy.url().should('include', '/Postagens/Postagens.html');
  });

  // Você pode adicionar testes similares para os outros links de navegação

});

//=====================================================================================

describe('Página de Login - S.M.A.R.T. System', () => {

  // Visita a página de Login antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Login/Login.html');
  });

  it('Deve exibir os elementos principais da página de Login', () => {
    // Verifica se o título está presente
    cy.title().should('eq', 'Login - S.M.A.R.T. System');

    // Verifica se o logo está presente
    cy.get('img').should('exist').and('have.attr', 'src', '../Img/Logo.jpeg');

    // Verifica se o título "Login" está presente
    cy.get('h2').should('have.text', 'Login');

    // Verifica se o formulário de login está presente
    cy.get('#login-form').should('exist');

    // Verifica se os campos de usuário e senha estão presentes
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');

    // Verifica se o botão "Entrar" está presente
    cy.get('button[type="submit"]').should('exist').and('have.text', 'Entrar');

    // Verifica se os links para recuperação de senha e cadastro estão presentes
    cy.contains('Esqueceu sua senha?').should('exist');
    cy.contains('Cadastro').should('exist');
  });

  it('Deve permitir a navegação para a página de recuperação de senha', () => {
    // Clica no link "Esqueceu sua senha?"
    cy.contains('Esqueceu sua senha?').click();
    
    // Verifica se a URL foi alterada para a página de recuperação de senha
    cy.url().should('include', '2StepVerification.html');
  });

  it('Deve permitir a navegação para a página de Cadastro', () => {
    // Clica no link "Cadastro"
    cy.contains('Cadastro').click();
    
    // Verifica se a URL foi alterada para a página de Cadastro
    cy.url().should('include', 'SignUp.html');
  });

  // Adicione um teste para simular o preenchimento do formulário se necessário
  it('Deve permitir o preenchimento do formulário de login', () => {
    // Preenche os campos de usuário e senha
    cy.get('#username').type('testeusuario');
    cy.get('#password').type('testesenha');

    // Verifica se os campos foram preenchidos corretamente
    cy.get('#username').should('have.value', 'testeusuario');
    cy.get('#password').should('have.value', 'testesenha');

    // Simula o envio do formulário
    cy.get('#login-form').submit();

    // Verifica se a página foi alterada (substitua pela URL correta após o login)
    // cy.url().should('include', '/paginaApósLogin.html'); // ajuste conforme necessário
  });
});

//========================================================================================================

describe('Página de Recuperação de Senha - S.M.A.R.T. System', () => {

  // Visita a página de Recuperação de Senha antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Login/2StepVerification.html');
  });

  it('Deve exibir os elementos principais da página de recuperação de senha', () => {
    // Verifica se o título está correto
    cy.title().should('eq', 'Login - S.M.A.R.T. System');

    // Verifica se o logo está presente
    cy.get('img').should('exist').and('have.attr', 'src', '../Img/Logo.jpeg');

    // Verifica se o título "Esqueceu sua Senha?" está presente
    cy.get('h2').should('have.text', 'Esqueceu sua Senha?');

    // Verifica se o formulário está presente
    cy.get('#login-form').should('exist');

    // Verifica se o campo de email está presente
    cy.get('#username').should('exist');

    // Verifica se o botão "Enviar Email" está presente
    cy.get('button[type="submit"]').should('exist').and('have.text', 'Enviar Email');

    // Verifica se os links para Login e Cadastro estão presentes
    cy.contains('Login').should('exist');
    cy.contains('Cadastro').should('exist');
  });

  it('Deve permitir a navegação de volta para a página de Login', () => {
    // Clica no link "Login"
    cy.contains('Login').click();
    
    // Verifica se a URL foi alterada para a página de Login
    cy.url().should('include', 'Login.html');
  });

  it('Deve permitir a navegação para a página de Cadastro', () => {
    // Clica no link "Cadastro"
    cy.contains('Cadastro').click();
    
    // Verifica se a URL foi alterada para a página de Cadastro
    cy.url().should('include', 'SignUp.html');
  });

  it('Deve permitir o preenchimento do formulário de recuperação de senha', () => {
    // Preenche o campo de email
    cy.get('#username').type('teste@exemplo.com');

    // Verifica se o campo foi preenchido corretamente
    cy.get('#username').should('have.value', 'teste@exemplo.com');

    // Simula o envio do formulário
    cy.get('#login-form').submit();

    // Verifica se a página foi alterada (substitua pela URL correta após o envio)
    // cy.url().should('include', '/paginaApósEnvio.html'); // ajuste conforme necessário
  });
});
//========================================================================================

describe('Página de Cadastro - S.M.A.R.T. System', () => {

  // Visita a página de Cadastro antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Login/SignUp.html');
  });

  it('Deve exibir os elementos principais da página de cadastro', () => {
    // Verifica se o título está correto
    cy.title().should('eq', 'Login - S.M.A.R.T. System');

    // Verifica se o logo está presente
    cy.get('img').should('exist').and('have.attr', 'src', '../Img/Logo.jpeg');

    // Verifica se o título "CADASTRO" está presente
    cy.get('h2').should('have.text', 'CADASTRO');

    // Verifica se o formulário está presente
    cy.get('#login-form').should('exist');

    // Verifica se o campo de email está presente
    cy.get('input[name="username"]').first().should('exist');

    // Verifica se o campo de nome de usuário está presente
    cy.get('input[name="username"]').eq(1).should('exist');

    // Verifica se o campo de senha está presente
    cy.get('input[name="password"]').first().should('exist');

    // Verifica se o campo de confirmar senha está presente
    cy.get('input[name="password"]').eq(1).should('exist');

    // Verifica se o campo "Tipo da Conta" está presente
    cy.get('select[name="classe"]').should('exist');

    // Verifica se o botão "Cadastrar-se" está presente
    cy.get('button[type="submit"]').should('exist').and('have.text', 'Cadastrar-se');

    // Verifica se o link para Login está presente
    cy.contains('Já tenho uma Conta').should('exist');
  });

  it('Deve permitir a navegação de volta para a página de Login', () => {
    // Clica no link "Já tenho uma Conta"
    cy.contains('Já tenho uma Conta').click();
    
    // Verifica se a URL foi alterada para a página de Login
    cy.url().should('include', 'Login.html');
  });

  it('Deve permitir o preenchimento do formulário de cadastro', () => {
    // Preenche o campo de email
    cy.get('input[name="username"]').first().type('teste@exemplo.com');

    // Preenche o campo de nome de usuário
    cy.get('input[name="username"]').eq(1).type('usuarioTeste');

    // Preenche o campo de senha
    cy.get('input[name="password"]').first().type('senhaForte123');

    // Preenche o campo de confirmar senha
    cy.get('input[name="password"]').eq(1).type('senhaForte123');

    // Seleciona o tipo de conta
    cy.get('select[name="classe"]').select('Pessoa');

    // Verifica se os campos foram preenchidos corretamente
    cy.get('input[name="username"]').first().should('have.value', 'teste@exemplo.com');
    cy.get('input[name="username"]').eq(1).should('have.value', 'usuarioTeste');
    cy.get('input[name="password"]').first().should('have.value', 'senhaForte123');
    cy.get('input[name="password"]').eq(1).should('have.value', 'senhaForte123');

    // Simula o envio do formulário
    cy.get('#login-form').submit();

    // Verifica se a página foi alterada (substitua pela URL correta após o envio)
    // cy.url().should('include', '/paginaApósCadastro.html'); // ajuste conforme necessário
  });
});


//=================================================================

describe('Página de Postagens - S.M.A.R.T. System', () => {

  // Visita a página de Postagens antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Postagens/Postagens.html');
  });

  it('Deve exibir os elementos principais da página de postagens', () => {
    // Verifica se o título está correto
    cy.title().should('eq', 'Postagens - S.M.A.R.T. System');

    // Verifica se o logo está presente
    cy.get('img').should('exist').and('have.attr', 'src', '../Img/Logo.jpeg');

    // Verifica se o título "Postagens" está presente
    cy.get('h2').should('have.text', 'Postagens');

    // Verifica se a tabela está presente
    cy.get('table').should('exist');

    // Verifica se o cabeçalho da tabela está presente
    cy.get('thead').should('exist');
    cy.get('th').should('have.length', 4);

    // Verifica se o formulário para adicionar postagens está presente
    cy.get('#post-form').should('exist');

    // Verifica se os campos de entrada estão presentes
    cy.get('#posttitle').first().should('have.attr', 'placeholder', 'Título');

    // Verifica se o botão "Adicionar Postagem" está presente
    cy.get('button[type="submit"]').should('exist').and('have.text', 'Adicionar Postagem');
  });


  it('Deve exibir mensagem de erro ao tentar adicionar uma postagem sem preencher os campos', () => {
    // Simula o envio do formulário sem preencher os campos
    cy.get('#post-form').submit();

    // Verifica se nenhum post foi adicionado
    cy.get('#post-table-body').find('tr').should('have.length', 0); // A tabela deve permanecer vazia
  });
});

//========================================================================================================

describe('Página de Usuários - S.M.A.R.T. System', () => {

  // Visita a página de Usuários antes de cada teste
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Usuarios/Usuarios.html');
  });

  it('Deve exibir os elementos principais da página de usuários', () => {
    // Verifica se o título está correto
    cy.title().should('eq', 'Usuários - S.M.A.R.T. System');

    // Verifica se o logo está presente
    cy.get('img').should('exist').and('have.attr', 'src', '../Img/Logo.jpeg');

    // Verifica se o título "Procurar Usuários" está presente
    cy.get('h2').should('have.text', 'Procurar Usuários');

    // Verifica se o formulário de busca está presente
    cy.get('#search-form').should('exist');

    // Verifica se o campo de entrada está presente
    cy.get('#search-input').should('exist').and('have.attr', 'placeholder', 'Digite o nome do usuário');

    // Verifica se o botão "Procurar" está presente
    cy.get('button[type="submit"]').should('exist').and('have.text', 'Procurar');

    // Verifica se a seção de resultados de busca está presente
    cy.get('#search-results').should('exist');
  });

  it('Deve permitir a busca de usuários', () => {
    // Preenche o campo de busca
    cy.get('#search-input').type('Usuário Teste');

    // Simula o envio do formulário
    cy.get('#search-form').submit();

    // Aqui você deve adicionar a lógica para verificar se a busca foi realizada com sucesso.
    // Por exemplo, se há uma resposta ou se a função de busca está funcionando corretamente.
    // Este teste pode variar dependendo de como a busca é implementada no seu script.
    
    // Verifica se a seção de resultados de busca mostra algum resultado (substitua 'Usuário Teste' pelo nome esperado)
    cy.get('#search-results').should('exist'); // Você pode adicionar uma verificação mais específica, se necessário.
  });

  it('Deve exibir mensagem de erro ao buscar sem preencher o campo', () => {
    // Simula o envio do formulário sem preencher o campo
    cy.get('#search-form').submit();

  });
});
