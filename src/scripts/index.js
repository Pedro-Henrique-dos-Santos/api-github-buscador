//import { baseUrl, repositoriesQuantity} from "/src/scripts/variables.js";
import { getRepositories } from "/src/scripts/services/repositories.js";
import { getUser } from "/src/scripts/services/user.js";
import { user } from "/src/scripts/objects/user.js";
import { screen } from "/src/scripts/objects/screen.js";

document.getElementById('btn-search').addEventListener('click',()=>{
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return;
    getUserData(userName);

})



document.getElementById('input-search').addEventListener('keyup',(e)=>{  //keyup se refere as teclas do teclado / e-evento
    
    const userName = e.target.value;
    const key = e.whitch || e.keyCode; //pra pegar o número da tecla pressionada 13 = enter
    const isEnterKeyPressed = key === 13; //true
    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
})


async function getUserData(userName){

    const userResponse = await getUser(userName)
    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return;
    }
    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)

}

function validateEmptyInput(userName){
    if(userName.length === 0 ){
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
}


