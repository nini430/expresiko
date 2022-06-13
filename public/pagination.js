const paginationContainer=document.querySelector(".pagination-container");




let pagination={
    currentPage:1,
    recordPerPage:5,
    totalRecords:1,
    pages:1,
    paginationRender:async()=>{
        console.log("ssss")
    paginationContainer.innerHTML="";
    pagination.totalRecords=await getToDoCount();
    pages=Math.ceil(pagination.totalRecords/pagination.recordPerPage);
   pagination.pages=pages;

    let prevBtn=document.createElement("button");
      prevBtn.innerText="prev";
      prevBtn.addEventListener("click",()=>prev());
      prevBtn.classList.add("next-prev")
      let nextBtn=document.createElement("button");
      nextBtn.innerText="next";
      nextBtn.classList.add("next-prev")
      nextBtn.addEventListener("click",()=>next())
      paginationContainer.appendChild(prevBtn);
      
      for(let text=1;text<=pages;text++) {
            const button=getButton(text);
            button.addEventListener("click",()=>goToPage(button,text));
            button.classList.add("pagination-button");
            button.setAttribute("data-id",text);
            button.setAttribute("id",text)
            paginationContainer.appendChild(button);
      }

      paginationContainer.appendChild(nextBtn)
      

}


}

 


const prev=()=>{
    if(pagination.currentPage===1) {return}
    pagination.currentPage=pagination.currentPage-1;
    const currentBtn=document.getElementById(pagination.currentPage);
    goToPage(currentBtn,pagination.currentPage);
}


const next=()=>{
    if(pagination.currentPage===pagination.pages) {return}
    pagination.currentPage=pagination.currentPage+1;
    const currentBtn=document.getElementById(pagination.currentPage);
    goToPage(currentBtn,pagination.currentPage)
}

 goToPage=(elem,pageNumber)=>{
    pagination.currentPage=pageNumber;
    let paginArray=document.querySelectorAll(".pagination-button");
    paginArray.forEach(item=>{
        item.classList.remove("active");
    })

    elem.classList.add("active")

    showTodos(pageNumber);
    
    
}

const goToLastPage=()=>{
    if(pages===0) {
        console.log("auu")
        pages=1;
         showTodos(pagination.pages);
    }else{
       showTodos(pagination.pages)
       
    }
         
    
 }


const getButton=(text)=>{
    let paginationButton=document.createElement("button");
    paginationButton.innerText=text;
    if(+paginationButton.innerText===pagination.currentPage) {
        paginationButton.classList.add("active")
    }
    return paginationButton;
}

// let pagination={
//     currentPage:1,
//     recordPerPage:5,
//     totalRecords:50,     //default
//     pages:1,
//     render:()=> {
       
//       pagination.totalRecords=todoServices.getTodoCount();
//       let pages=Math.ceil(pagination.totalRecords/pagination.recordPerPage);

      
//       let prevBtn=document.createElement("button");
//       prevBtn.innerText="prev";
//       prevBtn.addEventListener("click",()=>pagination.prev());
//       prevBtn.classList.add("next-prev")
//       let nextBtn=document.createElement("button");
//       nextBtn.innerText="next";
//       nextBtn.classList.add("next-prev")
//       nextBtn.addEventListener("click",()=>pagination.next())
//       paginationContainer.appendChild(prevBtn);
//         pagination.pages=pages;
//       for(let text=1;text<=pages;text++) {
//           const button=pagination.getButton(text);
//           button.classList.add("pagination-button");
//           button.classList.add("page-link")
//           button.setAttribute("id","btn"+text);

//           button.addEventListener("click",()=>pagination.goToPage(button,text))
//           paginationContainer.appendChild(button);
          
//       }

     
//       paginationContainer.appendChild(nextBtn);

//     },
//     getButton:(text)=>{
//         const pageBtn=document.createElement("li");
//         pageBtn.innerText=text;
//         if(+pageBtn.innerText===pagination.currentPage) {
//             pageBtn.classList.add("active");
           
//         }
//         return pageBtn;

//     },
//     goToPage:(element,pageNumber)=>{
//            pagination.currentPage=pageNumber;
//            let paginArray=document.querySelectorAll(".pagination-button");
//            paginArray.forEach(item=>{
//                item.classList.remove("active")
//            })
           

//            element.classList.add("active")

//            const fragmentedData=todoServices.getPageData(pageNumber,pagination.recordPerPage);
//            functions.render(fragmentedData);
           

//     },
//     gotToLastPage:()=>{
//         pagination.currentPage=pagination.pages;
//         let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
//         pagination.goToPage(currentBtn,pagination.currentPage);
//     },
    
//     prev:()=>{
//         if(pagination.currentPage===1) {return};
//         pagination.currentPage=pagination.currentPage-1;
//         let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
//         pagination.goToPage(currentBtn,pagination.currentPage);

//     },

//     next:()=>{
//         if(pagination.currentPage===pagination.pages) {return}
//             pagination.currentPage=pagination.currentPage+1;
//         let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
//         pagination.goToPage(currentBtn,pagination.currentPage);

//     },
//     showPag:()=>{
//         if(todoState.todos.length>=1) {
//             paginationContainer.classList.remove("none")
//         }else{
//             paginationContainer.classList.add("none");
//         }
//     }
// }


