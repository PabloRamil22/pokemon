window.onload=()=>{
    let menu=document.getElementById("barras_menu");

    menu.onclick=()=>{
        if(document.getElementById("menu_movil").classList.contains("menu_movil")){
            document.getElementById("menu_movil").classList.remove("menu_movil")
        }else{
            document.getElementById("menu_movil").classList.add("menu_movil")
        }

    }
}