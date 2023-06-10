// Seleção de elementos //

// <form id="todo_form">
const todoForm = document.querySelector("#todo_form");

// <input type="text" id="todo_input" placeholder="O que você vai fazer?" />
const todoInput = document.querySelector("#todo_input");

// <div id="todo_list">
const todoList = document.querySelector("#todo_list");

// <form id="edit_form" class="hide">
const editForm = document.querySelector("#edit_form");

// <input type="text" id="edit_input" />
const editInput = document.querySelector("#edit_input");

// <button id="cancel_edit_btn">Cancelar</button>
const cancelEditBtn = document.querySelector("#cancel_edit_btn");

let oldInputValue;

// Funções //
const saveTodo = (text) => {

    const todo = document.createElement("div");
    // <div></div>

    todo.classList.add("todo");
    // <div class="todo"></div>

    const todoTitle = document.createElement("h3");
    // <h3></h3>

    todoTitle.innerText = text;
    // <h3>text</h3>

    todo.appendChild(todoTitle);
    /*  
        <div class="todo">
            <h3>text</h3>
        </div >          
    */

    const doneBtn = document.createElement("button");
    // <button></button>

    doneBtn.classList.add("finish_todo");
    // <button class="finish_todo"></button>

    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    /*
        <button class="finish_todo">
            <i class="fa-solid fa-check"></i>
        </button>
    */

    todo.appendChild(doneBtn);
    /*  
        <div class="todo">
            <h3>text</h3>
            <button class="finish_todo">
                <i class="fa-solid fa-check"></i>
            </button>
        </div >          
    */

    const editBtn = document.createElement("button");
    // <button></button>

    editBtn.classList.add("edit_todo");
    // <button class="edit_todo"></button>

    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    /*
        <button class="edit_todo">
            <i class="fa-solid fa-check"></i>
        </button>
    */

    todo.appendChild(editBtn);
    /*  
        <div class="todo">
            <h3>text</h3>
            <button class="edit_todo">
                <i class="fa-solid fa-pen"></i>
            </button>
        </div >          
    */

    const deleteBtn = document.createElement("button");
    // <button></button>

    deleteBtn.classList.add("remove_todo");
    // <button class="remove_todo"></button>

    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    /*
        <button class="remove_todo">
            <i class="fa-solid fa-check"></i>
        </button>
    */

    todo.appendChild(deleteBtn);
    /*  
        <div class="todo">
            <h3>text</h3>
                <button class="remove_todo">
                    <i class="fa-solid fa-xmark"></i>
                </button>
        </div >          
    */

    // console.log(todo);

    todoList.appendChild(todo);
    /*  
        <div class="todo">
            <h3>text</h3>
            <button class="finish_todo">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="edit_todo">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="remove_todo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div >          
    */

    // Limpando campo após adionar tarefa
    todoInput.value = "";

    // Focando o cursor após limpar campo adicionado
    todoInput.focus();
};

// Função para alteração de comportamento
const toggleForms = () => {

    editForm.classList.toggle("hide");
    /*
        <form id="edit_form">               -->     <form id="edit_form" class="hide">
        <form id="edit_form" class="hide>   -->     <form id="edit_form">
    */

    todoForm.classList.toggle("hide");
    /*
        <form id="todo_form">                   -->   <form id="todo_form" class="hide">  
        <form id="todo_form" class="hide">      -->   <form id="todo_form">  
    */

    todoList.classList.toggle("hide");
    /*
        <div id="todo_list">                -->     <div id="todo_list"class="hide">
        <div id="todo_list" class="hide">   -->     <div id="todo_list">
    */
};

// Função para atualização de dado editado
const updateTodo = (text) => {

    // Capturando todos os elementos com a classe "todo""
    const todos = document.querySelectorAll(".todo");

    // Percorrendo cada elemento
    todos.forEach(
        
        (todo) => {
        
            // Capturando o título de cada elemento de tag 'h3'
            let todoTitle = todo.querySelector("h3");

            // Validando se título atual (em cada elemento) é igual ao salvo na emória fictícia
            if (todoTitle.innerText === oldInputValue) {
                
                // Alterando o conteúdo do elemento peplo conteúdo recebido por parâmetro (text)
                todoTitle.innerHTML = text;
            }
        }
    );
};

// Eventos //
todoForm.addEventListener("submit",

    (e) => {

        // Alterando o comportamento padrão de submeter doumento
        e.preventDefault();

        // console.log("Enviou form!")

        // Capturando conteúdo digitado no campo
        const inputValue = todoInput.value;

        if (inputValue) {
            // console.log(inputValue);
            saveTodo(inputValue);
        }
    }
);

// Mapeando click nos botões
document.addEventListener("click",

    (e) => {
        // Capturando o elemento de fato clicado
        const targetElemento = e.target;

        // Capturando a 'div' pai do elemento de fato clicado
        const parentElemento = targetElemento.closest("div");

        let todoTitle;

        // Validando se possui uma 'div' pai, e se nesta,  possui alguma tag 'h3'
        if (parentElemento && parentElemento.querySelector("h3")) {

            // Variável recebendo o conteudo da tag 'h3'
            todoTitle = parentElemento.querySelector("h3").innerText;
        }

        // Validando se o elemento clicado possui tal classe
        if (targetElemento.classList.contains("finish_todo")) {
            console.log("O botão da classe 'finish_todo' foi clicado.");

            parentElemento.classList.toggle("done");
            /*
                <div class="todo">       -->     <div class="todo done">
                <div class="todo done">  -->     <div class="todo">
            */
        }

        // Validando se o elemento clicado possui tal classe
        if (targetElemento.classList.contains("edit_todo")) {
            console.log("O botão da classe 'edit_todo' foi clicado.");
            
            // Função para alteração de comportamento
            toggleForms();

            // Pré preenchimento do valor no input
            editInput.value = todoTitle;

            // Salvando o valor na memória fictícia
            oldInputValue = todoTitle;
        }

        // Validando se o elemento clicado possui tal classe
        if (targetElemento.classList.contains("remove_todo")) {
            console.log("O botão da classe 'remove_todo' foi clicado.");
            parentElemento.remove();

        }
    }
);

// Mapeando click nos botões
cancelEditBtn.addEventListener("click",

    (e) => {

        // Alterando o comportamento padrão de submeter doumento
        e.preventDefault();

        // Função para alteração de comportamento
        toggleForms();
    }
);

// Mapeando click nos botões
editForm.addEventListener("submit",

    (e) => {

        // Alterando o comportamento padrão de submeter doumento
        e.preventDefault();

        // Capturando o novo valor editado
        const editInputValue = editInput.value;

        if (editInputValue) {
            updateTodo(editInputValue);
        }

        // Função para alteração de comportamento
        toggleForms()
    }
);