//lấy dữ liệu từ local storage
let listCommentLocal=JSON.parse(localStorage.getItem("listComment")||"[]");
//khởi tạo biến
let ScoreGroupElement=document.getElementById("btn-score-group") as HTMLElement;
let scores:number[]=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let scoreActive:number=10
let commentElement=document.getElementById("feedbackInput") as HTMLInputElement;
let sendElement=document.getElementById("send") as HTMLElement;
let updatingComment:Comment;
//khởi tạo interface
interface Comment{
    id:number;
    content:string;
    score:number;
}
class Feedback{
    listComment:Comment[];
    constructor(listComment:Comment[]){
       this.listComment=listComment;
    }
    renderFeedback(){
        listCommentElement.innerHTML="";
        for(let btn of this.listComment){
            let divComment=`
            <div class="feedback-content">
            <div class="feedback-content-header">
              <i onclick="update(${btn.id})" class="fa-solid fa-pen-to-square"></i>
              <i onclick="deleteComment(${btn.id})" class="fa-solid fa-xmark"></i>
            </div>
            <div class="feedback-content-body">
              <p class="content-feedback">${btn.content}</p>
            </div>
            <button class="btn-score active">${btn.score}</button>
          </div>
            `
            listCommentElement.innerHTML+=divComment;
        }
    }
    updateFeedback(){
        //hàm cập nhập comment
        function update(id:number){
            updatingComment=listCommentLocal.find((item:Comment)=>item.id===id);
            commentElement.value=updatingComment.content;
            scoreActive=updatingComment.score;
            renderPoint();
            sendElement.innerHTML="Update";
          }
  //hàm thêm comment hoặc cập nhập lại comment
  function send(){
      if (updatingComment) {
          // Cập nhật lại thông tin và điểm
          updatingComment.content = commentElement.value;
          updatingComment.score = scoreActive;
      
          // Lưu dữ liệu mới nhất lên local
          localStorage.setItem("listComment", JSON.stringify(listCommentLocal));
      
          // Clean giá trị trong ô input 
          commentElement.value = "";
      
          // Load lại dữ liệu
          renderComment();
          sendElement.innerHTML="Send"
        } else {
          // Thêm mới phản hồi nếu không phải là chức năng cập nhật
          let newComment= {
            id:Math.floor(Math.random()*100000),
            content: commentElement.value,
            score: scoreActive,
          };
      
          listCommentLocal.push(newComment);
          localStorage.setItem("listComment", JSON.stringify(listCommentLocal));
      
          // Load lại dữ liệu 
          renderComment();
      
          // Clean giá trị trong ô input
          commentElement.value = "";
  }
  }
    }
    createFeedback(){
        function send(){
            if (updatingComment) {
                // Cập nhật lại thông tin và điểm
                updatingComment.content = commentElement.value;
                updatingComment.score = scoreActive;
            
                // Lưu dữ liệu mới nhất lên local
                localStorage.setItem("listComment", JSON.stringify(listCommentLocal));
            
                // Clean giá trị trong ô input 
                commentElement.value = "";
            
                // Load lại dữ liệu
                renderComment();
                sendElement.innerHTML="Send"
              } else {
                // Thêm mới phản hồi nếu không phải là chức năng cập nhật
                let newComment= {
                  id:Math.floor(Math.random()*100000),
                  content: commentElement.value,
                  score: scoreActive,
                };
            
                listCommentLocal.push(newComment);
                localStorage.setItem("listComment", JSON.stringify(listCommentLocal));
            
                // Load lại dữ liệu 
                renderComment();
            
                // Clean giá trị trong ô input
                commentElement.value = "";
        }
        }

    }
    deleteFeeback(){
        function deleteComment(id:number){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    let indexDelete:number=listCommentLocal.findIndex((item:Comment)=>item.id===+id);
                    listCommentLocal.splice(indexDelete,1);
                    //lưu dữ liệu lại lên local storage
                    localStorage.setItem("listComment",JSON.stringify(listCommentLocal));
                    //render lại dữ liệu
                    renderComment();
                }
              });
        }
        
    }
}

//hiển thị danh sách các điểm
function renderPoint() {
    ScoreGroupElement.innerHTML = '';
    for (let score of scores) {
        let btn = `
           <button class="btn-score ${
            score === scoreActive ? "active" : ""
           }" data-score="${score}">${score}</button>
        `;
        ScoreGroupElement.innerHTML+=btn;
    }
}
renderPoint();
//khi click từng điểm lấy ra điểm và active button
let btnScoreGroupElement=document.querySelector(".btn-score-group") as HTMLElement;
btnScoreGroupElement.addEventListener("click", (e) => {

    const targetButton = (e.target as Element).closest(".btn-score") as HTMLElement;
    console.log(targetButton);
    if (targetButton) {
      const allButtons = btnScoreGroupElement.querySelectorAll(".btn-score") as NodeListOf<HTMLElement>;
      allButtons.forEach((button) => button.classList.remove("active"));
      targetButton.classList.add("active");
      scoreActive = +targetButton.dataset.score!; 
    }
  });
//hàm hiển thị danh sách comment
let listCommentElement=document.getElementById("list-feedback-content") as HTMLElement;
function renderComment(){
    listCommentElement.innerHTML="";
    for(let btn of listCommentLocal){
        let divComment=`
        <div class="feedback-content">
        <div class="feedback-content-header">
          <i onclick="update(${btn.id})" class="fa-solid fa-pen-to-square"></i>
          <i onclick="deleteComment(${btn.id})" class="fa-solid fa-xmark"></i>
        </div>
        <div class="feedback-content-body">
          <p class="content-feedback">${btn.content}</p>
        </div>
        <button class="btn-score active">${btn.score}</button>
      </div>
        `
        listCommentElement.innerHTML+=divComment;
    }
}
renderComment();
//hàm cập nhập comment

function update(id:number){
  updatingComment=listCommentLocal.find((item:Comment)=>item.id===id);
  commentElement.value=updatingComment.content;
  scoreActive=updatingComment.score;
  renderPoint();
  sendElement.innerHTML="Update";
}
//hàm thêm comment hoặc cập nhập lại comment
function send(){
    if (updatingComment) {
        // Cập nhật lại thông tin và điểm
        updatingComment.content = commentElement.value;
        updatingComment.score = scoreActive;
    
        // Lưu dữ liệu mới nhất lên local
        localStorage.setItem("listComment", JSON.stringify(listCommentLocal));
    
        // Clean giá trị trong ô input 
        commentElement.value = "";
    
        // Load lại dữ liệu
        renderComment();
        sendElement.innerHTML="Send"
      } else {
        // Thêm mới phản hồi nếu không phải là chức năng cập nhật
        let newComment= {
          id:Math.floor(Math.random()*100000),
          content: commentElement.value,
          score: scoreActive,
        };
    
        listCommentLocal.push(newComment);
        localStorage.setItem("listComment", JSON.stringify(listCommentLocal));
    
        // Load lại dữ liệu 
        renderComment();
    
        // Clean giá trị trong ô input
        commentElement.value = "";
}
}
//hàm xóa comment
function deleteComment(id:number){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let indexDelete:number=listCommentLocal.findIndex((item:Comment)=>item.id===+id);
            listCommentLocal.splice(indexDelete,1);
            //lưu dữ liệu lại lên local storage
            localStorage.setItem("listComment",JSON.stringify(listCommentLocal));
            //render lại dữ liệu
            renderComment();
        }
      });
}
let feedback=new Feedback(listCommentLocal);
feedback.createFeedback();
feedback.renderFeedback();
feedback.deleteFeeback();
feedback.updateFeedback();