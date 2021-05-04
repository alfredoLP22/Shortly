document.addEventListener("DOMContentLoaded",()=>{
    const $nav_open = document.querySelector(".nav-open"),
    $nav_links = document.querySelector(".nav-links"),
    $nav_links_content = document.querySelector(".nav-links-content");
    let close_tab = true,
    btn_shorten = document.getElementById("btn-shorten"),
    $link = document.getElementById("link"),
    generate_link = document.getElementById("generate-link"),
    $loading = document.querySelector(".loading");

    const copyText = (field) =>{
        let aux = document.createElement("input");
        aux.setAttribute("value",field.innerHTML);
    
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    }
    const loader = (loaderItem,display) =>{
        loaderItem.style.display = display;   
    }

    $nav_open.addEventListener("click",()=>{
        if(!$nav_links.classList.contains("nav-links-open")){
            $nav_links.classList.add("nav-links-open");
        }
        else if ($nav_links.classList.contains("nav-links-open")) {
            $nav_links.classList.remove("nav-links-open");
        }         
    })
    $nav_links.addEventListener("click",()=>{
        if(close_tab && $nav_links.classList.contains("nav-links-open")){
            $nav_links.classList.remove("nav-links-open");
        }
        close_tab = true;
    });
    $nav_links_content.addEventListener("click",()=>{
        close_tab = false;
    });

    btn_shorten.addEventListener("click",()=>{
        let input_Value = $link.value;    
   
        if(input_Value !== ""){      
                loader($loading,"flex");
                fetch(`https://api.shrtco.de/v2/shorten?url=${input_Value}`)
                .then((res)=>{
                    return res.json();        
                })
               .then((json)=>{
                   //console.log(json.result.full_short_link);
                   loader($loading,"none");
                   let links_container = document.createElement("div");
                   links_container.classList.add("links-container");
                   generate_link.appendChild(links_container);
   
                   let link_to_convert = document.createElement("p");
                   link_to_convert.classList.add("link-to-convert");
                   link_to_convert.innerHTML = input_Value;
   
                   let link_result = document.createElement("a");
                   link_result.classList.add("link-result");
                   link_result.innerHTML = json.result.full_short_link;
                   link_result.href = json.result.full_short_link;
                   link_result.target ="_blank";
   
                   let btn_copy = document.createElement("button");
                   btn_copy.id = "copy-link";
                   btn_copy.innerText = "Copy!";
                   btn_copy.classList.add("btn-copy");
                       
                   
                   links_container.appendChild(link_to_convert);
                   links_container.appendChild(link_result);
                   links_container.appendChild(btn_copy);
   
                   $link.value = "";
                   
                   btn_copy.addEventListener("click",()=>{
                       copyText(link_result)
                       btn_copy.innerText = "Copied!";
                       btn_copy.classList.remove("btn-copy");
                       btn_copy.classList.add("btn-copied");
                   });    
                })
                .catch((err)=>{console.error(err)})         
        }    
        else{
            alert("Please add a link");
       }
   });

});
