document.addEventListener("DOMContentLoaded", () => {

    // word = "crime";
    // console.log(word[0], word[1], word[2], word[3], word[4]);

    var countCerto = 0;
    var countErrado = 0;
    var wrongLetters = [];
    var atualPalavraIndex = 0;
    

    let palavraAtual;
    var palavras = ["aguia", "lebre", "cisne", "lesma", "panda", "pombo", "tigre", "veado", "zebra", "porco", "cupim", "corvo", "polvo", "coala", "ganso", "lhama"];


    initLocalStorage();

    
    palavraAtual = palavras[atualPalavraIndex];


    criarQuadrados();
    addKeyboardClicks();
    initStatsModal();
    

    function initLocalStorage() {
        const storedAtualPalavra = window.localStorage.getItem("atualPalavraIndex");
        if (!storedAtualPalavra || Number(storedAtualPalavra) === 16) {
            window.localStorage.setItem("atualPalavraIndex", atualPalavraIndex);
        } else {
            atualPalavraIndex = Number(storedAtualPalavra);
            palavraAtual = palavras[atualPalavraIndex];
        }
    }

    function updatePalavraIndex() {
        
        window.localStorage.setItem("atualPalavraIndex", atualPalavraIndex + 1);
    }


    function criarQuadrados() {
        const gameBoard = document.getElementById("board");

        for (let i = 0; i < 5; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            //square.classList.add("animate__animated");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }
    }

    function PalavraCorreta(letra) {

        countCerto = countCerto + 1;

        TecladoVerde(letra);

        const titulo = document.querySelector(".title");
        titulo.classList.remove("animate__animated", "animate__shakeX", "animate__tada");
        titulo.textContent = "Certo";

        //* Para não computar a mesma letra várias vezes
        // rightLetters.push(letra);

        // for(let i=0; i<rightLetters.length; i++) {
        //     if(letra === rightLetters[i]) {
        //         return;
        //     }
        // }
    
        if(countCerto === 5) {

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
                titulo.textContent = "Só faltou as pernas!";
            }

            if(countErrado === 5) {
                titulo.textContent = "Por pouco!";
            }

            for(let i=0; i<5; i++) {
                
                setTimeout(() => {

                    const letra = document.getElementById(i+1);
                    letra.classList.add("animate__animated", "animate__flipInX");
                    letra.classList.add("correto");



                }, i * 200);
            }

            //* O botão irá aparecer abaixo do conteúdo todo
            // const resultado = document.getElementById("board-container");
            // resultado.innerHTML += "<div id='jogar-denovo'><button>Jogar de novo</button></div>";
            
            //* O botão irá aparecer acima do conteúdo todo
            const resultado = document.getElementById("board-container");
            var inhtml = resultado.innerHTML;
            var btn = "<div id='jogar-denovo'><button id='btn-jogar-denovo'>Jogar de novo</button></div>"
            resultado.innerHTML = btn + inhtml;

            updatePalavraIndex();

            const botao = document.getElementById("btn-jogar-denovo");
            botao.addEventListener("click", function() {
                location.reload();
            });
        }
    }

    function LetraErrada(letra) {

        wrongLetters.push(letra);
        console.log(wrongLetters);
        
        TecladoVermelho(letra);

        

        const titulo = document.querySelector(".title");
        titulo.classList.remove("animate__animated", "animate__shakeX", "animate__tada");
        
        
        titulo.textContent = "Errado";
        titulo.classList.add("animate__animated", "animate__shakeX");

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

        
        
        
        // wrongLetters.forEach((letra) => {
        //     titulo.textContent += " " + letra;
        // });
        
    }

    function GameOver() {

        const titulo = document.querySelector(".title");
        titulo.textContent = "Não foi dessa vez!";
        //titulo.classList.add("cor-amarela-titulo");

        for(let i=0; i<5; i++) {
                
            setTimeout(() => {
                    
                const quadrado = document.getElementById(i+1);
                quadrado.textContent = palavraAtual[i];

                const letra = document.getElementById(i+1);
                letra.classList.add("animate__animated", "animate__flipInX");
                letra.classList.add("sem-tentativas");

            }, i * 200);
        }

        //* O botão irá aparecer abaixo do conteúdo todo
        // const resultado = document.getElementById("board-container");
        // resultado.innerHTML += "<div id='jogar-denovo'><button>Jogar de novo</button></div>";
            
        //* O botão irá aparecer acima do conteúdo todo
        const resultado = document.getElementById("board-container");
        var inhtml = resultado.innerHTML;
        var btn = "<div id='jogar-denovo'><button id='btn-jogar-denovo'>Jogar de novo</button></div>"
        resultado.innerHTML = btn + inhtml;

        updatePalavraIndex();

        const botao = document.getElementById("btn-jogar-denovo");
        botao.addEventListener("click", function() {
            location.reload();
        });


    }

    function RemoverAnimacoes() {
        const titulo = document.querySelector(".title");
        titulo.classList.remove("animate__animated", "animate__shakeX");
    }

    function TecladoVermelho(letra) {

        
        const tecladoLetra = document.querySelector(`[data-key=${letra}]`);
        tecladoLetra.classList.add("letra-errada");
        
    }

    function TecladoVerde(letra) {
        console.log(letra);
        
        const tecladoLetra = document.querySelector(`[data-key=${letra}]`);
        tecladoLetra.classList.add("letra-certa");
        
    }

    function initStatsModal() {
        const modal = document.getElementById("stats-modal");

        //Get the button that opens the modal
        const btn = document.getElementById("stats");

        //Get the <span element that closes the modal
        const span = document.getElementById("close-stats");

        //When the user clicks on the button, open the modal
        btn.addEventListener("click", function () {
            
            modal.style.display = "block";
        });

        //When the user clicks on <span> (x), close the modal
        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        //When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        // const btnReset = document.getElementById("btn-reset");

        // btnReset.addEventListener("click", function () {
            
        //     window.localStorage.setItem("currentStreak", 0);
        //     window.localStorage.setItem("totalWins", 0);
        //     window.localStorage.setItem("totalGames", 0);
            
        //     modal.style.display = "none";
        // });
    }


    function addKeyboardClicks() {
        const keys = document.querySelectorAll(".keyboard-row button");
        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener("click", ({ target }) => {
                const key = target.getAttribute("data-key");

                if(key !== null) {
                    if(countErrado <= 5) {
                        if(countCerto <= 4) {
    
                            var wrong = 0;
        
                            for(let i=0; i<palavraAtual.length; i++) {
                                
                                if(key === palavraAtual[i]) {
                                    quadrado = document.getElementById(i+1);
                                    quadrado.textContent = key;
                                    
                                    
                                    PalavraCorreta(key);
    
                                    //* Impede o usuário digitar a mesma letra novamente
                                    const chave = document.querySelector(`[data-key=${key}]`);
                                    chave.removeAttribute("data-key");        
    
                                } else {
                                    wrong++;
                                }
                                
                            }

                            if(wrong === 5) {
                                if(key === "enter" || key === "del") {
                                    return;
                                } else {
                
                                    LetraErrada(key);
    
                                    //* Impede o usuário digitar a mesma letra novamente
                                    const chave = document.querySelector(`[data-key=${key}]`);
                                    chave.removeAttribute("data-key");
                                }
                            
                            }
                        }
                    }
                }      
                

                

                
            });
        }
    }






});