document.addEventListener("DOMContentLoaded", () => {

    var countCerto = 0;
    var countErrado = 0;
    var atualPalavraIndex = 0;
    let palavraAtual;
    
    var itens = JSON.parse(window.localStorage.getItem("storedArray"));
    
    //! Se não tiver nada no localStorage, o array será definido a seguir:
    if(!itens) {
        var vetor = ["panda", "cachorro", "leopardo", "coala", "baleia", "corvo", "gato", "tigre", "coelho", "ovelha"];
    } else {
        var vetor = itens;
    }

    iniciarLocalStorage();

    palavraAtual = vetor[atualPalavraIndex];

    var progresso = document.getElementById("progresso");
    definirProgresso(progresso);

    criarQuadrados();
    adicionarKeyboardClicks();
    iniciarPalavrasModal();
    iniciarHelpModal();    

    function iniciarLocalStorage() {
        const storedAtualPalavra = window.localStorage.getItem("atualPalavraIndex");
        if (!storedAtualPalavra || Number(storedAtualPalavra) === vetor.length) {
            window.localStorage.setItem("atualPalavraIndex", atualPalavraIndex);
        } else {
            atualPalavraIndex = Number(storedAtualPalavra);
            palavraAtual = vetor[atualPalavraIndex];
        }
    }

    function atualizarPalavraIndex() {
        
        window.localStorage.setItem("atualPalavraIndex", atualPalavraIndex + 1);
    }

    function definirProgresso(progresso) {
        var max = vetor.length;
        var index = window.localStorage.getItem("atualPalavraIndex");
        progresso.innerHTML = "<progress value='"+index+"' max='"+max+"'></progress>"
    }

    function criarQuadrados() {
        const gameBoard = document.getElementById("board");

        for (let i = 0; i < palavraAtual.length; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            //square.classList.add("animate__animated");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }
    }

    function PalavraCorreta(letra) {

        //countCerto = countCerto + 1;

        TecladoVerde(letra);

        const titulo = document.querySelector(".title");
        
        titulo.textContent = "Certo";

        if(countCerto === palavraAtual.length) {

            const titulo = document.querySelector(".title");
            titulo.textContent = "Correto!";
            //titulo.classList.add("color-black");

            if(countErrado === 0) {
                titulo.textContent = "De primeira!";
            }

            if(countErrado === 1) {
                titulo.textContent = "Muito bem!";
            }

            if(countErrado === 2) {
                titulo.textContent = "Parabéns!";
            }

            if(countErrado === 3) {
                titulo.textContent = "Isso aí!";
            }

            if(countErrado === 4) {
                titulo.textContent = "Muito bem!";
            }

            if(countErrado === 5) {
                titulo.textContent = "Por pouco!";
            }

            for(let i=0; i<palavraAtual.length; i++) {
                
                setTimeout(() => {

                    const letra = document.getElementById(i+1);
                    letra.classList.add("animate__animated", "animate__flipInX");
                    letra.classList.add("correto");



                }, i * 150);
            }

            //* O botão irá aparecer abaixo do conteúdo todo
            // const resultado = document.getElementById("board-container");
            // resultado.innerHTML += "<div id='jogar-denovo'><button>Jogar de novo</button></div>";
            
            //* O botão irá aparecer acima do conteúdo todo
            const resultado = document.getElementById("board-container");
            var inhtml = resultado.innerHTML;
            var btn = "<div id='jogar-denovo'><button id='btn-jogar-denovo'>Jogar de novo</button></div>"
            resultado.innerHTML = btn + inhtml;

            atualizarPalavraIndex();

            const botao = document.getElementById("btn-jogar-denovo");
            botao.addEventListener("click", function() {
                location.reload();
            });

            definirProgresso(progresso);
        }
    }

    function LetraErrada(letra) {
  
        TecladoVermelho(letra);

        const titulo = document.querySelector(".title");
        
        titulo.textContent = "Errado";

        countErrado = countErrado + 1;

        var foto = document.getElementById("forca-imagem");

        if(countErrado === 1) {
            foto.innerHTML = "<img src='img/forca2.png'>";
        } else if(countErrado === 2) {
            foto.innerHTML = "<img src='img/forca3.png'>";
        } else if(countErrado === 3) {
            foto.innerHTML = "<img src='img/forca4.png'>";
        } else if(countErrado === 4) {
            foto.innerHTML = "<img src='img/forca5.png'>";
        } else if(countErrado === 5) {
            foto.innerHTML = "<img src='img/forca6.png'>";
        } else if(countErrado === 6) {
            foto.innerHTML = "<img src='img/forca7.png'>";
            GameOver();
        }

        
    }

    function GameOver() {

        const titulo = document.querySelector(".title");
        titulo.textContent = "Não foi dessa vez!";

        for(let i=0; i<palavraAtual.length; i++) {
                
            setTimeout(() => {
                    
                const quadrado = document.getElementById(i+1);
                quadrado.textContent = palavraAtual[i];

                const letra = document.getElementById(i+1);
                letra.classList.add("animate__animated", "animate__flipInX");
                letra.classList.add("sem-tentativas");

            }, i * 150);
        }

        //* O botão irá aparecer abaixo do conteúdo todo
        // const resultado = document.getElementById("board-container");
        // resultado.innerHTML += "<div id='jogar-denovo'><button>Jogar de novo</button></div>";
            
        //* O botão irá aparecer acima do conteúdo todo
        const resultado = document.getElementById("board-container");
        var inhtml = resultado.innerHTML;
        var btn = "<div id='jogar-denovo'><button id='btn-jogar-denovo'>Jogar de novo</button></div>"
        resultado.innerHTML = btn + inhtml;

        atualizarPalavraIndex();

        const botao = document.getElementById("btn-jogar-denovo");
        botao.addEventListener("click", function() {
            location.reload();
        });

        definirProgresso(progresso);

    }

    function TecladoVermelho(letra) {

        const tecladoLetra = document.querySelector(`[data-key=${letra}]`);
        if(tecladoLetra) {
            tecladoLetra.classList.add("letra-errada");
        }
        
    }

    function TecladoVerde(letra) {
        
        const tecladoLetra = document.querySelector(`[data-key=${letra}]`);
        
        if(tecladoLetra) {
            tecladoLetra.classList.add("letra-certa");
        }
        
    }

    function iniciarPalavrasModal() {
        const modal = document.getElementById("palavras-modal");

        const btn = document.getElementById("stats");

        const span = document.getElementById("close-palavras");

        btn.addEventListener("click", function () {
            
            modal.style.display = "block";
            
        });

        //* ADICIONAR NOVAS PALAVRAS:
        const btnNovaPalavra = document.getElementById("btn-novapalavra");
        const inputNovaPalavra = document.getElementById("novapalavra");

        btnNovaPalavra.addEventListener("click", function() {

            var inputValor = inputNovaPalavra.value;

            if(inputValor.length <= 10 && inputValor.length > 1) {

                var minuscula = inputValor.toLowerCase();

                vetor.push(minuscula);
                window.localStorage.setItem("storedArray", JSON.stringify(vetor)); 
                
            } 

            inputNovaPalavra.value = "";
            MostrarAlerta(inputValor.length);
            
        });

        //Botão para remover as palavras adicionadas
        const btnRemover = document.getElementById("btn-removerpalavra");

        btnRemover.addEventListener("click", function () {
            
            if(vetor.length === 10) {
                alert("Ainda não foram adicionadas novas palavras!");
            }

            if(vetor.length > 10) {
                
                var resultado = confirm("Confirma a remoção?");
                if(resultado === true) {
                    window.localStorage.removeItem("storedArray");
                    vetor = ["panda", "cachorro", "leopardo", "coala", "baleia", "corvo", "gato", "tigre", "coelho", "ovelha"];
                    alert("As palavras foram removidas!")
                }   
            }
        });

        //Quando o usuário clica no <span> (x), fecha o modal
        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        //Quando o usuário clica fora do modal, ele fecha
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

    }

    function MostrarAlerta(tamPalavra) {

        if(tamPalavra <= 10 && tamPalavra > 1) {
            alert("Palavra adicionada!");
        } else {
            alert("Palavra inválida!");
        }
    }

    function iniciarHelpModal() {
        const modal = document.getElementById("help-modal");

        const btn = document.getElementById("help");

        const span = document.getElementById("close-help");

        btn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    function adicionarKeyboardClicks() {
        const keys = document.querySelectorAll(".keyboard-row button");
        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener("click", ({ target }) => {
                const key = target.getAttribute("data-key");

                if(key) {
                    if(countErrado <= 5) {
                        if(countCerto <= palavraAtual.length - 1) {
    
                            var wrong = 0;
        
                            for(let i=0; i<palavraAtual.length; i++) {
                                
                                if(key === palavraAtual[i]) {
                                    quadrado = document.getElementById(i+1);
                                    quadrado.textContent = key;
                                    
                                    countCerto = countCerto + 1;

                                    PalavraCorreta(key);
                                    
                                    //* Impede o usuário digitar a mesma letra novamente
                                    const chave = document.querySelector(`[data-key=${key}]`);
                                    if(chave) {
                                        chave.removeAttribute("data-key");
                                    }
                                            
                                } else {
                                    wrong++;
                                }
                            }

                            if(wrong === palavraAtual.length) {
                                if(key === "enter" || key === "del") {
                                    return;
                                } else {
                
                                    LetraErrada(key);
    
                                    //* Impede o usuário digitar a mesma letra novamente
                                    const chave = document.querySelector(`[data-key=${key}]`);
                                    if(chave) {
                                        chave.removeAttribute("data-key");
                                    }   
                                }     
                            }
                        }
                    }
                }                 
            });
        }
    }
});